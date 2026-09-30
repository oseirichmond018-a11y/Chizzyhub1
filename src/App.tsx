import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { FeaturedMenu } from './components/FeaturedMenu';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { LocationHours } from './components/LocationHours';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { OrderDrawer } from './components/OrderDrawer';
import { CheckoutModal, CompletedOrder } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { AuthPage } from './components/AuthPage';
import { MenuItem, CartItem } from './types/restaurant';
import { CheckCircle2 } from 'lucide-react';

function MainApp() {
  const { addOrderToHistory } = useAuth();
  const [currentView, setCurrentView] = useState<'main' | 'auth'>('main');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setCurrentView('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  // Add customized item from modal
  const handleAddCustomizedItem = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    showToast(`Added ${item.menuItem.name} to order tray!`);
  };

  // Quick add standard item
  const handleQuickAdd = (menuItem: MenuItem) => {
    const newItem: CartItem = {
      id: `${menuItem.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      menuItem,
      quantity: 1,
      spiceLevel: menuItem.spiceCustomizable ? 'Medium' : undefined,
      selectedAddons: [],
    };
    setCart((prev) => [...prev, newItem]);
    showToast(`Added ${menuItem.name} to order tray!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderSuccess = (order: CompletedOrder) => {
    addOrderToHistory(order);
    setCompletedOrder(order);
    setIsCheckoutOpen(false);
    setCart([]);
  };

  const scrollToMenu = () => {
    if (currentView === 'auth') {
      setCurrentView('main');
      setTimeout(() => {
        const el = document.getElementById('menu');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('menu');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  const handleReorderItems = (items: CartItem[], orderId: string) => {
    const cloned = items.map((it) => ({
      ...it,
      id: `${it.menuItem.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    }));
    setCart((prev) => [...prev, ...cloned]);
    const totalCount = items.reduce((s, it) => s + it.quantity, 0);
    showToast(`Added ${totalCount} items from Order #${orderId} to your cart!`);
  };

  // If in Auth View (Dedicated Sign Up / Login Page)
  if (currentView === 'auth') {
    return (
      <AuthPage
        onBackToHome={handleBackToMain}
        onExploreMenu={scrollToMenu}
        onReorderItems={handleReorderItems}
        onOpenCart={() => {
          handleBackToMain();
          setIsCartOpen(true);
        }}
        initialMode={authMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-neutral-100 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-24 right-4 z-50 bg-neutral-900 border border-orange-500/40 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 backdrop-blur-md animate-fade-in"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation with Auth controls */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToMenu={scrollToMenu}
        onOpenAuth={handleOpenAuth}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={scrollToMenu}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* About Section */}
        <About />

        {/* Dynamic & Text-Only Official Menu Section (No Pictures, Just Names and Exact Prices) */}
        <FeaturedMenu
          onOpenCustomizer={(item) => setCustomizerItem(item)}
          onQuickAdd={handleQuickAdd}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Location & Delivery Hours */}
        <LocationHours
          onOrderNow={scrollToMenu}
        />
      </main>

      {/* Footer */}
      <Footer onScrollToMenu={scrollToMenu} />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileQuickBar
        cartCount={totalCartCount}
        cartTotal={totalCartAmount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Slide-over Order Tray Drawer */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onClearCart={handleClearCart}
      />

      {/* Dish Customizer Modal */}
      <ItemCustomizerModal
        item={customizerItem}
        onClose={() => setCustomizerItem(null)}
        onAddToCart={handleAddCustomizedItem}
      />

      {/* Secure Checkout Modal (Pickup/Delivery, MoMo/Card/Cash) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Confirmation Receipt Modal with Live Status & WhatsApp forward */}
      <OrderConfirmationModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
