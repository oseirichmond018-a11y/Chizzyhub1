import React, { useState } from 'react';
import { Phone, MessageCircle, ShoppingBag, Menu as MenuIcon, X, User as UserIcon, LogOut } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToMenu: () => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onScrollToMenu,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'About Us', href: '#about' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0b0c0e]/95 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="font-display text-xl sm:text-2xl font-extrabold tracking-wider text-white hover:text-orange-400 transition-colors shrink-0"
        >
          {RESTAURANT_INFO.name}
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-orange-400 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: User Auth, Order Triggers & WhatsApp Contact */}
        <div className="flex items-center gap-3">
          
          {/* Auth State Button */}
          {isAuthenticated && user ? (
            <button
              onClick={() => onOpenAuth('login')}
              className="hidden sm:inline-flex items-center gap-2 py-1.5 px-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold hover:border-orange-500/40 transition-colors cursor-pointer"
              title="View Account & Order History"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-600 to-amber-600 text-white font-bold text-[10px] flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Cart Tray Button */}
          <button
            onClick={onOpenCart}
            aria-label="View Order Tray"
            className="relative p-2.5 rounded-lg bg-neutral-900 border border-white/10 text-neutral-200 hover:text-white hover:border-orange-500/50 hover:bg-neutral-800 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-600 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                {cartCount}
              </span>
            )}
          </button>

          {/* Order Now CTA */}
          <button
            onClick={onScrollToMenu}
            className="hidden md:inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 active:scale-[0.98] transition-all shadow-md shadow-orange-950/40 whitespace-nowrap cursor-pointer"
          >
            Order Now
          </button>

          <a
            href={RESTAURANT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-neutral-200 bg-neutral-900 border border-emerald-500/30 hover:border-emerald-500 hover:text-emerald-400 transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-emerald-500" />
            <span>WhatsApp</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="lg:hidden p-2.5 rounded-lg bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111216] border-b border-white/10 px-5 pt-3 pb-6 space-y-3">
          
          {/* Mobile Auth Bar */}
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold text-xs flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{user.name}</div>
                    <div className="text-[10px] text-neutral-400">{user.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                    className="text-xs text-orange-400 font-semibold px-2 py-1"
                  >
                    My Account
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="p-1.5 text-neutral-400 hover:text-red-400"
                    title="Log Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-neutral-400">Join Chizzy Hub:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                    className="text-xs font-semibold text-neutral-300 hover:text-white px-2 py-1"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('signup');
                    }}
                    className="text-xs font-bold text-white bg-orange-600 px-3 py-1.5 rounded-lg"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium text-neutral-300 pb-3 border-b border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-white/5 hover:text-orange-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToMenu();
              }}
              className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 transition-colors text-center cursor-pointer"
            >
              View Menu & Order
            </button>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${RESTAURANT_INFO.phoneClean}`}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium text-neutral-200 bg-neutral-900 border border-white/10 hover:border-white/20 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <span>Call {RESTAURANT_INFO.phoneDisplay}</span>
              </a>
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-950/60 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
