import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Check, Truck, ShieldCheck, Ruler } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: ProductColor, qty: number) => void;
  currency: string;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  currency
}) => {
  if (!isOpen || !product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'care'>('details');

  const formatPrice = (amount: number) => {
    if (currency === 'USD') {
      return `$${Math.round(amount / 83)}`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleAdd = () => {
    setAddedAnimation(true);
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-xs overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[92vh] border border-[#EAE7E1] animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#171717] shadow-sm flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Photography Gallery */}
        <div className="w-full md:w-1/2 bg-[#F7F5F1] flex flex-col justify-between p-4 sm:p-6 overflow-y-auto">
          {/* Main Selected Image */}
          <div className="relative aspect-[3/4] w-full rounded-xs overflow-hidden bg-white border border-[#EAE7E1]">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-[#171717] text-white rounded-2xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#B78343]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details & Controls */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & Ratings */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#B78343] uppercase font-sans">
                {product.gender} &bull; {product.subCategory}
              </span>
              <span className="text-xs text-[#777]">
                ★ {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Title & Pricing */}
            <div>
              <h2
                className="font-serif text-2xl sm:text-3xl font-medium text-[#171717]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-xl font-semibold text-[#171717]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#999999] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="px-2 py-0.5 text-xs font-medium text-[#8F3E28] bg-[#F7F2EC] rounded-2xs">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#171717]">Color:</span>
                <span className="text-[#666]">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      selectedColor.name === color.name
                        ? 'ring-2 ring-[#B78343] ring-offset-2 scale-110'
                        : 'border-black/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColor.name === color.name && (
                      <Check className={`w-3.5 h-3.5 ${color.hex === '#FFFFFF' || color.hex === '#F6F4ED' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#171717]">Select Size:</span>
                <span className="inline-flex items-center gap-1 text-[#888] cursor-pointer hover:text-[#B78343]">
                  <Ruler className="w-3 h-3" />
                  <span>Size Guide</span>
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 text-xs font-semibold uppercase rounded-xs border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#171717] text-white border-[#171717]'
                        : 'bg-white text-[#333] border-[#DCD6CC] hover:border-[#B78343]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-semibold text-[#171717]">Quantity:</span>
              <div className="flex items-center border border-[#DCD6CC] rounded-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm text-[#555] hover:bg-[#F7F5F1]"
                >
                  -
                </button>
                <span className="px-3 text-xs font-semibold text-[#171717]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-sm text-[#555] hover:bg-[#F7F5F1]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions: Add to Bag & Wishlist */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 bg-[#B78343] hover:bg-[#A37033] text-white text-xs font-semibold tracking-[0.16em] uppercase rounded-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO SHOPPING BAG</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`w-12 h-12 rounded-xs border flex items-center justify-center transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-[#171717] text-[#B78343] border-[#171717]'
                    : 'border-[#DCD6CC] hover:border-[#B78343] text-[#333]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#B78343]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Tabbed Specs: Details, Fabric, Care */}
          <div className="border-t border-[#EAE7E1] pt-4">
            <div className="flex gap-4 border-b border-[#EAE7E1] text-xs font-semibold">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 transition-colors ${
                  activeTab === 'details'
                    ? 'text-[#171717] border-b-2 border-[#B78343]'
                    : 'text-[#888] hover:text-[#171717]'
                }`}
              >
                OVERVIEW
              </button>
              <button
                onClick={() => setActiveTab('fabric')}
                className={`pb-2 transition-colors ${
                  activeTab === 'fabric'
                    ? 'text-[#171717] border-b-2 border-[#B78343]'
                    : 'text-[#888] hover:text-[#171717]'
                }`}
              >
                FABRIC & FIT
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-2 transition-colors ${
                  activeTab === 'care'
                    ? 'text-[#171717] border-b-2 border-[#B78343]'
                    : 'text-[#888] hover:text-[#171717]'
                }`}
              >
                CARE GUIDE
              </button>
            </div>

            <div className="py-3 text-xs text-[#666] leading-relaxed">
              {activeTab === 'details' && <p>{product.description}</p>}
              {activeTab === 'fabric' && (
                <div className="space-y-1">
                  <p><strong>Fabric:</strong> {product.fabric}</p>
                  <p><strong>Silhouette:</strong> {product.fit}</p>
                </div>
              )}
              {activeTab === 'care' && <p>{product.care}</p>}
            </div>

            <div className="flex items-center gap-4 text-[11px] text-[#777] pt-2 border-t border-[#F0ECE5]">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#B78343]" />
                Express Delivery 2-4 Days
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B78343]" />
                30-Day Hassle-free Returns
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
