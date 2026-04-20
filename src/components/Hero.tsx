import { useEffect, useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToMenu = () => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/50 to-stone-950/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/60 via-transparent to-stone-950/60" />

      <div
        className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-amber-400 text-sm font-semibold tracking-[0.35em] uppercase mb-4 mt-24 flex items-center justify-center gap-3 ">
          <span className="w-8 h-px bg-amber-400" />
          {t('hero.tagline')}
          <span className="w-8 h-px bg-amber-400" />
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
          {t('hero.title1')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
            {t('hero.titleAccent')}
          </span>{' '}
          <br className="hidden md:block" />
          {t('hero.title2')}
        </h1>

        <p className="text-stone-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToMenu}
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-10 py-4 rounded-full text-base tracking-wide transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/40 hover:scale-105"
          >
            {t('hero.viewMenu')}
          </button>
          <button
            onClick={scrollToContact}
            className="border border-white/40 hover:border-amber-400 text-white hover:text-amber-400 font-semibold px-10 py-4 rounded-full text-base tracking-wide backdrop-blur-sm transition-all duration-300 hover:bg-white/5"
          >
            {t('hero.reserveTable')}
          </button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-10">
          {[
            { value: '15+', key: 'years' },
            { value: '200+', key: 'dishes' },
            { value: '50K+', key: 'guests' },
          ].map((stat) => (
            <div key={stat.key} className="text-center">
              <p className="text-amber-400 text-2xl md:text-3xl font-bold">{stat.value}</p>
              <p className="text-stone-400 text-xs tracking-widest uppercase mt-1">
                {t(`hero.stats.${stat.key}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollToMenu}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-amber-400 transition-colors duration-300 animate-bounce"
      >
        <ChevronDown size={32} />
      </button>

      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 transition-all duration-300 hover:scale-110"
      >
        <MessageCircle size={26} className="text-white" />
      </a>
    </section>
  );
}