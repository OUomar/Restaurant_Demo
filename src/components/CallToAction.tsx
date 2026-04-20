import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { CalendarDays, MessageCircle } from 'lucide-react';

const hourSlots = [
  { key: 'monThu', time: '12:00 – 22:00' },
  { key: 'friSat', time: '12:00 – 23:30' },
  { key: 'sunday', time: '13:00 – 21:00' },
];

export default function CallToAction() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      />
      <div className="absolute inset-0 bg-stone-950/85" />

      <div
        ref={ref}
        className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <p className="text-amber-400 text-sm font-semibold tracking-[0.35em] uppercase mb-6 flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-amber-400" />
          {t('cta.sectionTag')}
          <span className="w-8 h-px bg-amber-400" />
        </p>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {t('cta.title1')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
            {t('cta.titleAccent')}
          </span>
        </h2>

        <p className="text-stone-300 text-lg md:text-xl mb-10 leading-relaxed">
          {t('cta.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-10 py-4 rounded-full text-base tracking-wide transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/40 hover:scale-105"
          >
            <CalendarDays size={18} />
            {t('cta.bookTable')}
          </button>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500/20 border border-green-500/50 hover:bg-green-500 text-green-400 hover:text-white font-bold px-10 py-4 rounded-full text-base tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30"
          >
            <MessageCircle size={18} />
            {t('cta.whatsapp')}
          </a>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {hourSlots.map((slot) => (
            <div key={slot.key} className="text-center">
              <p className="text-amber-400 text-xs uppercase tracking-widest mb-1">
                {t(`cta.hours.${slot.key}`)}
              </p>
              <p className="text-white font-semibold">{slot.time}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}