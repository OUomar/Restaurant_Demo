import { useTranslation } from 'react-i18next';
import { UtensilsCrossed, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook,  href: '#', label: 'Facebook' },
  { icon: Twitter,   href: '#', label: 'Twitter' },
  { icon: Youtube,   href: '#', label: 'YouTube' },
];

const NAV_KEYS = ['about', 'menu', 'gallery', 'testimonials', 'contact'] as const;

const hourEntries = [
  { key: 'monThu', time: '12:00 – 22:00' },
  { key: 'friSat', time: '12:00 – 23:30' },
  { key: 'sunday', time: '13:00 – 21:00' },
];

export default function Footer() {
  const { t } = useTranslation();

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a
              href="#"
              className="flex items-center gap-2 mb-4"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <UtensilsCrossed size={18} className="text-stone-950" />
              </div>
              <span className="text-white font-bold text-xl tracking-wide">
                Aurum<span className="text-amber-400">Bistro</span>
              </span>
            </a>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">{t('footer.tagline')}</p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-stone-800 hover:bg-amber-500 border border-stone-700 hover:border-amber-500 flex items-center justify-center text-stone-400 hover:text-stone-950 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {NAV_KEYS.map((key) => (
                <li key={key}>
                  <button
                    onClick={() => handleNav(`#${key}`)}
                    className="text-stone-400 hover:text-amber-400 text-sm transition-colors duration-300"
                  >
                    {t(`nav.${key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              {t('footer.openingHours')}
            </h4>
            <ul className="space-y-3">
              {hourEntries.map(({ key, time }) => (
                <li key={key}>
                  <p className="text-stone-500 text-xs uppercase tracking-wide">
                    {t(`footer.hours.${key}`)}
                  </p>
                  <p className="text-stone-300 text-sm font-medium">{time}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              {t('footer.newsletter')}
            </h4>
            <p className="text-stone-400 text-sm mb-4 leading-relaxed">{t('footer.newsletterText')}</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder={t('footer.newsletterPlaceholder')}
                className="flex-1 bg-stone-900 border border-stone-700 focus:border-amber-500 text-white placeholder-stone-600 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors duration-300"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold px-4 py-2.5 rounded-xl text-sm transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 shrink-0"
              >
                {t('footer.join')}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-xs">
            &copy; {new Date().getFullYear()} Aurum Bistro. {t('footer.copyright')}
          </p>
          <div className="flex gap-6">
            {(['privacy', 'terms', 'cookies'] as const).map((key) => (
              <a
                key={key}
                href="#"
                className="text-stone-500 hover:text-amber-400 text-xs transition-colors duration-300"
                onClick={(e) => e.preventDefault()}
              >
                {t(`footer.${key}`)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}