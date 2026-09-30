import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CreditCard, Smartphone, Banknote, MapPin, Clock, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { CartItem } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useAuth } from '../context/AuthContext';

export type DeliveryZone = 
  | 'UPSA HOSTEL C PICK UP'
  | 'LEGON'
  | 'MADINA'
  | 'AROUND ACCRA'
  | 'AROUND MADINA';

export interface DeliveryZoneOption {
  id: DeliveryZone;
  name: string;
  description: string;
  fee: number;
  isPickup: boolean;
}

export const DELIVERY_ZONES: DeliveryZoneOption[] = [
  {
    id: 'UPSA HOSTEL C PICK UP',
    name: 'UPSA HOSTEL C PICK UP',
    description: 'Direct pickup at Hostel C · Payment on Delivery',
    fee: 0,
    isPickup: true,
  },
  {
    id: 'MADINA',
    name: 'MADINA',
    description: 'Madina central, Estate, Market & nearby residences',
    fee: 10,
    isPickup: false,
  },
  {
    id: 'AROUND MADINA',
    name: 'AROUND MADINA',
    description: 'Zongo Junction, Ritz, Firestone, Social Welfare',
    fee: 10,
    isPickup: false,
  },
  {
    id: 'LEGON',
    name: 'LEGON',
    description: 'UG Campus, East Legon, West Legon, Okponglo',
    fee: 15,
    isPickup: false,
  },
  {
    id: 'AROUND ACCRA',
    name: 'AROUND ACCRA',
    description: 'Greater Accra corridor deliveries to your door',
    fee: 20,
    isPickup: false,
  },
];

export interface CompletedOrder {
  orderId: string;
  items: CartItem[];
  fulfillment: 'delivery' | 'pickup';
  deliveryZone: DeliveryZone;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  timeSlot: string;
  notes: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'momo' | 'card' | 'cash';
  momoProvider?: string;
  momoNumber?: string;
  timestamp: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderSuccess: (order: CompletedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const { user } = useAuth();
  
  // Delivery option state
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>('UPSA HOSTEL C PICK UP');
  
  const [customerName, setCustomerName] = useState(user ? user.name : '');
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [addressDetails, setAddressDetails] = useState(
    user && user.hostelAddress ? user.hostelAddress : 'UPSA Hostel C'
  );
  const [timeSlot, setTimeSlot] = useState('Earliest Delivery (Starts 1:00 PM)');
  const [notes, setNotes] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card' | 'cash'>('cash');
  const [momoProvider, setMomoProvider] = useState<'MTN MoMo' | 'Telecel Cash' | 'AirtelTigo Money'>('MTN MoMo');
  const [momoNumber, setMomoNumber] = useState(user ? user.phone : '');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  // Current zone details
  const activeZoneConfig = DELIVERY_ZONES.find((z) => z.id === selectedZone) || DELIVERY_ZONES[0];
  const isPickup = activeZoneConfig.isPickup;
  const deliveryFee = activeZoneConfig.fee;

  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

  // RULE: ALL UPSA HOSTEL C PICK UP SHOULD BE PAYMENT ON DELIVERY
  useEffect(() => {
    if (isPickup) {
      setPaymentMethod('cash');
    }
  }, [isPickup]);

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !phone.trim()) {
      alert('Please provide your name and phone number.');
      return;
    }

    if (!isPickup && !addressDetails.trim()) {
      alert('Please enter your specific delivery address or room number.');
      return;
    }

    if (!isPickup && paymentMethod === 'momo' && !momoNumber.trim()) {
      alert('Please enter your Mobile Money number.');
      return;
    }

    setIsProcessing(true);

    if (isPickup || paymentMethod === 'cash') {
      setProcessingStatus('Registering Pay on Delivery with Chizzy Hub kitchen...');
    } else if (paymentMethod === 'momo') {
      setProcessingStatus(`Pushing ${momoProvider} USSD authorization prompt to ${momoNumber}...`);
    } else {
      setProcessingStatus('Connecting to secure 256-bit payment gateway...');
    }

    // Simulate verification
    setTimeout(() => {
      setProcessingStatus('Confirming ticket with UPSA Hostel C counter...');
    }, 850);

    setTimeout(() => {
      const completedOrder: CompletedOrder = {
        orderId: `CHZ-${Math.floor(1000 + Math.random() * 9000)}`,
        items: [...cart],
        fulfillment: isPickup ? 'pickup' : 'delivery',
        deliveryZone: selectedZone,
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        address: isPickup ? 'UPSA Hostel C Counter Pick Up' : `${selectedZone}: ${addressDetails.trim()}`,
        timeSlot,
        notes: notes.trim(),
        subtotal,
        deliveryFee,
        total,
        paymentMethod: isPickup ? 'cash' : paymentMethod,
        momoProvider: !isPickup && paymentMethod === 'momo' ? momoProvider : undefined,
        momoNumber: !isPickup && paymentMethod === 'momo' ? momoNumber : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setIsProcessing(false);
      onOrderSuccess(completedOrder);
    }, 1700);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-[#121317] rounded-2xl border border-white/15 shadow-2xl overflow-hidden my-6 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-neutral-900/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">
                Chizzy Hub Checkout
              </span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified & Fast
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
              Select Delivery & Complete Order
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Checkout"
            className="p-2 rounded-lg bg-white/5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmitPayment} className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* 1. EXACT DELIVERY OPTIONS SELECTOR */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                1. Select Delivery / Pickup Option *
              </label>
              <span className="text-[11px] text-orange-400 font-mono font-semibold">
                Delivery from 1:00 PM
              </span>
            </div>

            <div className="space-y-2.5">
              {DELIVERY_ZONES.map((zone) => {
                const isSelected = selectedZone === zone.id;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setSelectedZone(zone.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-orange-600/15 border-orange-500 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border mt-0.5 shrink-0 ${
                          isSelected
                            ? 'border-orange-500 bg-orange-600 text-white'
                            : 'border-neutral-500 bg-neutral-900'
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </div>

                      <div>
                        <div className="font-display font-extrabold text-xs sm:text-sm tracking-wide text-white">
                          {zone.name}
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">
                          {zone.description}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs sm:text-sm font-bold tabular-nums">
                        {zone.fee === 0 ? (
                          <span className="text-emerald-400 font-bold">FREE PICKUP</span>
                        ) : (
                          <span className="text-orange-400">+GH₵ {zone.fee}</span>
                        )}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. CUSTOMER DETAILS */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2.5">
              2. Contact & Address Details
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kwesi Mensah"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0535977463"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] text-neutral-400 mb-1">
                  {isPickup ? 'Pickup Location' : `Specific Delivery Location in ${selectedZone} *`}
                </label>
                <input
                  type="text"
                  required={!isPickup}
                  readOnly={isPickup}
                  placeholder={isPickup ? 'UPSA Hostel C' : 'e.g., Room 314, Hostel C / Near East Legon Shell / Zongo Junction'}
                  value={isPickup ? 'UPSA Hostel C (Counter Pick Up)' : addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${
                    isPickup
                      ? 'bg-neutral-900 border-white/5 text-neutral-300'
                      : 'bg-white/5 border-white/10 text-white focus:border-orange-500'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Timing / Batch</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="Earliest Delivery (Starts 1:00 PM)">Earliest batch (Starts 1:00 PM)</option>
                  <option value="1:00 PM - 2:00 PM">1:00 PM – 2:00 PM</option>
                  <option value="2:30 PM - 3:30 PM">2:30 PM – 3:30 PM</option>
                  <option value="4:00 PM - 5:30 PM">4:00 PM – 5:30 PM</option>
                  <option value="6:00 PM - 7:30 PM (Dinner Rush)">6:00 PM – 7:30 PM (Dinner Rush)</option>
                  <option value="8:00 PM - 9:30 PM">8:00 PM – 9:30 PM</option>
                  <option value="10:00 PM - 11:30 PM (Late Night)">10:00 PM – 11:30 PM (Late Night)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Kitchen / Chef Note (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Extra napkins, no spicy pepper..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* 3. PAYMENT METHOD (ENFORCING RULE FOR UPSA HOSTEL C PICK UP) */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                3. Payment Method *
              </label>
              {isPickup && (
                <span className="text-[11px] text-amber-300 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                  Payment on Delivery Enforced
                </span>
              )}
            </div>

            {isPickup ? (
              /* Enforced Payment on Delivery notice for UPSA HOSTEL C PICK UP */
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-neutral-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <Banknote className="w-4 h-4 text-amber-400" />
                  <span>PAYMENT ON DELIVERY / PICKUP AT UPSA HOSTEL C</span>
                </div>
                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  As required for all <strong className="text-white">UPSA HOSTEL C PICK UP</strong> orders, payment is made on delivery/collection directly at the counter. You can pay with Cash or MoMo on arrival.
                </p>
                <div className="text-[11px] font-mono text-orange-400 font-bold">
                  Amount Payable on Pickup: GH₵ {total}
                </div>
              </div>
            ) : (
              /* Standard Payment Options for delivery zones */
              <div>
                <div className="grid grid-cols-3 gap-2.5 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'cash'
                        ? 'bg-orange-600/15 border-orange-500 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold text-center">Payment on Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'momo'
                        ? 'bg-orange-600/15 border-orange-500 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold text-center">Mobile Money</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-orange-600/15 border-orange-500 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-sky-400" />
                    <span className="text-xs font-bold text-center">Bank Card</span>
                  </button>
                </div>

                {/* Mobile Money Form */}
                {paymentMethod === 'momo' && (
                  <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 space-y-3">
                    <div className="text-xs text-neutral-300 font-medium">Select Network:</div>
                    <div className="grid grid-cols-3 gap-2">
                      {(['MTN MoMo', 'Telecel Cash', 'AirtelTigo Money'] as const).map((net) => (
                        <button
                          key={net}
                          type="button"
                          onClick={() => setMomoProvider(net)}
                          className={`py-2 px-2 rounded-lg text-[11px] font-semibold border text-center transition-colors cursor-pointer ${
                            momoProvider === net
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                              : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {net}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">
                        {momoProvider} Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0535977463"
                        value={momoNumber}
                        onChange={(e) => setMomoNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                )}

                {/* Card Form */}
                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 space-y-3">
                    <div className="text-xs text-neutral-300 font-medium">Visa & Mastercard:</div>
                    <input
                      type="text"
                      required
                      placeholder="Card Number: 4123 4567 8901 2345"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>
                )}

                {/* Cash on Delivery Note */}
                {paymentMethod === 'cash' && (
                  <div className="p-3.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-neutral-300">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Payment on Delivery</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      Pay GH₵ {total} to the dispatch rider upon arrival at your doorstep.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 4. TOTAL BREAKDOWN */}
          <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-2 text-xs">
            <div className="flex items-center justify-between text-neutral-400">
              <span>Items Total ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span className="font-mono text-white tabular-nums">GH₵ {subtotal}</span>
            </div>
            <div className="flex items-center justify-between text-neutral-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>{selectedZone}</span>
              </span>
              <span className="font-mono text-white tabular-nums">
                {deliveryFee === 0 ? <span className="text-emerald-400 font-bold">FREE PICKUP</span> : `GH₵ ${deliveryFee}`}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
              <span>Total Payable</span>
              <span className="font-mono text-orange-400 text-lg tabular-nums">
                GH₵ {total}
              </span>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 active:scale-[0.98] disabled:opacity-50 transition-all shadow-xl shadow-orange-950/40 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{processingStatus}</span>
              </>
            ) : (
              <>
                <span>
                  {isPickup
                    ? `Confirm Pickup Order (Pay GH₵ ${total} on Delivery)`
                    : `Confirm & Order (GH₵ ${total})`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
