import React, { useState } from 'react';
import { Lock, Mail, Phone, User as UserIcon, MapPin, Eye, EyeOff, ArrowLeft, ArrowRight, Sparkles, CheckCircle2, ShoppingBag, LogOut, Clock, Bike, RotateCcw, MessageCircle, ChevronRight, Receipt } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { CartItem } from '../types/restaurant';
import { CompletedOrder } from './CheckoutModal';
import { SocialAuthDialog } from './SocialAuthDialog';

interface AuthPageProps {
  onBackToHome: () => void;
  onExploreMenu: () => void;
  onReorderItems?: (items: CartItem[], orderId: string) => void;
  onOpenCart?: () => void;
  initialMode?: 'login' | 'signup' | 'orders';
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onBackToHome,
  onExploreMenu,
  onReorderItems,
  onOpenCart,
  initialMode = 'login',
}) => {
  const { user, isAuthenticated, orders, login, signup, loginWithSocial, logout } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup' | 'orders'>(
    isAuthenticated ? 'orders' : initialMode === 'orders' ? 'login' : initialMode
  );
  const [profileTab, setProfileTab] = useState<'orders' | 'profile'>('orders');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [reorderedOrderId, setReorderedOrderId] = useState<string | null>(null);
  const [socialDialogProvider, setSocialDialogProvider] = useState<'google' | 'apple' | null>(null);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [hostelAddress, setHostelAddress] = useState('UPSA Hostel C');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setErrorMessage('Please enter your phone number/email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(loginIdentifier.trim(), loginPassword.trim());
      setLoading(false);
      setSuccessMessage('Logged in successfully! Welcome back.');
      setProfileTab('orders');
    } catch {
      setErrorMessage('Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !phone.trim() || !signupPassword.trim()) {
      setErrorMessage('Please fill in your name, phone, and password.');
      return;
    }

    if (signupPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await signup(
        {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || `${phone.trim()}@student.upsa.edu.gh`,
          hostelAddress: hostelAddress.trim(),
        },
        signupPassword
      );
      setLoading(false);
      setSuccessMessage('Account created successfully! Welcome to Chizzy Hub.');
      setProfileTab('orders');
    } catch {
      setErrorMessage('Failed to create account. Please try again.');
      setLoading(false);
    }
  };

  const handleSocialAuth = (provider: 'google' | 'apple') => {
    setSocialDialogProvider(provider);
  };

  const handleSocialConfirm = async (userData: { name: string; email: string; phone?: string; hostelAddress?: string }) => {
    if (!socialDialogProvider) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const socialUser = await loginWithSocial(socialDialogProvider, userData);
      setLoading(false);
      setSocialDialogProvider(null);
      setSuccessMessage(`Welcome, ${socialUser.name}! Signed in via ${socialDialogProvider === 'google' ? 'Google' : 'Apple'}.`);
      setProfileTab('orders');
    } catch {
      setLoading(false);
      setErrorMessage(`Failed to authenticate with ${socialDialogProvider}. Please try again.`);
    }
  };

  // Re-ordering logic: Clones items into active cart and provides immediate feedback
  const handleReorderClick = (order: CompletedOrder) => {
    if (onReorderItems) {
      onReorderItems(order.items, order.orderId);
      setReorderedOrderId(order.orderId);
      const totalCount = order.items.reduce((s, i) => s + i.quantity, 0);
      setSuccessMessage(`Order #${order.orderId} (${totalCount} item${totalCount > 1 ? 's' : ''}) added to your active cart!`);
      setTimeout(() => {
        setReorderedOrderId(null);
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-neutral-100 py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      {/* Top Bar Navigation */}
      <div className="w-full max-w-2xl mb-6 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>

        <div className="flex items-center gap-4 text-xs font-medium">
          <a
            href={RESTAURANT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp: {RESTAURANT_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-2xl bg-[#121317] rounded-3xl border border-white/10 shadow-2xl overflow-hidden text-left">
        
        {/* Brand Header */}
        <div className="p-6 sm:p-7 bg-gradient-to-br from-neutral-900 via-neutral-900 to-[#191b22] border-b border-white/10 text-center relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600/15 border border-orange-500/30 text-orange-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{RESTAURANT_INFO.badge}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-wider">
            {RESTAURANT_INFO.name}
          </h1>
          <p className="text-xs text-orange-400 font-semibold mt-1">
            {RESTAURANT_INFO.tagline}
          </p>

          {/* Mode Switch Tabs (If not logged in) */}
          {!isAuthenticated && (
            <div className="grid grid-cols-2 gap-1.5 bg-black/40 p-1.5 rounded-xl border border-white/10 mt-6 max-w-xs mx-auto">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Log In
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Profile Navigation Tabs (If logged in) */}
          {isAuthenticated && user && (
            <div className="flex items-center justify-center gap-2 mt-5">
              <button
                onClick={() => setProfileTab('orders')}
                className={`py-2 px-5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  profileTab === 'orders'
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-950/40'
                    : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>My Orders ({orders.length})</span>
              </button>

              <button
                onClick={() => setProfileTab('profile')}
                className={`py-2 px-5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  profileTab === 'profile'
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-950/40'
                    : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                <UserIcon className="w-4 h-4" />
                <span>Profile & Location</span>
              </button>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          
          {/* Messages */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <span className="font-bold">Error:</span> {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {reorderedOrderId && (
            <div className="mb-5 p-4 rounded-xl bg-gradient-to-r from-emerald-950/70 to-neutral-900 border border-emerald-500/50 text-white text-xs flex items-center justify-between gap-3 animate-fade-in shadow-xl">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-emerald-300">Order #{reorderedOrderId} Loaded to Tray!</div>
                  <div className="text-[11px] text-neutral-300">All past selections and customizations have been restored.</div>
                </div>
              </div>
              {onOpenCart && (
                <button
                  onClick={onOpenCart}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
                >
                  View Tray
                </button>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* AUTHENTICATED USER STATE: MY ORDERS SECTION OR PROFILE         */}
          {/* ============================================================== */}
          {isAuthenticated && user ? (
            profileTab === 'orders' ? (
              /* DEDICATED 'MY ORDERS' SECTION */
              <div className="space-y-6">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-orange-400" />
                      <span>My Orders History</span>
                    </h2>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Review your past meals and easily re-order your favorite street cravings with 1 click.
                    </p>
                  </div>

                  <button
                    onClick={onExploreMenu}
                    className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 transition-colors shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Browse Menu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Orders List */}
                {orders.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-neutral-900/50 border border-white/10 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-white/5 text-neutral-500 flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-display text-base font-bold text-white">No Past Orders Found</h3>
                      <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                        You haven't placed an order yet. Treat yourself to our signature toasted shawarma or cheesy loaded fries!
                      </p>
                    </div>
                    <button
                      onClick={onExploreMenu}
                      className="px-5 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-500 transition-colors cursor-pointer"
                    >
                      Start Your First Order
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {orders.map((ord) => (
                      <div
                        key={ord.orderId}
                        className="rounded-2xl bg-neutral-900/90 border border-white/10 hover:border-orange-500/30 transition-all p-5 sm:p-6 text-left space-y-4 shadow-lg group"
                      >
                        {/* Order Top Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-base font-black text-white bg-white/10 px-2.5 py-1 rounded-md">
                              #{ord.orderId}
                            </span>
                            <span className="text-xs text-neutral-400 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-orange-400" />
                              <span>{ord.timestamp}</span>
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                              {ord.fulfillment === 'delivery' ? 'Delivered' : 'Ready at Counter'}
                            </span>
                            <span className="font-mono text-base font-extrabold text-orange-400 tabular-nums">
                              GH₵ {ord.total}
                            </span>
                          </div>
                        </div>

                        {/* Itemized Order Lines */}
                        <div className="space-y-2 py-1">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="flex items-start justify-between gap-3 text-xs">
                              <div className="flex-1">
                                <div className="font-bold text-neutral-200">
                                  {item.quantity}x {item.menuItem.name}
                                </div>
                                <div className="text-[11px] text-neutral-400 flex flex-wrap items-center gap-1.5 mt-0.5">
                                  {item.spiceLevel && <span>Spice: {item.spiceLevel}</span>}
                                  {item.selectedAddons && item.selectedAddons.length > 0 && (
                                    <>
                                      <span>·</span>
                                      <span className="text-orange-300">Extras: {item.selectedAddons.join(', ')}</span>
                                    </>
                                  )}
                                  {item.specialInstructions && (
                                    <>
                                      <span>·</span>
                                      <span className="italic text-neutral-400">"{item.specialInstructions}"</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <span className="font-mono text-neutral-300 font-semibold tabular-nums shrink-0">
                                GH₵ {item.menuItem.price * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Metadata (Address & Payment) */}
                        <div className="p-3 rounded-xl bg-black/40 border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-400">
                          <div className="flex items-center gap-1.5 truncate">
                            <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                            <span className="truncate">{ord.address}</span>
                          </div>
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="font-semibold text-neutral-300">Paid via:</span>
                            <span className="capitalize">{ord.paymentMethod === 'momo' ? `${ord.momoProvider} (${ord.momoNumber || ord.phone})` : ord.paymentMethod}</span>
                          </div>
                        </div>

                        {/* Actions: Re-order Button & WhatsApp Sync */}
                        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                          {reorderedOrderId === ord.orderId ? (
                            <div className="w-full sm:flex-1 flex items-center gap-2">
                              <button
                                type="button"
                                disabled
                                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/70 border border-emerald-500/50 flex items-center justify-center gap-1.5"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                <span>Added to Cart!</span>
                              </button>
                              {onOpenCart && (
                                <button
                                  type="button"
                                  onClick={onOpenCart}
                                  className="py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-colors"
                                >
                                  <ShoppingBag className="w-4 h-4" />
                                  <span>View Cart</span>
                                </button>
                              )}
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleReorderClick(ord)}
                              className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-950/40 cursor-pointer"
                            >
                              <RotateCcw className="w-4 h-4" />
                              <span>Re-Order ({ord.items.reduce((s, i) => s + i.quantity, 0)} Items to Cart)</span>
                            </button>
                          )}

                          <a
                            href={`${RESTAURANT_INFO.whatsappUrl}?text=${encodeURIComponent(
                              `Hello Chizzy Hub! I'd like to re-order my previous meal (Order #${ord.orderId}):\n${ord.items
                                .map((i) => `• ${i.quantity}x ${i.menuItem.name} [${i.spiceLevel || 'Standard'}]`)
                                .join('\n')}\nDelivery to: ${ord.address}\nTotal: GH₵ ${ord.total}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto py-2.5 px-4 rounded-xl text-xs font-semibold text-emerald-300 bg-neutral-900 border border-emerald-500/30 hover:bg-emerald-950/50 transition-colors flex items-center justify-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4 text-emerald-400" />
                            <span>WhatsApp Re-Order</span>
                          </a>
                        </div>

                      </div>
                    ))}
                  </div>
                )}

              </div>
            ) : (
              /* PROFILE & SAVED ADDRESS DETAILS */
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-neutral-900 border border-white/10 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-600 text-white font-display font-bold text-lg flex items-center justify-center shrink-0 shadow-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="font-display text-base font-bold text-white">
                        {user.name}
                      </h2>
                      <p className="text-xs text-neutral-400">{user.email}</p>
                      <p className="text-xs text-neutral-400">{user.phone}</p>
                    </div>
                  </div>

                  <button
                    onClick={logout}
                    className="p-2 rounded-lg bg-white/5 hover:bg-red-950/50 hover:text-red-400 text-neutral-400 transition-colors cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-orange-400">
                    Saved Delivery Location
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-neutral-200">
                    <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">{user.hostelAddress}</div>
                      <div className="text-neutral-400 text-[11px] mt-0.5">
                        Used automatically at checkout for instant doorstep delivery.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setProfileTab('orders')}
                    className="py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 transition-colors cursor-pointer text-center"
                  >
                    View My Orders ({orders.length})
                  </button>

                  <button
                    onClick={onExploreMenu}
                    className="py-3 px-4 rounded-xl text-xs font-semibold text-neutral-200 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer text-center"
                  >
                    Explore Menu
                  </button>
                </div>
              </div>
            )
          ) : mode === 'login' ? (
            /* ============================================================== */
            /* LOGIN FORM                                                     */
            /* ============================================================== */
            <div className="space-y-4">
              {/* Social Login with Google & Apple */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => handleSocialAuth('google')}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs flex items-center justify-center gap-2.5 shadow-md active:scale-[0.99] transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialAuth('apple')}
                  className="w-full py-3 px-4 rounded-xl bg-neutral-900 border border-white/20 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2.5 active:scale-[0.99] transition-all cursor-pointer shadow-md"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-.99 1.74-.85 2.76.99.08 2-.51 2.58-1.26z"/>
                  </svg>
                  <span>Continue with Apple</span>
                </button>

                <div className="relative flex py-1.5 items-center">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink mx-3 text-[10px] text-neutral-500 uppercase tracking-wider font-bold">
                    or continue with credentials
                  </span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Phone Number or Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="0535977463 or email@domain.com"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-neutral-700 text-orange-600 focus:ring-0" />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset: Contact Chizzy Hub WhatsApp at 0535977463 to quickly reset your account!')}
                    className="text-orange-400 hover:text-orange-300 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 active:scale-[0.98] transition-all shadow-lg shadow-orange-950/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? 'Logging In...' : 'Log In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center text-xs text-neutral-400 pt-1">
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-orange-400 font-bold hover:underline cursor-pointer ml-1"
                  >
                    Sign Up here
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* ============================================================== */
            /* SIGNUP FORM                                                    */
            /* ============================================================== */
            <div className="space-y-4">
              {/* Social Signup with Google & Apple */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => handleSocialAuth('google')}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs flex items-center justify-center gap-2.5 shadow-md active:scale-[0.99] transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Sign Up with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialAuth('apple')}
                  className="w-full py-3 px-4 rounded-xl bg-neutral-900 border border-white/20 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2.5 active:scale-[0.99] transition-all cursor-pointer shadow-md"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-.99 1.74-.85 2.76.99.08 2-.51 2.58-1.26z"/>
                  </svg>
                  <span>Sign Up with Apple</span>
                </button>

                <div className="relative flex py-1.5 items-center">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink mx-3 text-[10px] text-neutral-500 uppercase tracking-wider font-bold">
                    or register with details
                  </span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kwesi Mensah"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Phone / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0535977463"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Hostel Room / Delivery Location *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. UPSA Hostel C, Room 314"
                    value={hostelAddress}
                    onChange={(e) => setHostelAddress(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Email (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="you@student.upsa.edu.gh"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Create Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="At least 6 characters"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 active:scale-[0.98] transition-all shadow-lg shadow-orange-950/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'Creating Account...' : 'Sign Up & Start Ordering'}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <div className="text-center text-xs text-neutral-400 pt-2">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-orange-400 font-bold hover:underline cursor-pointer ml-1"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

    </div>

    <SocialAuthDialog
      provider={socialDialogProvider}
      mode={mode === 'signup' ? 'signup' : 'login'}
      onClose={() => setSocialDialogProvider(null)}
      onConfirm={handleSocialConfirm}
    />
  </div>
);
};
