// Vercel serverless-funktion: modtager kontaktformularen og sender den som e-mail via Resend.
// Env vars (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  – API-nøgle fra resend.com
//   CONTACT_TO      – modtager (default info@infra-beton.dk)
//   CONTACT_FROM    – afsender på et verificeret domæne, fx "Infra-Beton hjemmeside <hjemmeside@infra-beton.dk>"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 200, email: 254, phone: 50, message: 5000 };

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const field = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

export async function POST(request: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  // Honeypot udfyldt → bot. Svar OK, men send ingenting.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return json(200, { ok: true });
  }

  const name = field(body.name, LIMITS.name);
  const email = field(body.email, LIMITS.email);
  const phone = field(body.phone, LIMITS.phone);
  const message = field(body.message, LIMITS.message);

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return json(400, { error: 'validation' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('contact: RESEND_API_KEY mangler');
    return json(500, { error: 'not_configured' });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'Infra-Beton hjemmeside <hjemmeside@infra-beton.dk>',
      to: [process.env.CONTACT_TO || 'info@infra-beton.dk'],
      reply_to: email,
      subject: `Ny henvendelse fra hjemmesiden: ${name.replace(/\s+/g, ' ')}`,
      text: [
        `Navn: ${name}`,
        `E-mail: ${email}`,
        `Telefon: ${phone || '-'}`,
        '',
        'Besked:',
        message,
      ].join('\n'),
    }),
  });

  if (!res.ok) {
    console.error('contact: Resend fejlede', res.status, await res.text());
    return json(502, { error: 'send_failed' });
  }

  return json(200, { ok: true });
}
