import React, { useState } from 'react';
import { X, Search, PackageCheck } from 'lucide-react';
import { BRAND_INFO } from '../data/fashionData';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'shipping' | 'returns' | 'track' | null;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, type }) => {
  const [trackId, setTrackId] = useState('');
  const [trackResult, setTrackResult] = useState<string | null>(null);

  if (!isOpen || !type) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackId.trim()) return;
    setTrackResult(`Order ${trackId.toUpperCase()} is currently in transit via BlueDart Express. Estimated delivery: Thursday, by 4:00 PM.`);
  };

  const getTitle = () => {
    switch (type) {
      case 'shipping':
        return 'Shipping & Complimentary Delivery';
      case 'returns':
        return 'Returns, Exchanges & Doorstep Pickup';
      case 'privacy':
        return 'Privacy & Confidentiality Policy';
      case 'terms':
        return 'Terms of Service & Atelier Sizing';
      case 'track':
      default:
        return 'Track Your Order';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-white rounded-xs overflow-hidden shadow-2xl z-10 border border-[#EAE7E1] animate-scaleUp p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#F7F5F1] text-[#171717] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[10px] font-semibold tracking-[0.25em] text-[#B78343] uppercase">
          CUSTOMER CONCIERGE
        </span>
        <h3
          className="font-serif text-2xl font-normal text-[#171717] mt-1 mb-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {getTitle()}
        </h3>

        {type === 'track' && (
          <div className="space-y-4">
            <p className="text-xs text-[#666]">
              Enter your Order ID (e.g. VYN-104829 or tracking number from your dispatch SMS/email) to view real-time location.
            </p>
            <form onSubmit={handleTrack} className="flex gap-2">
              <input
                type="text"
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                placeholder="Enter Order ID (e.g., VYN-984321)"
                className="flex-1 px-3 py-2 text-xs border border-[#D6CCC0] rounded-xs bg-[#FBF9F5] outline-none focus:border-[#B78343]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#171717] hover:bg-[#B78343] text-white text-xs font-semibold uppercase rounded-xs transition-colors"
              >
                Track
              </button>
            </form>

            {trackResult && (
              <div className="p-4 bg-[#F5F9F6] border border-[#CDE5D4] rounded-xs text-xs text-[#25663A] flex items-start gap-3 mt-3 animate-fadeIn">
                <PackageCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{trackResult}</p>
              </div>
            )}
          </div>
        )}

        {type === 'shipping' && (
          <div className="text-xs text-[#555] space-y-3 leading-relaxed">
            <p>
              <strong>Free Domestic Shipping:</strong> We offer complimentary express delivery across all pin codes in India on orders exceeding ₹{BRAND_INFO.freeShippingThreshold.toLocaleString('en-IN')}. For orders below this amount, a flat standard rate of ₹150 is applied.
            </p>
            <p>
              <strong>Dispatch Timelines:</strong> Standard pieces are dispatched from our New Delhi atelier within 24 to 48 hours. Express transit typically takes 2–4 business days depending on your metro or regional sector.
            </p>
            <p>
              <strong>Packaging:</strong> All garments arrive in eco-friendly protective packaging to ensure your clothes reach you in pristine, ready-to-wear condition.
            </p>
          </div>
        )}

        {type === 'returns' && (
          <div className="text-xs text-[#555] space-y-3 leading-relaxed">
            <p>
              <strong>30-Day Hassle-Free Returns:</strong> We accept unworn, unwashed garments with original tags intact within 30 days of confirmed delivery.
            </p>
            <p>
              <strong>Complimentary Doorstep Pickup:</strong> Our logistics partners will collect the return directly from your residence at your preferred time slot.
            </p>
            <p>
              <strong>Instant Refund or Exchange:</strong> Once received at our atelier, refunds are processed back to your original payment method (UPI / Cards) within 48 hours.
            </p>
          </div>
        )}

        {type === 'privacy' && (
          <div className="text-xs text-[#555] space-y-3 leading-relaxed">
            <p>
              {BRAND_INFO.name} respects your privacy. We collect client details purely to process transactions, schedule bespoke tailoring, and deliver atelier updates that you have opted into.
            </p>
            <p>
              We never monetize, sell, or rent your personal information to third-party advertisers. All checkout credentials are processed through RBI-compliant, bank-grade encrypted payment gateways.
            </p>
          </div>
        )}

        {type === 'terms' && (
          <div className="text-xs text-[#555] space-y-3 leading-relaxed">
            <p>
              <strong>Atelier Sizing Guide:</strong> All measurements correspond to authentic standard tailoring charts in inches. If you fall between sizes, we recommend sizing up for casual comfort or consulting our concierge.
            </p>
            <p>
              <strong>Fabric Natural Variations:</strong> Pure organic linen and handwoven Chanderi silks may contain subtle natural slubs and thread variations, which are hallmarks of authentic artisanal weaving rather than imperfections.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
