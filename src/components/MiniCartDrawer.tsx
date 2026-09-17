import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface MiniCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
  currency: string;
}

export const MiniCartDrawer: React.FC<MiniCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onContinueShopping,
  currency
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 3999;
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const formatPrice = (amount: number) => {
    if (currency === 'USD') {
      return `$${Math.round(amount / 83)}`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'VAANYA15') {
      setAppliedDiscount(15);
    } else {
      setPromoError('Invalid coupon. Try "VAANYA15"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slideInRight">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#EAE7E1] flex items-center justify-between bg-[#FBF9F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B78343]" />
            <h3 className="font-serif text-xl font-medium tracking-wide text-[#171717]">
              Shopping Bag
            </h3>
            <span className="text-xs font-semibold text-[#888888] ml-1">
              ({items.reduce((acc, item) => acc + item.quantity, 0)})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EFECE6] text-[#171717] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-[#F7F5F1] border-b border-[#EAE7E1]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            {isFreeShipping ? (
              <span className="font-semibold text-[#2D7A46]">
                🎉 You've unlocked Complimentary Express Delivery!
              </span>
            ) : (
              <span className="text-[#555]">
                Add <strong className="text-[#171717]">{formatPrice(amountNeededForFreeShipping)}</strong> more for Free Shipping
              </span>
            )}
            <span className="text-[10px] text-[#888]">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#E2DACF] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B78343] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F0ECE5]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F7F5F1] border border-[#EAE7E1] flex items-center justify-center text-[#B78343]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-xl text-[#171717]">Your Bag is Empty</h4>
                <p className="text-xs text-[#7A7A7A] max-w-xs">
                  Discover refined tailoring, luxurious organic fabrics, and seasonal designs.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="px-6 py-3 bg-[#171717] hover:bg-[#B78343] text-white text-xs font-semibold tracking-widest uppercase rounded-xs transition-colors cursor-pointer"
              >
                EXPLORE NEW ARRIVALS
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 flex gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-24 flex-shrink-0 bg-[#F7F5F1] rounded-xs overflow-hidden border border-[#EAE7E1]">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-[#171717] leading-tight">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#999] hover:text-[#C53030] p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#777777] mt-1">
                      <span>Size: <strong>{item.size}</strong></span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full inline-block border"
                          style={{ backgroundColor: item.color.hex }}
                        />
                        {item.color.name}
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#DCD6CC] rounded-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 px-2 text-[#555] hover:text-black hover:bg-[#F3EFEA] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-[#171717]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 px-2 text-[#555] hover:text-black hover:bg-[#F3EFEA] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-semibold text-[#171717]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#EAE7E1] bg-[#FBF9F5] space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
                <input
                  type="text"
                  placeholder="Coupon: try VAANYA15"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-white text-xs text-[#171717] border border-[#D6CCC0] rounded-xs uppercase outline-none focus:border-[#B78343]"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-[#171717] hover:bg-[#B78343] text-white text-xs font-semibold uppercase rounded-xs transition-colors"
              >
                APPLY
              </button>
            </form>

            {promoError && (
              <p className="text-[11px] text-[#C53030]">{promoError}</p>
            )}

            {appliedDiscount > 0 && (
              <div className="flex items-center justify-between text-xs text-[#2D7A46] font-medium">
                <span>Atelier Welcome Discount (15%)</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 pt-1 text-xs text-[#666]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#171717] font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className={isFreeShipping ? 'text-[#2D7A46] font-medium' : 'text-[#171717]'}>
                  {isFreeShipping ? 'COMPLIMENTARY' : formatPrice(249)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EAE7E1] text-base font-semibold text-[#171717]">
                <span>Total</span>
                <span>{formatPrice(finalTotal + (isFreeShipping ? 0 : 249))}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={onCheckout}
              className="w-full py-3.5 bg-[#B78343] hover:bg-[#A37033] text-white text-xs font-semibold tracking-[0.18em] uppercase rounded-xs transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>PROCEED TO SECURE CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#888888]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B78343]" />
              <span>100% Encrypted Transactions & Doorstep Return Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
