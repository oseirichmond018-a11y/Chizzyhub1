import React, { useState } from 'react';
import { Plus, Check, MessageCircle, Sparkles, SlidersHorizontal, Bike } from 'lucide-react';
import { MenuItem } from '../types/restaurant';
import { MENU_ITEMS, OFFICIAL_EXTRAS, RESTAURANT_INFO } from '../data/restaurantData';

interface FeaturedMenuProps {
  onOpenCustomizer: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  onOpenCart: () => void;
}

export const FeaturedMenu: React.FC<FeaturedMenuProps> = ({
  onOpenCustomizer,
  onQuickAdd,
  onOpenCart,
}) => {
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Filter items by category
  const shawarmaItems = MENU_ITEMS.filter((i) => i.category === 'shawarma');
  const loadedFriesItems = MENU_ITEMS.filter((i) => i.category === 'loaded_fries');
  const wingsItems = MENU_ITEMS.filter((i) => i.category === 'wings');
  const pizzaItems = MENU_ITEMS.filter((i) => i.category === 'pizza');
  const saladItems = MENU_ITEMS.filter((i) => i.category === 'salad');

  const handleQuickAddClick = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    onQuickAdd(item);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1000);
  };

  return (
    <section id="menu" className="py-20 lg:py-24 bg-[#0a0b0d] relative border-t border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            OUR MENU
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-2">
            Click any item to customize or add to tray. Fast delivery from 1:00 PM to your door!
          </p>
        </div>

        {/* Authentic Text-Only Menu Board Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Column 1: SHAWARMA + SPICY CHICKEN WINGS + SALAD */}
          <div className="space-y-8">
            
            {/* 1. SHAWARMA BOX */}
            <div className="bg-[#121317] rounded-2xl border border-white/10 p-6 sm:p-7 shadow-xl text-left relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10">
                <span className="font-display text-lg sm:text-xl font-black uppercase tracking-wider text-white bg-red-600/90 text-white px-3 py-1 rounded-md shadow-sm">
                  SHAWARMA
                </span>
                <span className="text-xs text-neutral-400 font-mono">Fresh Wraps</span>
              </div>

              <div className="space-y-4">
                {shawarmaItems.map((item) => {
                  const isAdded = justAddedId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => onOpenCustomizer(item)}
                      className="group flex items-center justify-between gap-3 p-2.5 -mx-2.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5"
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-sm sm:text-base text-white group-hover:text-orange-400 transition-colors">
                            {item.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                          {item.description}
                        </p>
                      </div>

                      {/* Dotted Leader & Price */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="font-mono text-base sm:text-lg font-bold text-orange-400 tabular-nums">
                          GH₵ {item.price}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleQuickAddClick(e, item)}
                          className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-orange-600 hover:text-white'
                          }`}
                          title="Add to tray"
                        >
                          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. SPICY CHICKEN WINGS BOX */}
            <div className="bg-[#121317] rounded-2xl border border-white/10 p-6 sm:p-7 shadow-xl text-left relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10">
                <span className="font-display text-lg sm:text-xl font-black uppercase tracking-wider text-white bg-red-600/90 text-white px-3 py-1 rounded-md shadow-sm">
                  SPICY CHICKEN WINGS
                </span>
                <span className="text-xs text-neutral-400 font-mono">Fiery Glaze</span>
              </div>

              <div className="space-y-4">
                {wingsItems.map((item) => {
                  const isAdded = justAddedId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => onOpenCustomizer(item)}
                      className="group flex items-center justify-between gap-3 p-2.5 -mx-2.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5"
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <span className="font-bold text-sm sm:text-base text-white group-hover:text-orange-400 transition-colors">
                          {item.name.replace('Spicy Chicken Wings ', '')}
                        </span>
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="font-mono text-base sm:text-lg font-bold text-orange-400 tabular-nums">
                          GH₵ {item.price}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleQuickAddClick(e, item)}
                          className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-orange-600 hover:text-white'
                          }`}
                          title="Add to tray"
                        >
                          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. SALAD BOX */}
            <div className="bg-[#121317] rounded-2xl border border-white/10 p-6 sm:p-7 shadow-xl text-left relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10">
                <span className="font-display text-lg sm:text-xl font-black uppercase tracking-wider text-white bg-red-600/90 text-white px-3 py-1 rounded-md shadow-sm">
                  SALAD
                </span>
                <span className="text-xs text-neutral-400 font-mono">Fresh Greens</span>
              </div>

              <div className="space-y-4">
                {saladItems.map((item) => {
                  const isAdded = justAddedId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => onOpenCustomizer(item)}
                      className="group flex items-center justify-between gap-3 p-2.5 -mx-2.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5"
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <span className="font-bold text-sm sm:text-base text-white group-hover:text-orange-400 transition-colors">
                          {item.name}
                        </span>
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="font-mono text-base sm:text-lg font-bold text-orange-400 tabular-nums">
                          GH₵ {item.price}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleQuickAddClick(e, item)}
                          className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-orange-600 hover:text-white'
                          }`}
                          title="Add to tray"
                        >
                          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Column 2: LOADED FRIES & EXTRAS + PIZZA */}
          <div className="space-y-8">
            
            {/* 4. LOADED FRIES & EXTRAS BOX */}
            <div className="bg-[#121317] rounded-2xl border border-white/10 p-6 sm:p-7 shadow-xl text-left relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10">
                <span className="font-display text-lg sm:text-xl font-black uppercase tracking-wider text-white bg-red-600/90 text-white px-3 py-1 rounded-md shadow-sm">
                  LOADED FRIES & EXTRAS
                </span>
                <span className="text-xs text-neutral-400 font-mono">Cheese & Meat</span>
              </div>

              {/* Fries items */}
              <div className="space-y-4">
                {loadedFriesItems.map((item) => {
                  const isAdded = justAddedId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => onOpenCustomizer(item)}
                      className="group flex items-center justify-between gap-3 p-2.5 -mx-2.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5"
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <span className="font-bold text-sm sm:text-base text-white group-hover:text-orange-400 transition-colors">
                          {item.name}
                        </span>
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="font-mono text-base sm:text-lg font-bold text-orange-400 tabular-nums">
                          GH₵ {item.price}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleQuickAddClick(e, item)}
                          className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-orange-600 hover:text-white'
                          }`}
                          title="Add to tray"
                        >
                          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. PIZZA BOX */}
            <div className="bg-[#121317] rounded-2xl border border-white/10 p-6 sm:p-7 shadow-xl text-left relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10">
                <span className="font-display text-lg sm:text-xl font-black uppercase tracking-wider text-white bg-red-600/90 text-white px-3 py-1 rounded-md shadow-sm">
                  PIZZA
                </span>
                <span className="text-xs text-neutral-400 font-mono">Stone-Baked</span>
              </div>

              <div className="space-y-4">
                {pizzaItems.map((item) => {
                  const isAdded = justAddedId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => onOpenCustomizer(item)}
                      className="group flex items-center justify-between gap-3 p-2.5 -mx-2.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5"
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <span className="font-bold text-sm sm:text-base text-white group-hover:text-orange-400 transition-colors">
                          {item.name}
                        </span>
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="font-mono text-base sm:text-lg font-bold text-orange-400 tabular-nums">
                          GH₵ {item.price}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleQuickAddClick(e, item)}
                          className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-orange-600 hover:text-white'
                          }`}
                          title="Add to tray"
                        >
                          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Delivery Footer Callout from Flyer */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-400 font-bold text-sm sm:text-base">
              <Bike className="w-4 h-4" />
              <span>{RESTAURANT_INFO.deliveryNotice}</span>
            </div>
            <p className="text-xs text-neutral-400">
              Order directly via calls & WhatsApp at <strong className="text-white">{RESTAURANT_INFO.phoneDisplay}</strong> or use our online checkout.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCart}
              className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 transition-colors shadow-md cursor-pointer whitespace-nowrap"
            >
              Open Order Tray
            </button>
            <a
              href={RESTAURANT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-emerald-300 bg-neutral-800 border border-emerald-500/30 hover:bg-emerald-950/50 transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
