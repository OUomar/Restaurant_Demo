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
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  
  // On utilise deux refs si on a deux menus séparés, ou on gère la fermeture proprement
  const langMenuRef = useRef<HTMLDivElement>(null);
  const mobileLangMenuRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) || LANGUAGES[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      // Ferme le menu si on clique en dehors de l'un ou de l'autre
      const isOutsideDesktop = langMenuRef.current && !langMenuRef.current.contains(event.target as Node);
      const isOutsideMobile = mobileLangMenuRef.current && !mobileLangMenuRef.current.contains(event.target as Node);
      
      if (isOutsideDesktop && isOutsideMobile) {
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
      document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = code;
    } catch (error) {
      console.error("Erreur langue:", error);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500  ${
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
          <span className="text-white font-bold text-xl tracking-wide uppercase">
            Aurum<span className="text-amber-400">Bistro</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_KEYS.map((key) => (
            <li key={key}>
              <button onClick={() => handleNav(`#${key}`)} className="text-stone-300 hover:text-amber-400 text-xs font-semibold uppercase tracking-widest transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-amber-400 hover:after:w-full after:transition-all">
                {t(`nav.${key}`)}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 text-stone-300 hover:text-amber-400 border border-stone-800 hover:border-amber-500/30 rounded-full px-3 py-1.5 text-xs font-bold transition-all"
            >
              <img src={currentLang.flag} alt="" className="w-4 h-3 object-cover rounded-sm" />
              <span>{currentLang.label}</span>
              <ChevronDown size={12} className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {langOpen && (
              <div className="absolute top-full mt-2 right-0 bg-stone-900 border border-stone-800 rounded-lg overflow-hidden shadow-2xl min-w-[120px] z-[100]">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium transition-colors ${
                      i18n.resolvedLanguage === lang.code ? 'text-amber-400 bg-amber-500/5' : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                    }`}
                  >
                    <img src={lang.flag} alt="" className="w-4 h-3 object-cover rounded-sm" />
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => handleNav('#contact')} className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-tighter px-5 py-2 rounded-full transition-all hover:scale-105">
            {t('nav.reserve')}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden  flex items-center gap-3">
          {/* Mobile Language Switcher */}
          <div className="relative" ref={mobileLangMenuRef}>
            <button 
              onClick={() => setLangOpen(!langOpen)} 
              className="text-stone-300 border border-stone-800 rounded-full px-3 py-1.5 text-[10px] font-bold flex items-center gap-2"
            >
              <img src={currentLang.flag} alt="" className="w-4 h-3 object-cover rounded-sm" />
              {currentLang.label}
              <ChevronDown size={10} />
            </button>
            
            {langOpen && (
              <div className="absolute top-full mt-2 right-0 bg-stone-900 border border-stone-800 rounded-lg shadow-2xl min-w-[100px] z-[100]">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold border-b border-stone-800 last:border-none text-stone-300"
                  >
                    <img src={lang.flag} alt="" className="w-4 h-3 object-cover rounded-sm" />
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button className="text-white p-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Links Overlay */}
      <div className={`md:hidden absolute left-0 w-full transition-all duration-300 ease-in-out overflow-hidden ${
        menuOpen ? 'max-h-screen bg-gray-900' : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
        <div className="px-8 py-10 flex flex-col gap-6">
          {NAV_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => handleNav(`#${key}`)}
              className="text-stone-400 hover:text-amber-400 text-lg font-bold uppercase tracking-widest text-left transition-colors"
            >
              {t(`nav.${key}`)}
            </button>
          ))}
          <button
            onClick={() => handleNav('#contact')}
            className="bg-amber-500 text-stone-950 font-bold text-sm uppercase py-4 rounded-xl mt-4"
          >
            {t('nav.reserve')}
          </button>
        </div>
      </div>
    </nav>
  );
}