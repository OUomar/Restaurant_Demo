import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// dish keys matched to translation keys
const dishes = [
  { id: 1, category: 'Starters', key: 'burrata',         price: '$18', tag: 'chefsPick',   image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 2, category: 'Starters', key: 'scallops',        price: '$24', tag: 'seasonal',    image: 'https://images.pexels.com/photos/566344/pexels-photo-566344.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 3, category: 'Mains',    key: 'wagyu',           price: '$68', tag: 'signature',   image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 4, category: 'Mains',    key: 'seabass',         price: '$46', tag: 'popular',     image: 'https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 5, category: 'Mains',    key: 'risotto',         price: '$32', tag: 'vegetarian',  image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 6, category: 'Desserts', key: 'chocolateSphere', price: '$16', tag: 'showstopper', image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 7, category: 'Desserts', key: 'cremeBrulee',     price: '$14', tag: 'classic',     image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 8, category: 'Drinks',   key: 'sangria',         price: '$16', tag: 'signature',   image: 'https://images.pexels.com/photos/1304473/pexels-photo-1304473.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const CATEGORY_KEYS = ['all', 'starters', 'mains', 'desserts', 'drinks'] as const;
// maps category keys to the dish category values
const CATEGORY_MAP: Record<string, string> = {
  all: 'All',
  starters: 'Starters',
  mains: 'Mains',
  desserts: 'Desserts',
  drinks: 'Drinks',
};

const tagColorMap: Record<string, string> = {
  chefsPick:   'bg-amber-500/20 text-amber-400 border-amber-500/30',
  seasonal:    'bg-green-500/20 text-green-400 border-green-500/30',
  signature:   'bg-orange-500/20 text-orange-400 border-orange-500/30',
  popular:     'bg-blue-500/20 text-blue-400 border-blue-500/30',
  vegetarian:  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  showstopper: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  classic:     'bg-stone-500/20 text-stone-300 border-stone-500/30',
};

function DishCard({
  dish,
  visible,
  delay,
}: {
  dish: typeof dishes[0];
  visible: boolean;
  delay: number;
}) {
  const { t } = useTranslation();

  return (
    <div
      className={`group bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 hover:border-amber-500/40 transition-all duration-700 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={dish.image}
          alt={t(`menu.dishes.${dish.key}.name`)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full border ${
            tagColorMap[dish.tag] ?? 'bg-stone-700 text-stone-300'
          }`}
        >
          {t(`menu.tags.${dish.tag}`)}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white font-bold text-lg leading-snug group-hover:text-amber-400 transition-colors duration-300 flex-1 pr-3">
            {t(`menu.dishes.${dish.key}.name`)}
          </h3>
          <span className="text-amber-400 font-bold text-lg shrink-0">{dish.price}</span>
        </div>
        <p className="text-stone-400 text-sm leading-relaxed">
          {t(`menu.dishes.${dish.key}.description`)}
        </p>
        <button className="mt-4 w-full text-center text-sm font-semibold text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-stone-950 hover:border-amber-500 py-2 rounded-full transition-all duration-300">
          {t('menu.addToOrder')}
        </button>
      </div>
    </div>
  );
}

export default function Menu() {
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState<string>('all');
  const { ref, isVisible } = useScrollAnimation();

  const filtered =
    activeKey === 'all'
      ? dishes
      : dishes.filter((d) => d.category === CATEGORY_MAP[activeKey]);

  return (
    <section id="menu" className="bg-stone-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-amber-400 text-sm font-semibold tracking-[0.35em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-amber-400" />
            {t('menu.sectionTag')}
            <span className="w-8 h-px bg-amber-400" />
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('menu.title1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              {t('menu.titleAccent')}
            </span>
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-lg">{t('menu.subtitle')}</p>

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {CATEGORY_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                className={`px-6 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                  activeKey === key
                    ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/30'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
                }`}
              >
                {t(`menu.categories.${key}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((dish, i) => (
            <DishCard key={dish.id} dish={dish} visible={isVisible} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}