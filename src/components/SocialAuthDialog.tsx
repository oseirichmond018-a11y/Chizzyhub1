import React, { useState } from 'react';
import { X, Check, Shield, Smartphone, ArrowRight, User as UserIcon } from 'lucide-react';
import { User } from '../types/auth';

interface SocialAuthDialogProps {
  provider: 'google' | 'apple' | null;
  mode: 'login' | 'signup';
  onClose: () => void;
  onConfirm: (userData: { name: string; email: string; phone?: string; hostelAddress?: string }) => void;
}

export const SocialAuthDialog: React.FC<SocialAuthDialogProps> = ({
  provider,
  mode,
  onClose,
  onConfirm,
}) => {
  if (!provider) return null;

  // Google State
  const [selectedGoogleAccount, setSelectedGoogleAccount] = useState<'primary' | 'student' | 'custom'>('primary');
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  // Apple State
  const [appleEmailOption, setAppleEmailOption] = useState<'share' | 'hide'>('share');
  const [appleName, setAppleName] = useState('Kwesi Mensah');

  const handleGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGoogleAccount === 'primary') {
      onConfirm({
        name: 'Muffin Jnr',
        email: 'muffinjnr7@gmail.com',
        phone: '0535977463',
        hostelAddress: 'UPSA Hostel C',
      });
    } else if (selectedGoogleAccount === 'student') {
      onConfirm({
        name: 'Kwesi Appiah',
        email: 'kwesi.appiah@student.upsa.edu.gh',
        phone: '0535977463',
        hostelAddress: 'UPSA Hostel C, Room 314',
      });
    } else {
      onConfirm({
        name: customGoogleName.trim() || 'Google User',
        email: customGoogleEmail.trim() || 'user@gmail.com',
        phone: '0535977463',
        hostelAddress: 'UPSA Hostel C',
      });
    }
  };

  const handleAppleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      name: appleName.trim() || 'Apple User',
      email: appleEmailOption === 'share' ? 'muffinjnr7@gmail.com' : 'muffinjnr.k492@privaterelay.appleid.com',
      phone: '0535977463',
      hostelAddress: 'UPSA Hostel C',
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full bg-[#121317] rounded-3xl border border-white/15 shadow-2xl overflow-hidden my-6 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {provider === 'google' ? (
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1.5 shadow-sm shrink-0">
                <svg className="w-full h-full" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center p-1.5 shadow-sm shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-.99 1.74-.85 2.76.99.08 2-.51 2.58-1.26z"/>
                </svg>
              </div>
            )}
            <div>
              <h3 className="font-display text-base font-bold text-white">
                {provider === 'google' ? 'Sign in with Google' : 'Sign in with Apple'}
              </h3>
              <p className="text-[11px] text-neutral-400">
                {mode === 'signup' ? 'Create your Chizzy Hub account' : 'Continue to Chizzy Hub Eats'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Google Flow */}
        {provider === 'google' && (
          <form onSubmit={handleGoogleSubmit} className="p-6 space-y-4">
            <div className="text-xs text-neutral-300 font-semibold">
              Choose an account to continue:
            </div>

            <div className="space-y-2.5">
              {/* Primary Account */}
              <button
                type="button"
                onClick={() => setSelectedGoogleAccount('primary')}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  selectedGoogleAccount === 'primary'
                    ? 'bg-orange-600/15 border-orange-500 text-white'
                    : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 text-white font-bold text-sm flex items-center justify-center">
                    M
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Muffin Jnr</div>
                    <div className="text-[11px] text-neutral-400">muffinjnr7@gmail.com</div>
                  </div>
                </div>
                {selectedGoogleAccount === 'primary' && (
                  <Check className="w-4 h-4 text-orange-400 shrink-0" />
                )}
              </button>

              {/* Student Account */}
              <button
                type="button"
                onClick={() => setSelectedGoogleAccount('student')}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  selectedGoogleAccount === 'student'
                    ? 'bg-orange-600/15 border-orange-500 text-white'
                    : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/10 text-white font-bold text-sm flex items-center justify-center">
                    K
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Kwesi Appiah</div>
                    <div className="text-[11px] text-neutral-400">kwesi.appiah@student.upsa.edu.gh</div>
                  </div>
                </div>
                {selectedGoogleAccount === 'student' && (
                  <Check className="w-4 h-4 text-orange-400 shrink-0" />
                )}
              </button>

              {/* Use Another Account */}
              <button
                type="button"
                onClick={() => setSelectedGoogleAccount('custom')}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  selectedGoogleAccount === 'custom'
                    ? 'bg-orange-600/15 border-orange-500 text-white'
                    : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 text-neutral-400 flex items-center justify-center">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-semibold">Use another Google account</div>
                </div>
                {selectedGoogleAccount === 'custom' && (
                  <Check className="w-4 h-4 text-orange-400 shrink-0" />
                )}
              </button>
            </div>

            {selectedGoogleAccount === 'custom' && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kofi Mensah"
                    value={customGoogleName}
                    onChange={(e) => setCustomGoogleName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Google Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="yourname@gmail.com"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            )}

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 active:scale-[0.98] transition-all shadow-lg shadow-orange-950/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue with Google</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 pt-1 text-center">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>Safe & verified Google OAuth authentication</span>
            </div>
          </form>
        )}

        {/* Apple Flow */}
        {provider === 'apple' && (
          <form onSubmit={handleAppleSubmit} className="p-6 space-y-4">
            <div className="text-center py-2">
              <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center mx-auto mb-3 shadow-lg">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-.99 1.74-.85 2.76.99.08 2-.51 2.58-1.26z"/>
                </svg>
              </div>
              <h4 className="text-white font-bold text-sm">Apple ID Authentication</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Sign in to Chizzy Hub using your Apple ID.
              </p>
            </div>

            <div className="space-y-3 bg-neutral-900/60 p-4 rounded-2xl border border-white/5">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={appleName}
                  onChange={(e) => setAppleName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1.5">Email Forwarding</label>
                <div className="space-y-2">
                  <label
                    onClick={() => setAppleEmailOption('share')}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-all ${
                      appleEmailOption === 'share'
                        ? 'bg-white/10 border-white/30 text-white'
                        : 'bg-white/5 border-white/5 text-neutral-400'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white">Share My Email</div>
                      <div className="text-[10px] text-neutral-400">muffinjnr7@gmail.com</div>
                    </div>
                    {appleEmailOption === 'share' && <Check className="w-4 h-4 text-emerald-400" />}
                  </label>

                  <label
                    onClick={() => setAppleEmailOption('hide')}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-all ${
                      appleEmailOption === 'hide'
                        ? 'bg-white/10 border-white/30 text-white'
                        : 'bg-white/5 border-white/5 text-neutral-400'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white">Hide My Email</div>
                      <div className="text-[10px] text-neutral-400">muffinjnr.k492@privaterelay.appleid.com</div>
                    </div>
                    {appleEmailOption === 'hide' && <Check className="w-4 h-4 text-emerald-400" />}
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>Sign In with Face ID / Touch ID</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 pt-1 text-center">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>Apple Private Relay & Encrypted Authentication</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
