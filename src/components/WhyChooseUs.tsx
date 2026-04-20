import { Leaf, Clock, Star, Flame, Users, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const features = [
  { icon: Leaf,   key: 'ingredients', color: 'from-emerald-500/20 to-emerald-500/5', iconColor: 'text-emerald-400', border: 'hover:border-emerald-500/40' },
  { icon: Trophy, key: 'chefs',       color: 'from-amber-500/20 to-amber-500/5',     iconColor: 'text-amber-400',   border: 'hover:border-amber-500/40' },
  { icon: Flame,  key: 'recipes',     color: 'from-orange-500/20 to-orange-500/5',   iconColor: 'text-orange-400',  border: 'hover:border-orange-500/40' },
  { icon: Users,  key: 'atmosphere',  color: 'from-rose-500/20 to-rose-500/5',       iconColor: 'text-rose-400',    border: 'hover:border-rose-500/40' },
  { icon: Clock,  key: 'service',     color: 'from-sky-500/20 to-sky-500/5',         iconColor: 'text-sky-400',     border: 'hover:border-sky-500/40' },
  { icon: Star,   key: 'experiences', color: 'from-purple-500/20 to-purple-500/5',   iconColor: 'text-violet-400',  border: 'hover:border-violet-500/40' },
];

export default function WhyChooseUs() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-stone-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-amber-400 text-sm font-semibold tracking-[0.35em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-amber-400" />
            {t('whyUs.sectionTag')}
            <span className="w-8 h-px bg-amber-400" />
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('whyUs.title1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              {t('whyUs.titleAccent')}
            </span>
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-lg">{t('whyUs.subtitle')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.key}
                className={`group relative bg-stone-950 border border-stone-800 ${feat.border} rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  transitionProperty: 'opacity, transform, box-shadow, border-color',
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-stone-800 group-hover:bg-stone-700 flex items-center justify-center mb-5 transition-colors duration-300">
                    <Icon size={22} className={feat.iconColor} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3 group-hover:text-amber-400 transition-colors duration-300">
                    {t(`whyUs.features.${feat.key}.title`)}
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    {t(`whyUs.features.${feat.key}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}