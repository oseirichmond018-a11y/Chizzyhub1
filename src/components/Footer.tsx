import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Bike, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onScrollToMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToMenu }) => {
  return (
    <footer className="bg-[#08090b] border-t border-white/10 pt-16 pb-24 md:pb-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* Col 1: Brand, Tagline, & Motto */}
          <div className="space-y-4">
            <a 
              href="#" 
              className="font-display text-2xl font-extrabold tracking-wider text-white hover:text-orange-400 transition-colors inline-block"
            >
              {RESTAURANT_INFO.name}
            </a>
            <p className="text-xs text-orange-400 font-bold tracking-wide">
              {RESTAURANT_INFO.tagline}
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-xs">
              {RESTAURANT_INFO.motto}
            </p>
            <div className="text-[11px] text-amber-300 font-semibold bg-amber-500/10 px-2.5 py-1 rounded inline-block border border-amber-500/20">
              {RESTAURANT_INFO.badge}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={onScrollToMenu} className="hover:text-white transition-colors cursor-pointer text-left">
                  Our Official Menu
                </button>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Customer Reviews</a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">Campus Location</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Delivery & Platforms */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Delivery & Apps
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <Bike className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-bold text-amber-300">{RESTAURANT_INFO.deliveryNotice}</div>
                  <div>Direct to UPSA Hostels & Accra</div>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Counter Takeaway:</div>
                  <div>Open Daily till late night</div>
                </div>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <span className="text-[11px] font-bold text-neutral-300">Order Apps:</span>
                <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] rounded font-bold">
                  Bolt Food
                </span>
                <span className="px-2 py-0.5 bg-amber-950 border border-amber-500/40 text-amber-300 text-[10px] rounded font-bold">
                  Chowdeck
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Location & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Contact & Socials
            </h4>
            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.location}, Accra</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phoneClean}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={RESTAURANT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors"
                >
                  WhatsApp: {RESTAURANT_INFO.phoneDisplay}
                </a>
              </div>

              {/* Social Handles from Flyer */}
              <div className="pt-3 border-t border-white/5 flex items-center gap-3 text-xs">
                <a
                  href={RESTAURANT_INFO.socials.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  TikTok: <strong className="text-orange-400">{RESTAURANT_INFO.socials.tiktok}</strong>
                </a>
                <span>·</span>
                <a
                  href={RESTAURANT_INFO.socials.snapchatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Snap: <strong className="text-amber-300">{RESTAURANT_INFO.socials.snapchat}</strong>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} {RESTAURANT_INFO.name}. All rights reserved. UPSA Hostel C, Accra.
          </div>
          <div className="flex items-center gap-3 text-neutral-400">
            <span>{RESTAURANT_INFO.motto}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
