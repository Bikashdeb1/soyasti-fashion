import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onQuickAdd: (product: Product, size?: string) => void;
  currency: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onQuickAdd,
  currency
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const formatPrice = (amount: number) => {
    if (currency === 'USD') {
      return `$${Math.round(amount / 83)}`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div
      className="group relative flex flex-col bg-white select-none transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F7F5F1] rounded-xs border border-[#EAE7E1]/70">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className={`px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase rounded-2xs ${
                product.badge === 'BESTSELLER'
                  ? 'bg-[#171717] text-white'
                  : product.badge === 'NEW'
                  ? 'bg-[#B78343] text-white'
                  : product.badge === 'LIMITED'
                  ? 'bg-[#4A3B32] text-[#F3EFEA]'
                  : 'bg-[#8F3E28] text-white'
              }`}
            >
              {product.badge}
            </span>
          )}
          {product.discountPercent && (
            <span className="px-2 py-0.5 text-[10px] font-medium tracking-wider bg-[#F3EFEA] text-[#8F3E28] border border-[#E8DFD3] rounded-2xs">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isWishlisted
              ? 'bg-[#B78343] text-white shadow-sm'
              : 'bg-white/85 text-[#444] hover:bg-white hover:text-[#B78343] shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white stroke-white' : ''}`} />
        </button>

        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* Secondary Hover Image */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate angle`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Quick Action Overlay (slides up smoothly on hover) */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 z-20 flex gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 py-2.5 px-2 bg-white/95 hover:bg-white text-[#171717] text-[11px] font-semibold tracking-wider uppercase rounded-xs shadow-md backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#B78343]" />
            <span>Quick View</span>
          </button>
          <button
            onClick={() => onQuickAdd(product, product.sizes[1] || product.sizes[0])}
            className="flex-1 py-2.5 px-2 bg-[#171717] hover:bg-[#B78343] text-white text-[11px] font-semibold tracking-wider uppercase rounded-xs shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="pt-3.5 pb-2 px-1 flex flex-col flex-1">
        {/* Category & Color Swatches */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[10px] tracking-[0.18em] uppercase text-[#888888] font-medium">
            {product.subCategory}
          </span>
          {/* Color swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.map((col, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColorIndex(idx);
                  }}
                  title={col.name}
                  aria-label={`Select color ${col.name}`}
                  className={`w-2.5 h-2.5 rounded-full border transition-all ${
                    idx === selectedColorIndex ? 'ring-1 ring-[#B78343] ring-offset-1' : 'border-black/10'
                  }`}
                  style={{ backgroundColor: col.hex }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onQuickView(product)}
          className="font-medium text-sm text-[#171717] hover:text-[#B78343] transition-colors line-clamp-1 cursor-pointer"
        >
          {product.name}
        </h3>

        {/* Price Row */}
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-[#171717]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#999999] line-through font-normal">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
