import { useState, useEffect, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Building2, CheckCircle, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import flemmingBille from '@/assets/flemming-bille.png';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

async function submitContactForm(data: ContactFormData): Promise<boolean> {
  console.log('Contact form submitted:', data);
  await new Promise(resolve => setTimeout(resolve, 800));
  return true;
}

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

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
    const ok = await submitContactForm(formData);
    setLoading(false);
    if (ok) setSubmitted(true);
  };

  const update = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const contactItems = [
    { icon: Building2, label: 'Virksomhed', text: `${t('contact.company')}\nCVR: 46270495` },
    { icon: MapPin, label: 'Adresse', text: t('contact.address') },
    { icon: Phone, label: 'Telefon', text: t('contact.phone') },
    { icon: Mail, label: 'E-mail', text: t('contact.email') },
  ];

  return (
    <Layout>
      {/* HEADER */}
      <section className="bg-[#1a2f5e] relative overflow-hidden py-20">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute right-0 top-0 w-96 h-full opacity-10" style={{
          background: 'radial-gradient(circle at 80% 50%, #DE2301, transparent 60%)'
        }} />
        <div className="container relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#DE2301] text-sm font-semibold uppercase tracking-widest mb-4">Skriv til os</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('contact.title')}</h1>
            <p className="text-white/60 text-lg max-w-md mx-auto">{t('contact.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 bg-[#f5f3ef]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left: contact info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <h2 className="text-2xl font-bold text-[#1a2f5e]">{t('contact.infoTitle')}</h2>

              {/* Person card */}
              <div className="bg-white rounded-xl border border-[#e0dbd4] p-6 flex items-center gap-5">
                <div className="w-20 h-20 rounded-full border border-[#e0dbd4] shrink-0 overflow-hidden">
                  <img src={flemmingBille} alt="Flemming Bille" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#DE2301] uppercase tracking-wider mb-1">Direktør</p>
                  <p className="text-lg font-bold text-[#1a2f5e]">Flemming Bille</p>
                </div>
              </div>

              <div className="space-y-4">
                {contactItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4 bg-white rounded-xl p-5 border border-[#e0dbd4]"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#DE2301]/10 flex items-center justify-center shrink-0">
                      <item.icon className="text-[#DE2301]" size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1a2f5e]/40 uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-[#1a2f5e] whitespace-pre-line text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-[#1a2f5e] rounded-xl p-6 mt-4">
                <p className="text-white/80 text-sm leading-relaxed">
                  Vi bestræber os på at svare inden for <span className="text-[#DE2301] font-semibold">1 arbejdsdag</span>. Til akutte henvendelser, ring direkte på ovenstående nummer.
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
              <div className="bg-white rounded-2xl border border-[#e0dbd4] p-8 md:p-10">
                <h2 className="text-2xl font-bold text-[#1a2f5e] mb-8">{t('contact.formTitle')}</h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#DE2301]/10 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="text-[#DE2301]" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-[#1a2f5e] mb-2">{t('contact.successTitle')}</h3>
                    <p className="text-[#1a2f5e]/60">{t('contact.successText')}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-[#1a2f5e] mb-2">{t('contact.nameLabel')}</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={e => update('name', e.target.value)}
                          placeholder={t('contact.namePlaceholder')}
                          className="w-full rounded-lg border border-[#e0dbd4] bg-[#f5f3ef] px-4 py-3 text-sm text-[#1a2f5e] placeholder:text-[#1a2f5e]/35 focus:outline-none focus:ring-2 focus:ring-[#DE2301]/30 focus:border-[#DE2301]/50 transition-all"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1a2f5e] mb-2">{t('contact.emailLabel')}</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={e => update('email', e.target.value)}
                          placeholder={t('contact.emailPlaceholder')}
                          className="w-full rounded-lg border border-[#e0dbd4] bg-[#f5f3ef] px-4 py-3 text-sm text-[#1a2f5e] placeholder:text-[#1a2f5e]/35 focus:outline-none focus:ring-2 focus:ring-[#DE2301]/30 focus:border-[#DE2301]/50 transition-all"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1a2f5e] mb-2">{t('contact.phoneLabel')}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => update('phone', e.target.value)}
                        placeholder={t('contact.phonePlaceholder')}
                        className="w-full rounded-lg border border-[#e0dbd4] bg-[#f5f3ef] px-4 py-3 text-sm text-[#1a2f5e] placeholder:text-[#1a2f5e]/35 focus:outline-none focus:ring-2 focus:ring-[#DE2301]/30 focus:border-[#DE2301]/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1a2f5e] mb-2">{t('contact.messageLabel')}</label>
                      <textarea
                        value={formData.message}
                        onChange={e => update('message', e.target.value)}
                        placeholder={t('contact.messagePlaceholder')}
                        rows={5}
                        className="w-full rounded-lg border border-[#e0dbd4] bg-[#f5f3ef] px-4 py-3 text-sm text-[#1a2f5e] placeholder:text-[#1a2f5e]/35 focus:outline-none focus:ring-2 focus:ring-[#DE2301]/30 focus:border-[#DE2301]/50 transition-all resize-none"
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#DE2301] text-white font-semibold rounded-lg hover:bg-[#c41f01] transition-all duration-200 disabled:opacity-60 shadow-lg shadow-[#DE2301]/25"
                    >
                      {loading ? 'Sender...' : t('contact.submit')}
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
