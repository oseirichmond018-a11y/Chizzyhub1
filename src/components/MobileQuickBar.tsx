import React from 'react';
import { Phone, MessageCircle, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface MobileQuickBarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
}) => {
  return (
    <aside 
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0d10]/95 backdrop-blur-md border-t border-white/10 px-3 py-2"
    >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto h-11">
        {/* Call button */}
        <a
          href={`tel:${RESTAURANT_INFO.phoneClean}`}
          className="flex-1 h-full rounded-xl bg-white/5 border border-white/10 text-neutral-200 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-orange-400" />
          <span>Call</span>
        </a>

        {/* WhatsApp Order */}
        <a
          href={RESTAURANT_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-full rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp</span>
        </a>

        {/* View Tray / Checkout Trigger */}
        <button
          onClick={onOpenCart}
          className="flex-[1.4] h-full rounded-xl bg-orange-600 text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-orange-950/40 transition-colors cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Tray {cartCount > 0 ? `(${cartCount})` : ''}</span>
          {cartTotal > 0 && (
            <span className="font-mono text-[10px] ml-0.5 bg-black/30 px-1 py-0.5 rounded">
              GH₵{cartTotal}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};
