import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Award, Leaf, ChefHat } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation();

  const badges = [
    { icon: Award, key: 'michelin' },
    { icon: Leaf, key: 'organic' },
    { icon: ChefHat, key: 'chefs' },
  ];

  return (
    <section id="about" className="bg-stone-950 py-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div
          ref={leftRef}
          className={`relative transition-all duration-1000 ${
            leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}
        >
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
            <img
              src="https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Restaurant interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
          </div>

          <div className="absolute -bottom-6 -right-6 bg-amber-500 rounded-2xl p-6 shadow-2xl shadow-amber-500/30">
            <p className="text-stone-950 text-4xl font-bold leading-none">15</p>
            <p className="text-stone-950/80 text-sm font-semibold mt-1">{t('about.years')}</p>
          </div>

          <div className="absolute top-6 -left-6 bg-stone-900/90 backdrop-blur-sm border border-stone-700 rounded-xl p-4 shadow-xl">
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-amber-400 text-sm">&#9733;</span>
              ))}
            </div>
            <p className="text-white text-xs font-medium">{t('about.rating')}</p>
            <p className="text-stone-400 text-xs">{t('about.reviews')}</p>
          </div>
        </div>

        <div
          ref={rightRef}
          className={`transition-all duration-1000 delay-200 ${
            rightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}
        >
          <p className="text-amber-400 text-sm font-semibold tracking-[0.35em] uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-amber-400" />
            {t('about.sectionTag')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t('about.title1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              {t('about.titleAccent')}
            </span>
          </h2>
          <p className="text-stone-400 leading-relaxed mb-5">{t('about.p1')}</p>
          <p className="text-stone-400 leading-relaxed mb-8">{t('about.p2')}</p>

          <div className="flex flex-wrap gap-4 mb-10">
            {badges.map(({ icon: Icon, key }) => (
              <div
                key={key}
                className="flex items-center gap-2 bg-stone-900 border border-stone-700 rounded-full px-4 py-2"
              >
                <Icon size={16} className="text-amber-400" />
                <span className="text-stone-300 text-sm font-medium">
                  {t(`about.badges.${key}`)}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-transparent border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-stone-950 font-bold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 tracking-wide"
          >
            {t('about.cta')}
          </button>
        </div>
      </div>
    </section>
  );
}