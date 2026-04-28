import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0f1e3c] text-white">
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-3 tracking-tight">INFRA-BETON ApS</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-5">{t('footer.description')}</p>
            <div className="w-10 h-0.5 bg-[#DE2301]" />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5 text-[#DE2301]">
              {t('footer.quickLinks')}
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/#about', label: t('nav.about') },
                { to: '/#services', label: t('nav.services') },
                { to: '/contact', label: t('nav.contact') },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors group"
                >
                  <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5 text-[#DE2301]">
              {t('footer.contactInfo')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-sm text-white/50">
                <MapPin size={14} className="text-[#DE2301] mt-0.5 shrink-0" />
                <span>Lundsbjerg Industrivej 14<br />6200 Aabenraa, Denmark</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/50">
                <Phone size={14} className="text-[#DE2301] shrink-0" />
                +45 XX XX XX XX
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/50">
                <Mail size={14} className="text-[#DE2301] shrink-0" />
                info@infra-beton.dk
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <span>© {new Date().getFullYear()} Infra-Beton ApS. {t('footer.rights')}</span>
          <span>CVR: 46270495</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
