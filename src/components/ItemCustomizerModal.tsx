import React, { useState } from 'react';
import { X, Flame, Plus, Minus, Check, Sparkles } from 'lucide-react';
import { MenuItem, CartItem } from '../types/restaurant';
import { OFFICIAL_EXTRAS } from '../data/restaurantData';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (customizedItem: CartItem) => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Medium' | 'Extra Hot (Ghana Pepper)'>('Medium');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calculate pricing based on official extras
  const toppingsPrice = selectedToppings.reduce((total, toppingId) => {
    const found = OFFICIAL_EXTRAS.find((t) => t.id === toppingId);
    return total + (found ? found.price : 0);
  }, 0);

  const unitPrice = item.price + toppingsPrice;
  const totalPrice = unitPrice * quantity;

  const handleToggleTopping = (toppingId: string) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((id) => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const handleConfirm = () => {
    const toppingNames = selectedToppings
      .map((id) => OFFICIAL_EXTRAS.find((t) => t.id === id)?.name)
      .filter(Boolean) as string[];

    const finalItem: CartItem = {
      id: `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      menuItem: {
        ...item,
        price: unitPrice,
      },
      quantity,
      spiceLevel: item.spiceCustomizable ? spiceLevel : undefined,
      selectedAddons: toppingNames,
      specialInstructions: specialInstructions.trim() || undefined,
    };

    onAddToCart(finalItem);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#121317] rounded-2xl border border-white/15 shadow-2xl overflow-hidden my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Clean Typographic Header (NO PICTURES) */}
        <div className="p-6 bg-gradient-to-br from-neutral-900 via-neutral-900 to-[#191b22] border-b border-white/10 flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-orange-400 mb-1">
              Customize Your Order
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              {item.name}
            </h3>
            <div className="text-xs text-neutral-300 font-mono mt-1">
              Base Price: <strong className="text-orange-400">GH₵ {item.price}</strong> · {item.portion}
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close customizer"
            className="p-2 rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-orange-600 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Customization Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[55vh] overflow-y-auto">
          
          {/* Spice Level (if applicable) */}
          {item.spiceCustomizable && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center justify-between">
                <span>Select Spice Heat</span>
                <span className="text-[11px] text-orange-400 font-medium">{spiceLevel}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Mild', 'Medium', 'Extra Hot (Ghana Pepper)'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSpiceLevel(lvl)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      spiceLevel === lvl
                        ? 'bg-orange-600 text-white border-orange-500 shadow-md'
                        : 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/20'
                    }`}
                  >
                    <Flame className={`w-3.5 h-3.5 ${lvl.includes('Hot') ? 'text-red-400' : 'text-amber-400'}`} />
                    <span className="text-center">{lvl === 'Extra Hot (Ghana Pepper)' ? 'Extra Hot 🔥' : lvl}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Official Flyer Extras */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center justify-between">
              <span>Add Official Extras</span>
              <span className="text-[11px] text-neutral-500">Optional</span>
            </label>
            <div className="space-y-2">
              {OFFICIAL_EXTRAS.map((extra) => {
                const isSelected = selectedToppings.includes(extra.id);
                return (
                  <button
                    key={extra.id}
                    type="button"
                    onClick={() => handleToggleTopping(extra.id)}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer text-xs ${
                      isSelected
                        ? 'bg-orange-600/15 border-orange-500/80 text-white'
                        : 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          isSelected
                            ? 'bg-orange-600 border-orange-500 text-white'
                            : 'border-neutral-500 bg-neutral-900'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="font-semibold text-sm">{extra.name}</span>
                    </div>
                    <span className="font-mono text-orange-400 font-bold text-sm tabular-nums">
                      +GH₵ {extra.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kitchen / Room Instructions */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Special Instructions
            </label>
            <textarea
              rows={2}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g., Toast extra crunchy, pack sauce separately, room 204..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

        </div>

        {/* Footer with Quantity Counter & Confirm Action */}
        <div className="p-4 sm:p-5 bg-neutral-950 border-t border-white/10 flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2 bg-neutral-900 border border-white/10 rounded-xl p-1 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-mono font-bold text-sm text-white tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Confirm Button */}
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 active:scale-[0.98] transition-all shadow-lg shadow-orange-950/40 flex items-center justify-between cursor-pointer"
          >
            <span>Add to Tray</span>
            <span className="font-mono text-sm tabular-nums">
              GH₵ {totalPrice}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
