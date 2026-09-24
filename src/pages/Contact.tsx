import { useState, useEffect, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Building2, CheckCircle, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { MAPS_URL, PHONE_HREF } from '@/lib/contact';
import flemmingBille from '@/assets/flemming-bille.png';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string; // honeypot – skjult for mennesker, udfyldes af bots
}

async function submitContactForm(data: ContactFormData): Promise<boolean> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}

const inputClass =
  'w-full rounded-lg border border-border bg-concrete px-4 py-3 text-sm text-navy placeholder:text-navy/35 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-all';

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', phone: '', message: '', website: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const previous = document.title;
    document.title = t('meta.contactTitle');
    return () => { document.title = previous; };
  }, [t]);

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!formData.name.trim()) errs.name = t('contact.requiredField');
    if (!formData.email.trim()) errs.email = t('contact.requiredField');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = t('contact.invalidEmail');
    if (!formData.message.trim()) errs.message = t('contact.requiredField');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setFailed(false);
    const ok = await submitContactForm(formData);
    setLoading(false);
    if (ok) setSubmitted(true);
    else setFailed(true);
  };

  const update = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const contactItems = [
    { icon: Phone, label: t('contact.phoneItemLabel'), text: t('contact.phone'), href: PHONE_HREF },
    { icon: Mail, label: t('contact.emailItemLabel'), text: t('contact.email'), href: `mailto:${t('contact.email')}` },
    { icon: MapPin, label: t('contact.addressItemLabel'), text: t('contact.address'), href: MAPS_URL },
    { icon: Building2, label: t('contact.companyItemLabel'), text: `${t('contact.company')}\nCVR: 46270495` },
  ];

  return (
    <Layout>
      {/* HEADER */}
      <section className="bg-navy relative overflow-hidden py-20">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute right-0 top-0 w-96 h-full opacity-10" style={{
          background: 'radial-gradient(circle at 80% 50%, hsl(var(--brand)), transparent 60%)'
        }} />
        <div className="container relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-4">{t('contact.eyebrow')}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('contact.title')}</h1>
            <p className="text-white/60 text-lg max-w-md mx-auto">{t('contact.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 bg-concrete">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left: contact info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <h2 className="text-2xl font-bold text-navy">{t('contact.infoTitle')}</h2>

              {/* Person card */}
              <div className="bg-white rounded-xl border border-border p-6 flex items-center gap-5">
                <div className="w-20 h-20 rounded-full border border-border shrink-0 overflow-hidden">
                  <img src={flemmingBille} alt="Flemming Bille" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand uppercase tracking-wider mb-1">{t('contact.personRole')}</p>
                  <p className="text-lg font-bold text-navy">Flemming Bille</p>
                </div>
              </div>

              <div className="space-y-4">
                {contactItems.map((item, i) => {
                  const content = (
                    <>
                      <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                        <item.icon className="text-brand" size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-navy/40 uppercase tracking-wider mb-0.5">{item.label}</p>
                        <p className="text-navy whitespace-pre-line text-sm leading-relaxed">{item.text}</p>
                      </div>
                    </>
                  );
                  const className = 'flex items-start gap-4 bg-white rounded-xl p-5 border border-border';
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          {...(item.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                          className={`${className} hover:border-brand/30 transition-colors`}
                        >
                          {content}
                        </a>
                      ) : (
                        <div className={className}>{content}</div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="bg-navy rounded-xl p-6 mt-4">
                <p className="text-white/80 text-sm leading-relaxed">
                  {t('contact.responseBefore')} <span className="text-brand font-semibold">{t('contact.responseHighlight')}</span>{t('contact.responseAfter')}
                </p>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl border border-border p-8 md:p-10">
                <h2 className="text-2xl font-bold text-navy mb-8">{t('contact.formTitle')}</h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                    role="status"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="text-brand" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-2">{t('contact.successTitle')}</h3>
                    <p className="text-navy/60">{t('contact.successText')}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-semibold text-navy mb-2">{t('contact.nameLabel')}</label>
                        <input
                          id="contact-name"
                          type="text"
                          autoComplete="name"
                          value={formData.name}
                          onChange={e => update('name', e.target.value)}
                          placeholder={t('contact.namePlaceholder')}
                          aria-invalid={!!errors.name}
                          className={inputClass}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-semibold text-navy mb-2">{t('contact.emailLabel')}</label>
                        <input
                          id="contact-email"
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={e => update('email', e.target.value)}
                          placeholder={t('contact.emailPlaceholder')}
                          aria-invalid={!!errors.email}
                          className={inputClass}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-semibold text-navy mb-2">{t('contact.phoneLabel')}</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={e => update('phone', e.target.value)}
                        placeholder={t('contact.phonePlaceholder')}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-semibold text-navy mb-2">{t('contact.messageLabel')}</label>
                      <textarea
                        id="contact-message"
                        value={formData.message}
                        onChange={e => update('message', e.target.value)}
                        placeholder={t('contact.messagePlaceholder')}
                        rows={5}
                        aria-invalid={!!errors.message}
                        className={`${inputClass} resize-none`}
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
                    </div>

                    {/* Honeypot – skjult for brugere og skærmlæsere */}
                    <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                      <label htmlFor="contact-website">Website</label>
                      <input
                        id="contact-website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.website}
                        onChange={e => update('website', e.target.value)}
                      />
                    </div>

                    {failed && (
                      <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3" role="alert">
                        {t('contact.errorText')}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand text-brand-foreground font-semibold rounded-lg hover:bg-brand-hover transition-all duration-200 disabled:opacity-60 shadow-lg shadow-brand/25"
                    >
                      {loading ? t('contact.sending') : t('contact.submit')}
                      {!loading && <ArrowRight size={18} />}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
