import React from 'react';
import { Flame, Sparkles, Heart, Utensils, Bike, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-24 bg-[#0e0f13] border-t border-b border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Street Joint Identity & Principles */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="text-xs font-semibold uppercase tracking-widest text-orange-500">
              ABOUT US
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Good Food, Great Vibes, Same Chizzy Hub
            </h2>

            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                Founded right in the heart of the <strong className="text-white">UPSA Hostel C</strong> community, CHIZZY HUB was built on a passion for delivering sizzling street food with genuine generosity and bold flavors.
              </p>

              <p>
                From our crispy toasted shawarma wraps and golden loaded fries to our fiery spicy chicken wings, stone-baked pizzas, and crisp chicken salads, everything is prepared fresh to order with care and authenticity.
              </p>

              <p>
                Every day from <strong className="text-amber-400">1:00 PM</strong> onwards, our kitchen is firing up orders for delivery straight to student hostel doors, campus residences, and food lovers across Accra.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-200">
                100% Freshly Made
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300">
                Delivery From 1:00 PM
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                UPSA Hostel C Flagship
              </span>
            </div>
          </div>

          {/* Right Column: 4 Core Street Pillars (NO PICTURES) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-2xl bg-neutral-900 border border-white/10 text-left space-y-2">
              <div className="w-10 h-10 rounded-xl bg-orange-600/15 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Freshly Rolled & Toasted</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Charred flatbread griddled to golden crunch upon every order. Never pre-wrapped or soggy.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900 border border-white/10 text-left space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Loaded Cheeses & Meats</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Generous portions of seasoned meats and molten cheese. Real value for your money.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900 border border-white/10 text-left space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/15 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Bike className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Prompt Delivery From 1PM</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Direct to your door across UPSA hostels and Accra corridor via our riders, Bolt Food & Chowdeck.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900 border border-white/10 text-left space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-600/15 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Campus Community Hub</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Friendly counter service, student discounts, and warm hospitality at UPSA Hostel C.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
