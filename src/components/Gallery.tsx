import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const images = [
  { src: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',  key: 'platter',  span: 'md:col-span-2 md:row-span-2' },
  { src: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600', key: 'pasta',    span: '' },
  { src: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600', key: 'salad',    span: '' },
  { src: 'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=800', key: 'ambiance', span: 'md:col-span-2' },
  { src: 'https://images.pexels.com/photos/3843308/pexels-photo-3843308.jpeg?auto=compress&cs=tinysrgb&w=600', key: 'dessert',  span: '' },
  { src: 'https://images.pexels.com/photos/1581554/pexels-photo-1581554.jpeg?auto=compress&cs=tinysrgb&w=600', key: 'wine',     span: '' },
];

export default function Gallery() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="gallery" className="bg-stone-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-amber-400 text-sm font-semibold tracking-[0.35em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-amber-400" />
            {t('gallery.sectionTag')}
            <span className="w-8 h-px bg-amber-400" />
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('gallery.title1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              {t('gallery.titleAccent')}
            </span>
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-lg">{t('gallery.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {images.map((img, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${img.span} ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              } transition-all duration-700`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <img
                src={img.src}
                alt={t(`gallery.images.${img.key}`)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-amber-500/40 rounded-2xl transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white font-semibold text-sm">{t(`gallery.images.${img.key}`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}