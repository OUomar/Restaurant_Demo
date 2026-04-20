import { useState, useEffect, useRef } from 'react';
import { Menu, X, UtensilsCrossed, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NAV_KEYS = ['about', 'menu', 'gallery', 'testimonials', 'contact'] as const;

const LANGUAGES = [
  { code: 'fr', label: 'FR', flag: 'https://flagcdn.com/w40/fr.png' },
  { code: 'en', label: 'EN', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'ar', label: 'AR', flag: 'https://flagcdn.com/w40/ma.png' },
];

export default function Navbar() {
  // useTranslation() déclenche normalement un re-render quand la langue change
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Déterminer la langue actuelle de manière robuste
  const currentLang = LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) || LANGUAGES[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const changeLanguage = async (code: string) => {
    try {
      await i18n.changeLanguage(code);
      setLangOpen(false);
      // Force la direction pour l'arabe
      document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = code;
    } catch (error) {
      console.error("Erreur lors du changement de langue:", error);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-stone-950/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <UtensilsCrossed size={18} className="text-stone-950" />
          </div>
          <span className="text-white font-bold text-xl tracking-wide">Aurum<span className="text-amber-400">Bistro</span></span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_KEYS.map((key) => (
            <li key={key}>
              <button onClick={() => handleNav(`#${key}`)} className="text-stone-300 hover:text-amber-400 text-sm font-medium uppercase tracking-wider transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-amber-400 hover:after:w-full after:transition-all">
                {t(`nav.${key}`)}
              </button>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 text-stone-300 hover:text-amber-400 border border-stone-700 rounded-full px-3 py-2 text-sm font-medium transition-all"
            >
              <img src={currentLang.flag} alt="" className="w-4 h-3 object-cover rounded-sm" />
              <span>{currentLang.label}</span>
              <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {langOpen && (
              <div className="absolute top-full mt-2 right-0 bg-stone-900 border border-stone-700 rounded-xl overflow-hidden shadow-2xl min-w-[140px] z-[100]">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                      i18n.resolvedLanguage === lang.code ? 'text-amber-400 bg-amber-500/10' : 'text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    <img src={lang.flag} alt="" className="w-4 h-3 object-cover rounded-sm" />
                    <span className="font-medium">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => handleNav('#contact')} className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm px-6 py-2.5 rounded-full transition-all hover:scale-105">
            {t('nav.reserve')}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setLangOpen(!langOpen)} className="text-stone-300 border border-stone-700 rounded-full px-2 py-1 text-xs flex items-center gap-2">
            <img src={currentLang.flag} alt="" className="w-4 h-3 object-cover rounded-sm" />
            {currentLang.label}
          </button>
          
          <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}