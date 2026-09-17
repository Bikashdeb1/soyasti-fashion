import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Smartphone, Banknote, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { BRAND_INFO } from '../data/fashionData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: () => void;
  currency: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
  currency
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');
  const [name, setName] = useState('Ananya Sharma');
  const [phone, setPhone] = useState('+91 98201 44520');
  const [address, setAddress] = useState('Flat 402, Signature Palms, Salt Lake');
  const [city, setCity] = useState('Kolkata');
  const [pincode, setPincode] = useState('700091');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= BRAND_INFO.freeShippingThreshold;
  const shippingFee = isFreeShipping ? 0 : 99;
  const total = subtotal + shippingFee;

  const formatPrice = (amount: number) => {
    if (currency === 'USD') return `$${Math.round(amount / 83)}`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `VYN-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);
    setStep('confirmed');
    onOrderComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={step === 'confirmed' ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-xs overflow-hidden shadow-2xl z-10 border border-[#EAE7E1] animate-scaleUp max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EAE7E1] flex items-center justify-between bg-[#FBF9F5]">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#B78343] uppercase">
              SECURE CHECKOUT
            </span>
            <h3 className="font-serif text-xl font-medium text-[#171717]">
              {step === 'confirmed' ? 'Order Confirmation' : 'Complete Your Order'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EFECE6] text-[#171717] transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {step === 'shipping' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep('payment');
              }}
              className="space-y-4"
            >
              <h4 className="text-xs font-semibold tracking-wider text-[#171717] uppercase border-b border-[#EAE7E1] pb-2">
                1. Delivery Address
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#555] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#D6CCC0] rounded-xs text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#555] mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#D6CCC0] rounded-xs text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#555] mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#D6CCC0] rounded-xs text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#555] mb-1">City / Region</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#D6CCC0] rounded-xs text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#555] mb-1">Postal Code (PIN)</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#D6CCC0] rounded-xs text-xs"
                  />
                </div>
              </div>

              {/* Order Summary box */}
              <div className="bg-[#F7F5F1] p-4 rounded-xs border border-[#EAE7E1] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Items ({items.length})</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={isFreeShipping ? 'text-[#2D7A46]' : ''}>
                    {isFreeShipping ? 'COMPLIMENTARY' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-sm pt-2 border-t border-[#EAE7E1] text-[#171717]">
                  <span>Total Amount</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#171717] hover:bg-[#B78343] text-white text-xs font-semibold tracking-widest uppercase rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>CONTINUE TO PAYMENT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              <div className="flex items-center justify-between border-b border-[#EAE7E1] pb-2">
                <h4 className="text-xs font-semibold tracking-wider text-[#171717] uppercase">
                  2. Select Payment Method
                </h4>
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs text-[#B78343] hover:underline"
                >
                  Edit Address
                </button>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex items-center justify-between p-3.5 rounded-xs border cursor-pointer transition-colors ${
                    paymentMethod === 'upi' ? 'border-[#B78343] bg-[#FBF9F5]' : 'border-[#EAE7E1]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-[#B78343]" />
                    <div>
                      <p className="text-xs font-semibold text-[#171717]">Instant UPI (Google Pay, PhonePe, Paytm)</p>
                      <p className="text-[11px] text-[#777]">Zero payment processing fee</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="accent-[#B78343]"
                  />
                </label>

                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-between p-3.5 rounded-xs border cursor-pointer transition-colors ${
                    paymentMethod === 'card' ? 'border-[#B78343] bg-[#FBF9F5]' : 'border-[#EAE7E1]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#B78343]" />
                    <div>
                      <p className="text-xs font-semibold text-[#171717]">Credit / Debit Card</p>
                      <p className="text-[11px] text-[#777]">Visa, Mastercard, RuPay, Amex</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-[#B78343]"
                  />
                </label>

                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center justify-between p-3.5 rounded-xs border cursor-pointer transition-colors ${
                    paymentMethod === 'cod' ? 'border-[#B78343] bg-[#FBF9F5]' : 'border-[#EAE7E1]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Banknote className="w-5 h-5 text-[#B78343]" />
                    <div>
                      <p className="text-xs font-semibold text-[#171717]">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-[#777]">Pay upon doorstep receipt</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#B78343]"
                  />
                </label>
              </div>

              {/* Total Row */}
              <div className="pt-2 flex justify-between items-center text-sm font-semibold text-[#171717]">
                <span>Total Payable:</span>
                <span className="text-lg text-[#B78343]">{formatPrice(total)}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#B78343] hover:bg-[#A37033] text-white text-xs font-semibold tracking-widest uppercase rounded-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>CONFIRM & PLACE ORDER</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'confirmed' && (
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#2D7A46] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold tracking-widest text-[#B78343] uppercase">
                  ORDER PLACED SUCCESSFULLY
                </span>
                <h4 className="font-serif text-2xl font-normal text-[#171717]">
                  Thank you, {name}
                </h4>
                <p className="text-xs text-[#666]">
                  Order Number: <strong className="text-[#171717]">{orderNumber}</strong>
                </p>
              </div>

              <div className="p-4 bg-[#FBF9F5] border border-[#EAE7E1] rounded-xs text-xs text-left space-y-2 max-w-sm mx-auto">
                <p><strong>Shipping to:</strong> {address}, {city} - {pincode}</p>
                <p><strong>Estimated Delivery:</strong> 3-4 business days</p>
                <p><strong>Payment Status:</strong> Confirmed ({paymentMethod.toUpperCase()})</p>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#171717] hover:bg-[#B78343] text-white text-xs font-semibold tracking-widest uppercase rounded-xs transition-colors cursor-pointer"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
