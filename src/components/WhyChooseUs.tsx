import React from 'react';
import { WHY_CHOOSE_US } from '../data/restaurantData';
import { Flame, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const icons = [Flame, Sparkles, Clock, ShieldCheck];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-[#0e0f13] border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-2">
            The Chizzy Distinction
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Why UPSA & Accra Choose Chizzy Hub
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            We don’t do shortcuts or dry meat. Here is why our customers keep coming back every single evening.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-orange-500/30 transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-600/15 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-600/25 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-orange-400 tracking-wide">
                    {item.metric}
                  </span>
                  <span className="text-xs font-mono text-neutral-500 tabular-nums">
                    0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtle Credibility Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-center text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span>Flame-charred flatbread baked fresh</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span>Strict hygiene & food handling standards</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span>Direct pickup at UPSA Hostel C</span>
          </div>
        </div>

      </div>
    </section>
  );
};
