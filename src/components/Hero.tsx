import React from 'react';
import { Phone, MessageCircle, MapPin, Sparkles, ArrowRight, Bike, Clock, Flame, Check } from 'lucide-react';
import { RESTAURANT_INFO, MENU_ITEMS } from '../data/restaurantData';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu }) => {

  return (
    <section className="relative min-h-[80vh] flex items-center bg-[#0b0c0e] overflow-hidden pt-8 pb-16 lg:py-20">
      {/* Background Ambient Glows */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Street Joint Positioning & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Meta Kicker: Delivery Schedule & Location */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-orange-400 tracking-wide mb-3">
              <span className="flex items-center gap-1.5 text-amber-300 font-bold bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                <Bike className="w-3.5 h-3.5 text-amber-400" />
                {RESTAURANT_INFO.deliveryNotice}
              </span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="flex items-center gap-1 text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                {RESTAURANT_INFO.location}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-4 text-balance">
              {RESTAURANT_INFO.tagline}
            </h1>

            {/* Persuasive Subheadline */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-6 font-normal">
              Accra's beloved street food joint at UPSA Hostel C! Sizzling fresh shawarma from <strong className="text-white">GH₵ 40</strong>, monster loaded fries from <strong className="text-white">GH₵ 70</strong>, spicy chicken wings, and stone-baked pizza. Freshly made always!
            </p>

            {/* Delivery Platforms Trust Bar (Bolt Food & Chowdeck) */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Available On:
              </span>
              <span className="px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                Bolt Food
              </span>
              <span className="px-3 py-1 rounded-md bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-bold">
                Chowdeck
              </span>
              <span className="text-xs text-neutral-400 hidden sm:inline">
                & Direct WhatsApp
              </span>
            </div>

            {/* Action Triggers / CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 active:scale-[0.98] transition-all shadow-lg shadow-orange-600/30 flex items-center gap-2 group cursor-pointer"
              >
                <span>View Menu & Order</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-emerald-300 bg-neutral-900 border border-emerald-500/40 hover:bg-emerald-950/40 hover:border-emerald-400 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {RESTAURANT_INFO.phoneDisplay}</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phoneClean}`}
                className="px-4 py-3.5 rounded-xl text-xs sm:text-sm font-medium text-neutral-300 bg-neutral-900/80 border border-white/10 hover:border-white/20 hover:text-white transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                <span>Call {RESTAURANT_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* Street Joint Trust Counters */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold text-white tabular-nums">GH₵ 40</div>
                <div className="text-xs text-neutral-400 mt-0.5">Shawarma Starts</div>
              </div>
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold text-orange-400 tabular-nums">From 1PM</div>
                <div className="text-xs text-neutral-400 mt-0.5">Doorstep Delivery</div>
              </div>
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold text-white tabular-nums">UPSA</div>
                <div className="text-xs text-neutral-400 mt-0.5">Hostel C Flagship</div>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Delivery & Fast Order Hub (NO PICTURES) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-[#121317] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-7 text-left space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-white text-base sm:text-lg">
                    Order Direct & Delivery
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Open 1:00 PM
                </span>
              </div>

              {/* Delivery Zones List */}
              <div className="space-y-2.5">
                <div className="text-[11px] uppercase tracking-wider font-bold text-neutral-400">
                  Our Delivery & Pickup Zones:
                </div>

                <div className="p-3 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <div>
                      <div className="text-xs font-bold text-white">UPSA Hostel C Pick Up</div>
                      <div className="text-[10px] text-neutral-400">Direct counter pickup · Payment on Delivery</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400">FREE</span>
                </div>

                <div className="p-3 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Madina & Around Madina</div>
                      <div className="text-[10px] text-neutral-400">Zongo Junction, Ritz, Estate, Market</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-orange-400">GH₵ 10</span>
                </div>

                <div className="p-3 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Legon</div>
                      <div className="text-[10px] text-neutral-400">UG Campus, East Legon, West Legon, Okponglo</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-orange-400">GH₵ 15</span>
                </div>

                <div className="p-3 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-neutral-500" />
                    <div>
                      <div className="text-xs font-bold text-white">Around Accra</div>
                      <div className="text-[10px] text-neutral-400">Greater Accra doorstep dispatch</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-orange-400">GH₵ 20</span>
                </div>
              </div>

              {/* Order Methods Box */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs text-neutral-300">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    Delivery Schedule:
                  </span>
                  <span className="text-amber-300 font-bold">1:00 PM – Late Night</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    Flagship Joint:
                  </span>
                  <span className="text-white font-medium">UPSA Hostel C</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-orange-400" />
                    Hotline:
                  </span>
                  <span className="text-emerald-400 font-bold font-mono">{RESTAURANT_INFO.phoneDisplay}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onExploreMenu}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Full Menu & Pricing</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
