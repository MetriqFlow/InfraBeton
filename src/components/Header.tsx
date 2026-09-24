import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import logo from '@/assets/logo.png';

const SHOW_LANGUAGE_SWITCHER = false;

const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'da', label: 'Dansk', short: 'DA' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);

  const links = [
    { to: '/#about', label: t('nav.about') },
    { to: '/#services', label: t('nav.services') },
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const inDesktop = langRef.current?.contains(e.target as Node);
      const inMobile = mobileLangRef.current?.contains(e.target as Node);
      if (!inDesktop && !inMobile) setLangOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectLang = (code: string) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
  };

  const languageMenu = (
    <div className="absolute right-0 mt-2 w-36 bg-navy border border-navy-foreground/20 rounded-md shadow-lg overflow-hidden z-50">
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => selectLang(lang.code)}
          className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-navy-foreground/10 ${
            lang.code === i18n.language ? 'text-brand font-semibold' : 'text-navy-foreground/80'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-navy text-navy-foreground">
      <div className="container flex items-center justify-between h-24">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Infra-Beton" className="h-20 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium transition-colors hover:text-brand text-navy-foreground/80"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="text-sm font-semibold px-5 py-2 bg-brand text-brand-foreground rounded-md hover:bg-brand-hover transition-colors"
          >
            {t('nav.contact')}
          </Link>
          {SHOW_LANGUAGE_SWITCHER && (
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-sm font-medium bg-navy-foreground/10 hover:bg-navy-foreground/20 px-3 py-1.5 rounded-md transition-colors"
              >
                <Globe size={16} />
                {currentLang.short}
                <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && languageMenu}
            </div>
          )}
        </nav>

        {/* Mobile: sprogvælger + burger */}
        <div className="md:hidden flex items-center gap-2">
          {SHOW_LANGUAGE_SWITCHER && (
            <div className="relative" ref={mobileLangRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm font-medium bg-navy-foreground/10 hover:bg-navy-foreground/20 px-2.5 py-1.5 rounded-md transition-colors"
              >
                <Globe size={15} />
                {currentLang.short}
                <ChevronDown size={13} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && languageMenu}
            </div>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav id="mobile-nav" className="md:hidden bg-navy border-t border-navy-foreground/10 pb-4">
          {[...links, { to: '/contact', label: t('nav.contact') }].map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-3 text-sm font-medium transition-colors hover:text-brand text-navy-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
