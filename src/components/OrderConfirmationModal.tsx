import React from 'react';
import { CheckCircle2, MessageCircle, Clock, MapPin, Printer, ArrowRight, X, Flame } from 'lucide-react';
import { CompletedOrder } from './CheckoutModal';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface OrderConfirmationModalProps {
  order: CompletedOrder | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  // Build WhatsApp message
  const itemsText = order.items
    .map(
      (item) =>
        `• ${item.quantity}x ${item.menuItem.name} [${item.spiceLevel}]${
          item.selectedAddons.length > 0 ? ` (+${item.selectedAddons.join(', ')})` : ''
        }`
    )
    .join('\n');

  const waMessage = `*CHIZZY HUB ORDER CONFIRMATION* 🌯
*Order Ref:* ${order.orderId}
*Customer:* ${order.customerName}
*Phone:* ${order.phone}
*Fulfillment:* ${order.fulfillment === 'delivery' ? 'Delivery' : 'Pickup at UPSA Hostel C'}
*Address/Room:* ${order.address}
*Scheduled Time:* ${order.timeSlot}
*Payment Method:* ${order.paymentMethod.toUpperCase()} (${order.paymentMethod === 'momo' ? order.momoProvider : ''})

*Items Ordered:*
${itemsText}

*Subtotal:* GH₵ ${order.subtotal}
*Delivery Fee:* GH₵ ${order.deliveryFee}
*TOTAL PAID:* GH₵ ${order.total}

Please confirm preparation and dispatch time!`;

  const waLink = `https://wa.me/233535977463?text=${encodeURIComponent(waMessage)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#121317] rounded-2xl border border-white/15 shadow-2xl overflow-hidden my-6 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-neutral-900 to-neutral-950 border-b border-white/10 text-center relative">
          <button
            onClick={onClose}
            aria-label="Close Confirmation"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-lg">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Payment Approved & Order Received
          </span>
          <h2 className="font-display text-2xl font-extrabold text-white mt-1">
            Order Reference: {order.orderId}
          </h2>
          <p className="text-xs text-neutral-300 mt-1">
            Thank you, <strong className="text-white">{order.customerName}</strong>! Our kitchen has received your ticket.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs">
          
          {/* Live Order Tracker */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-orange-400 mb-3">
              Live Order Status
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 shrink-0" />
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-white font-semibold">1. Order Confirmed & Paid</span>
                  <span className="text-emerald-400 text-[10px] font-mono">{order.timestamp}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-orange-400 animate-pulse shrink-0" />
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-white font-medium">2. Rotisserie Carving & Griddling</span>
                  <span className="text-orange-400 text-[10px]">In Progress</span>
                </div>
              </div>

              <div className="flex items-center gap-3 opacity-60">
                <span className="w-3 h-3 rounded-full bg-neutral-600 shrink-0" />
                <span className="text-neutral-400">3. Packaging with Secret Sauces</span>
              </div>

              <div className="flex items-center gap-3 opacity-60">
                <span className="w-3 h-3 rounded-full bg-neutral-600 shrink-0" />
                <span className="text-neutral-400">
                  {order.fulfillment === 'delivery'
                    ? `4. Dispatch to ${order.address} (Starts 3:30 PM)`
                    : '4. Ready for Pickup at UPSA Hostel C'}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery & Time Details */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-black/40 border border-white/5">
            <div>
              <div className="text-neutral-500 text-[10px] uppercase font-semibold">Fulfillment</div>
              <div className="text-white font-semibold mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span className="truncate">{order.address}</span>
              </div>
            </div>

            <div>
              <div className="text-neutral-500 text-[10px] uppercase font-semibold">Target Timing</div>
              <div className="text-white font-semibold mt-0.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="truncate">{order.timeSlot}</span>
              </div>
            </div>
          </div>

          {/* Itemized Receipt */}
          <div className="space-y-2 border-t border-b border-white/10 py-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Receipt Breakdown
            </div>

            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start gap-2">
                <div>
                  <div className="font-semibold text-white">
                    {item.quantity}x {item.menuItem.name}
                  </div>
                  <div className="text-[10px] text-neutral-400">
                    Spice: {item.spiceLevel}
                    {item.selectedAddons.length > 0 && ` · Extras: ${item.selectedAddons.join(', ')}`}
                  </div>
                </div>
                <div className="font-mono text-white tabular-nums shrink-0">
                  GH₵ {item.menuItem.price * item.quantity}
                </div>
              </div>
            ))}

            <div className="pt-2 mt-2 border-t border-white/5 space-y-1 text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-white tabular-nums">GH₵ {order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-mono text-white tabular-nums">
                  {order.deliveryFee > 0 ? `GH₵ ${order.deliveryFee}` : 'FREE (Pickup)'}
                </span>
              </div>
              <div className="flex justify-between font-bold text-white text-sm pt-1 border-t border-white/10">
                <span>Total Paid</span>
                <span className="font-mono text-orange-400 tabular-nums">
                  GH₵ {order.total}
                </span>
              </div>
            </div>
          </div>

          {/* Forward to WhatsApp CTA */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-2">
            <div className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              Notify Chef Directly via WhatsApp
            </div>
            <p className="text-[11px] text-emerald-200/80 leading-relaxed">
              Tap below to send this digital receipt to our kitchen line (+23353 597 7463) for priority tracking and rider updates!
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Forward Receipt to WhatsApp</span>
            </a>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-500 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
