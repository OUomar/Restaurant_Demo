import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();
  const [form, setForm] = useState({ name: '', email: '', date: '', guests: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    { icon: MapPin, key: 'address',      value: '42 Rue de la Paix, 8th Arrondissement, Paris, France' },
    { icon: Phone,  key: 'reservations', value: '+1 (555) 867-5309' },
    { icon: Mail,   key: 'email',        value: 'hello@aurumbistro.com' },
    { icon: Clock,  key: 'hours',        value: t('contact.info.hoursValue') },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', date: '', guests: '', message: '' });
  };

  return (
    <section id="contact" className="bg-stone-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-amber-400 text-sm font-semibold tracking-[0.35em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-amber-400" />
            {t('contact.sectionTag')}
            <span className="w-8 h-px bg-amber-400" />
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('contact.title1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              {t('contact.titleAccent')}
            </span>
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-lg">{t('contact.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: info + map */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="space-y-6 mb-10">
              {contactInfo.map(({ icon: Icon, key, value }) => (
                <div key={key} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-stone-500 text-xs uppercase tracking-widest mb-0.5">
                      {t(`contact.info.${key}`)}
                    </p>
                    <p className="text-stone-200 text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden border border-stone-800 shadow-2xl h-64">
              <iframe
                title="Aurum Bistro Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.141766024037!2d2.325195515481!3d48.87079097928988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f9f8c0e1549%3A0xb4ca0ca2e04e6b0e!2sRue%20de%20la%20Paix%2C%20Paris!5e0!3m2!1sen!2sfr!4v1617000000000!5m2!1sen!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale"
              />
            </div>
          </div>

          {/* Right: form */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: '250ms' }}
          >
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8">
              <h3 className="text-white font-bold text-xl mb-6">{t('contact.form.title')}</h3>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-amber-400" />
                  </div>
                  <p className="text-white font-bold text-lg mb-2">{t('contact.form.successTitle')}</p>
                  <p className="text-stone-400 text-sm">{t('contact.form.successMessage')}</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-amber-400 text-sm hover:underline"
                  >
                    {t('contact.form.another')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-stone-400 text-xs uppercase tracking-widest mb-2 block">
                        {t('contact.form.name')}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={t('contact.form.namePlaceholder')}
                        className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-white placeholder-stone-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="text-stone-400 text-xs uppercase tracking-widest mb-2 block">
                        {t('contact.form.email')}
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-white placeholder-stone-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-stone-400 text-xs uppercase tracking-widest mb-2 block">
                        {t('contact.form.date')}
                      </label>
                      <input
                        type="date"
                        required
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-300 [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="text-stone-400 text-xs uppercase tracking-widest mb-2 block">
                        {t('contact.form.guests')}
                      </label>
                      <select
                        required
                        value={form.guests}
                        onChange={(e) => setForm({ ...form, guests: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-300 appearance-none"
                      >
                        <option value="" className="bg-stone-950">
                          {t('contact.form.guestsPlaceholder')}
                        </option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n} className="bg-stone-950">
                            {n} {n === 1 ? t('contact.form.guestSingular') : t('contact.form.guestPlural')}
                          </option>
                        ))}
                        <option value="9+" className="bg-stone-950">
                          {t('contact.form.guestPrivate')}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-stone-400 text-xs uppercase tracking-widests mb-2 block">
                      {t('contact.form.specialRequests')}
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t('contact.form.specialPlaceholder')}
                      className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-white placeholder-stone-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-4 rounded-xl tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    {t('contact.form.submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}