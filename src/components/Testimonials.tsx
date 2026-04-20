import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    key: 'sophie',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
  },
  {
    key: 'james',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
  },
  {
    key: 'amelia',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
  },
];

const platforms = [
  { label: 'TripAdvisor', rating: '4.9', count: '1,200+' },
  { label: 'Google',      rating: '4.8', count: '980+' },
  { label: 'Yelp',        rating: '4.9', count: '750+' },
];

export default function Testimonials() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="testimonials" className="bg-stone-900 py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-amber-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-amber-400 text-sm font-semibold tracking-[0.35em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-amber-400" />
            {t('testimonials.sectionTag')}
            <span className="w-8 h-px bg-amber-400" />
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('testimonials.title1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              {t('testimonials.titleAccent')}
            </span>
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-lg">{t('testimonials.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t2, i) => (
            <div
              key={t2.key}
              className={`group bg-stone-950 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-8 transition-all duration-700 hover:shadow-2xl hover:shadow-amber-500/5 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <Quote size={32} className="text-amber-500/30 mb-4" />

              <div className="flex gap-1 mb-4">
                {[...Array(t2.rating)].map((_, j) => (
                  <span key={j} className="text-amber-400 text-lg">&#9733;</span>
                ))}
              </div>

              <p className="text-stone-300 text-sm leading-relaxed mb-6 italic">
                "{t(`testimonials.reviews.${t2.key}`)}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-800">
                <img
                  src={t2.avatar}
                  alt={t(`testimonials.reviews.${t2.key}`)}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-500/30"
                />
                <div>
                  {/* Names kept as proper nouns — not translated */}
                  <p className="text-white font-semibold text-sm">
                    {t2.key === 'sophie' ? 'Sophie Laurent' : t2.key === 'james' ? 'James Weston' : 'Amelia Rossi'}
                  </p>
                  <p className="text-amber-400/70 text-xs">{t(`testimonials.roles.${t2.key}`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap justify-center items-center gap-12">
          {platforms.map((platform) => (
            <div key={platform.label} className="text-center">
              <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">{platform.label}</p>
              <p className="text-amber-400 text-3xl font-bold">{platform.rating}</p>
              <p className="text-stone-500 text-xs">{platform.count} Reviews</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}