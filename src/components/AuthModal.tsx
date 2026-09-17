import React, { useState } from 'react';
import { X, User, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { BRAND_INFO } from '../data/fashionData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast: (msg: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccessToast }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    const displayName = name || email.split('@')[0];
    setLoggedInUser(displayName);
    onSuccessToast(`Welcome, ${displayName}! Logged into your ${BRAND_INFO.name} account.`);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-xs overflow-hidden shadow-2xl z-10 border border-[#EAE7E1] animate-scaleUp p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#F7F5F1] text-[#171717] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <BrandLogo size="sm" showSubtitle={false} />
          <h3
            className="font-serif text-2xl font-normal text-[#171717] mt-3"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {tab === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h3>
          <p className="text-xs text-[#777] mt-1">
            Access your orders, saved favorites &amp; exclusive offers.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#EAE7E1] mb-6">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 pb-3 text-xs font-semibold tracking-wider uppercase transition-colors ${
              tab === 'login'
                ? 'text-[#171717] border-b-2 border-[#B78343]'
                : 'text-[#888] hover:text-[#171717]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 pb-3 text-xs font-semibold tracking-wider uppercase transition-colors ${
              tab === 'register'
                ? 'text-[#171717] border-b-2 border-[#B78343]'
                : 'text-[#888] hover:text-[#171717]'
            }`}
          >
            Register
          </button>
        </div>

        {loggedInUser ? (
          <div className="text-center py-6 space-y-2 animate-fadeIn">
            <CheckCircle2 className="w-10 h-10 text-[#2D7A46] mx-auto" />
            <p className="text-sm font-semibold text-[#171717]">Signed In Successfully</p>
            <p className="text-xs text-[#666]">Redirecting to your atelier wardrobe...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'register' && (
              <div>
                <label className="block text-xs font-medium text-[#444] mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FBF9F5] text-xs text-[#171717] border border-[#D6CCC0] rounded-xs outline-none focus:border-[#B78343]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#444] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#FBF9F5] text-xs text-[#171717] border border-[#D6CCC0] rounded-xs outline-none focus:border-[#B78343]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-[#444]">Password</label>
                {tab === 'login' && (
                  <button type="button" className="text-[11px] text-[#B78343] hover:underline">
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#FBF9F5] text-xs text-[#171717] border border-[#D6CCC0] rounded-xs outline-none focus:border-[#B78343]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#171717] hover:bg-[#B78343] text-white text-xs font-semibold tracking-widest uppercase rounded-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{tab === 'login' ? 'SIGN IN TO ATELIER' : 'CREATE ACCOUNT'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
