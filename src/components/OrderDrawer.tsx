import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Flame, Sparkles, MapPin, Bike, Check, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types/restaurant';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#0e1014] h-full flex flex-col justify-between border-l border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 bg-gradient-to-r from-[#13151b] via-[#161821] to-[#13151b] relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-orange-900/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg sm:text-xl font-extrabold text-white tracking-wide">
                    YOUR ORDER TRAY
                  </h2>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} ready for fulfillment
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-xs text-neutral-400 hover:text-red-400 px-2.5 py-1.5 rounded-lg hover:bg-red-950/30 transition-colors cursor-pointer"
                  title="Remove all items"
                >
                  Clear all
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Order Tray"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Fulfillment Callout Banner */}
          <div className="mt-4 p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-[11px] text-neutral-300">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>Hostel C Pick Up: Free</span>
            </div>
            <span className="text-neutral-600">·</span>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Bike className="w-3.5 h-3.5 text-emerald-400" />
              <span>Delivery from 1:00 PM</span>
            </div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3.5">
          {cart.length === 0 ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-500 shadow-xl">
                <ShoppingBag className="w-10 h-10 text-neutral-600" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-lg font-bold text-white">Your Tray is Empty</h3>
                <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
                  Craving freshly toasted shawarma wraps or loaded cheesy fries? Pick your favorites from the menu to begin.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-950/40 transition-all cursor-pointer"
              >
                Browse Our Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="group relative p-4 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-orange-500/40 transition-all text-left shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    {/* Item Category Tag */}
                    <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 mb-1">
                      {item.menuItem.category.replace('_', ' ')}
                    </div>

                    {/* Dish Name */}
                    <h4 className="font-display text-sm font-bold text-white leading-tight">
                      {item.menuItem.name}
                    </h4>

                    {/* Customization Details Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {item.spiceLevel && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-950/60 border border-red-500/30 text-[10px] font-semibold text-red-300">
                          <Flame className="w-3 h-3 text-red-400" />
                          <span>{item.spiceLevel}</span>
                        </span>
                      )}

                      {item.selectedAddons && item.selectedAddons.length > 0 && (
                        item.selectedAddons.map((addon, aIdx) => (
                          <span
                            key={aIdx}
                            className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-950/50 border border-amber-500/30 text-[10px] font-semibold text-amber-200"
                          >
                            + {addon}
                          </span>
                        ))
                      )}
                    </div>

                    {/* Special Instructions Note */}
                    {item.specialInstructions && (
                      <div className="text-[11px] text-neutral-400 italic mt-1.5 pl-2 border-l border-orange-500/40">
                        "{item.specialInstructions}"
                      </div>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Remove ${item.menuItem.name}`}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Row: Quantity Stepper & Price Calculation */}
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-mono text-xs font-bold text-white tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-neutral-400 uppercase font-semibold">Total</div>
                    <div className="font-mono text-base font-extrabold text-orange-400 tabular-nums">
                      GH₵ {item.menuItem.price * item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-5 sm:p-6 bg-gradient-to-t from-black via-neutral-950 to-[#0e1014] border-t border-white/10 space-y-4">
            
            {/* Bill Summary Breakdown */}
            <div className="space-y-2 p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs text-neutral-300">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Subtotal ({totalItemCount} items):</span>
                <span className="font-mono font-bold text-white tabular-nums">GH₵ {subtotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">UPSA Hostel C Pick Up:</span>
                <span className="font-semibold text-emerald-400">FREE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Delivery (Madina / Legon / Accra):</span>
                <span className="text-neutral-300">Calculated at Checkout</span>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-sm">
                <span className="font-bold text-white">Estimated Subtotal:</span>
                <span className="font-mono text-lg font-black text-orange-400 tabular-nums">
                  GH₵ {subtotal}
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-4 px-6 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 active:scale-[0.99] transition-all shadow-xl shadow-orange-950/50 flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Proceed to Checkout</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-sm font-black bg-black/30 px-3 py-1 rounded-xl">
                <span>GH₵ {subtotal}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Security Guarantee Note */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Prepared Fresh To Order · Pay on Delivery or Ghana MoMo</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
