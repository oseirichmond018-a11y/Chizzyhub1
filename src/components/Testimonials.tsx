import React from 'react';
import { TESTIMONIALS } from '../data/restaurantData';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#0e0f13] border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-2">
            Verified Reviews
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Loved Across UPSA & Accra
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Real feedback from students, faculty, and Accra foodies who know quality shawarma when they taste it.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-7 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-orange-500/30 transition-all duration-300 flex flex-col justify-between text-left relative group"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-white/10 group-hover:text-orange-500/30 transition-colors" />
                </div>

                {/* Dish ordered indicator */}
                <div className="text-xs font-semibold text-orange-400 mb-3 flex items-center gap-1.5">
                  <span>Favorite:</span>
                  <span className="text-neutral-200">{t.dishOrdered}</span>
                </div>

                {/* Review Body */}
                <p className="text-sm text-neutral-300 leading-relaxed italic mb-6">
                  “{t.review}”
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-600 font-display font-bold text-white text-xs flex items-center justify-center shrink-0">
                    {t.avatarInitials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{t.name}</span>
                      {t.verified && (
                        <span title="Verified Customer" className="inline-flex items-center">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-neutral-400">{t.role}</p>
                  </div>
                </div>

                <span className="text-[11px] text-neutral-500 tabular-nums">
                  {t.date}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Aggregate Social Proof Bar */}
        <div className="mt-14 p-5 rounded-2xl bg-neutral-900/80 border border-white/10 max-w-2xl mx-auto flex flex-wrap items-center justify-around gap-4 text-center">
          <div>
            <div className="font-display text-2xl font-bold text-white tabular-nums">4.9 / 5.0</div>
            <div className="text-xs text-neutral-400 mt-0.5">Campus Customer Rating</div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden sm:block" />
          <div>
            <div className="font-display text-2xl font-bold text-orange-400 tabular-nums">1,200+</div>
            <div className="text-xs text-neutral-400 mt-0.5">Shawarma Wraps Served</div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden sm:block" />
          <div>
            <div className="font-display text-2xl font-bold text-emerald-400 tabular-nums">98%</div>
            <div className="text-xs text-neutral-400 mt-0.5">Repeat Cravings</div>
          </div>
        </div>

      </div>
    </section>
  );
};
