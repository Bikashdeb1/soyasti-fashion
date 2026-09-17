import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

interface NewsletterProps {
  onSuccessToast?: (msg: string) => void;
}

export const Newsletter: React.FC<NewsletterProps> = ({ onSuccessToast }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      if (onSuccessToast) {
        onSuccessToast('Welcome to the Vaanya Atelier. Check your inbox for your 15% code.');
      }
    }, 600);
  };

  return (
    <section aria-label="Newsletter Subscription" className="bg-[#EFE8DE] py-16 sm:py-20 border-b border-[#E4DDD2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Mail Icon Tag */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#B78343] shadow-xs mb-4">
          <Mail className="w-5 h-5" />
        </div>

        {/* Heading & Copy */}
        <h2
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#171717]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          STAY IN THE STYLE LOOP
        </h2>

        <p className="text-sm sm:text-base text-[#554E46] mt-2.5 max-w-xl mx-auto leading-relaxed">
          Receive priority invitations to private archive drops, seasonal lookbooks, and 15% off your maiden atelier order.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
          {status === 'success' ? (
            <div className="bg-white p-5 rounded-xs border border-[#C5BBAF] text-center space-y-2 animate-fadeIn">
              <div className="inline-flex items-center gap-2 text-[#2D7A46] font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>You're subscribed!</span>
              </div>
              <p className="text-xs text-[#666666]">
                Your 15% welcome voucher code <span className="font-mono font-bold text-[#171717]">VAANYA15</span> has been dispatched.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="text-[11px] uppercase tracking-wider text-[#B78343] underline font-medium pt-1 cursor-pointer"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-3.5 bg-white text-sm text-[#171717] placeholder-[#888888] rounded-xs border outline-none transition-all ${
                    status === 'error'
                      ? 'border-[#D94F4F] focus:ring-1 focus:ring-[#D94F4F]'
                      : 'border-[#D6CCC0] focus:border-[#B78343] focus:ring-1 focus:ring-[#B78343]'
                  }`}
                  aria-label="Email address for newsletter"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-7 py-3.5 bg-[#171717] hover:bg-[#B78343] text-white text-xs font-semibold tracking-[0.16em] uppercase rounded-xs transition-colors shadow-xs flex items-center justify-center cursor-pointer disabled:opacity-75"
              >
                {status === 'loading' ? 'JOINING...' : 'SUBSCRIBE'}
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#C53030] mt-2 animate-fadeIn">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <p className="text-[11px] text-[#787169] mt-3 leading-tight">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </section>
  );
};
