import React from 'react';
import { MapPin, Clock, Phone, MessageCircle, Navigation, CheckCircle2, Bike } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface LocationHoursProps {
  onOrderNow: () => void;
}

export const LocationHours: React.FC<LocationHoursProps> = ({ onOrderNow }) => {
  return (
    <section id="location" className="py-20 lg:py-24 bg-[#0b0c0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-2">
            Find & Contact Us
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Located at UPSA Hostel C, Accra
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Stop by for hot counter takeaway, order via WhatsApp, or have your meal delivered directly to your doorstep.
          </p>
        </div>

        {/* Location & Delivery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Location & Delivery Hours */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Primary Location Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/80 border border-white/10 text-left">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {RESTAURANT_INFO.name} Street Counter
                  </h3>
                  <p className="text-sm text-neutral-300 mt-1">
                    {RESTAURANT_INFO.location}, Accra, Ghana
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Landmark: Directly accessible at UPSA Hostel C.
                  </p>
                </div>
              </div>

              {/* Delivery & Hours Box */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="flex items-center gap-2 text-neutral-300 font-medium">
                    <Bike className="w-4 h-4 text-amber-400" />
                    Delivery Schedule:
                  </span>
                  <span className="text-amber-400 font-bold">
                    {RESTAURANT_INFO.deliveryNotice}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-white/5">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-400" />
                    Counter Takeaway & Orders:
                  </span>
                  <span className="text-white font-medium">{RESTAURANT_INFO.operatingHours}</span>
                </div>
              </div>

              {/* Direct Order Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                <a
                  href={`tel:${RESTAURANT_INFO.phoneClean}`}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <Phone className="w-4 h-4 text-orange-400" />
                  <span>Call {RESTAURANT_INFO.phoneDisplay}</span>
                </a>

                <a
                  href={RESTAURANT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Order</span>
                </a>
              </div>
            </div>

            {/* Delivery Areas Coverage Card */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 text-left">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-3 flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                Active Doorstep Delivery Zones (From 1:00 PM)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {RESTAURANT_INFO.deliveryAreas.map((area) => (
                  <div key={area} className="flex items-center gap-1.5 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Map Graphic & Online Order CTA Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full rounded-2xl overflow-hidden bg-neutral-900/80 border border-white/10 flex flex-col justify-between p-6 sm:p-8 text-left relative">
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Campus Map Guide
                  </span>
                  <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Delivering Today
                  </span>
                </div>

                {/* Stylized Visual Map Representation */}
                <div className="relative rounded-xl overflow-hidden bg-[#16171b] border border-white/10 aspect-[16/10] p-4 flex flex-col justify-center items-center text-center">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-orange-600/30 border border-orange-500/60 flex items-center justify-center animate-bounce">
                      <MapPin className="w-6 h-6 text-orange-400 fill-orange-400/20" />
                    </div>
                    <div className="mt-2 bg-neutral-950/90 border border-orange-500/40 px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-md">
                      <div className="font-display font-bold text-xs text-white">CHIZZY HUB</div>
                      <div className="text-[10px] text-neutral-400">UPSA Hostel C</div>
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-2 text-[10px] text-neutral-400">
                    UPSA Campus · Accra
                  </div>
                </div>

                <div className="mt-6 space-y-2 text-xs text-neutral-300">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Hostel Delivery Time:</span>
                    <span className="text-white font-semibold">10 – 25 mins</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Counter Prep Time:</span>
                    <span className="text-white font-semibold">10 – 15 mins</span>
                  </div>
                </div>
              </div>

              {/* Order Now Button */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={onOrderNow}
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 transition-colors shadow-lg shadow-orange-950/40 text-center cursor-pointer"
                >
                  Order for Delivery / Pickup
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
