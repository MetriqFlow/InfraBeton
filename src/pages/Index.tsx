import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Factory, Plane, Landmark, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import heroImage from '@/assets/Hero-image.webp';
import aboutImage from '@/assets/about-runway.webp';

const HomePage = () => {
  const { t } = useTranslation();
  const { hash, key } = useLocation();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Scroll til #about/#services ved navigation (også fra andre sider), ellers til toppen.
  useEffect(() => {
    const target = hash ? document.querySelector(hash) : null;
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo(0, 0);
  }, [hash, key]);

  const services = [
    { icon: Factory, title: t('services.service1Title'), text: t('services.service1Text') },
    { icon: Plane, title: t('services.service2Title'), text: t('services.service2Text') },
    { icon: Landmark, title: t('services.service3Title'), text: t('services.service3Text') },
  ];

  return (
    <Layout>
      {/* HERO */}
      <section ref={heroRef} id="home" className="relative overflow-hidden" style={{ height: 'min(92vh, 780px)' }}>
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src={heroImage}
            alt={t('hero.imageAlt')}
            className="w-full h-full object-cover scale-110"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/80 to-navy-deep/40" />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </motion.div>

        <motion.div className="relative h-full flex items-center" style={{ opacity: heroOpacity }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 text-white tracking-tight">
                {t('hero.titleLine1')} <br />
                <span className="text-brand">{t('hero.titleHighlight')}</span><br />
                {t('hero.titleLine3')}
              </h1>

              <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-xl">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-brand-foreground font-semibold rounded-md hover:bg-brand-hover transition-all duration-200 text-base shadow-lg shadow-brand/30"
                >
                  {t('hero.cta')}
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/#about"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-md hover:bg-white/10 transition-all duration-200 text-base"
                >
                  {t('hero.secondaryCta')}
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-concrete to-transparent" />
      </section>

      {/* INTRO */}
      <section className="py-24 bg-concrete">
        <div className="container max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-4">{t('home.introEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-navy leading-tight">{t('home.introTitle')}</h2>
            <p className="text-navy/60 leading-relaxed text-lg">{t('home.introText')}</p>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white scroll-mt-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                <img src={aboutImage} alt={t('about.imageAlt')} className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-xl bg-brand/[0.08] -z-10" />
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-xl bg-navy/5 -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div>
                <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">{t('about.eyebrow')}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-6">{t('about.title')}</h2>
              </div>
              <p className="text-navy/70 leading-relaxed">{t('about.text1')}</p>
              <p className="text-navy/60 leading-relaxed">{t('about.text2')}</p>
              <p className="text-navy/60 leading-relaxed">{t('about.text3')}</p>
              <div className="pt-2">
                <Link to="/contact" className="inline-flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all duration-200">
                  {t('about.cta')} <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-concrete scroll-mt-24">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">{t('services.eyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">{t('services.title')}</h2>
            <p className="text-navy/55 text-lg max-w-xl mx-auto">{t('services.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group bg-white rounded-xl p-8 border border-border hover:border-brand/25 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center mb-6 group-hover:bg-brand transition-colors duration-300">
                  <service.icon className="text-white" size={26} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{service.title}</h3>
                <p className="text-navy/60 leading-relaxed text-sm">{service.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-navy rounded-2xl px-8 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-64 h-full opacity-10" style={{
              background: 'radial-gradient(circle at 80% 50%, hsl(var(--brand)), transparent 70%)'
            }} />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{t('ctaBanner.title')}</h2>
              <p className="text-white/60">{t('ctaBanner.text')}</p>
            </div>
            <Link
              to="/contact"
              className="relative shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-brand text-brand-foreground font-semibold rounded-md hover:bg-brand-hover transition-all duration-200 shadow-lg shadow-brand/30 whitespace-nowrap"
            >
              {t('ctaBanner.button')} <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
