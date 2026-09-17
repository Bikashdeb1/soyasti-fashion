import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onQuickView: (product: Product) => void;
  currency: string;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  onRemoveWishlist,
  onAddToCart,
  onQuickView,
  currency
}) => {
  if (!isOpen) return null;

  const formatPrice = (amount: number) => {
    if (currency === 'USD') {
      return `$${Math.round(amount / 83)}`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
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
        {/* Header */}
        <div className="p-5 border-b border-[#EAE7E1] flex items-center justify-between bg-[#FBF9F5]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#B78343] fill-[#B78343]" />
            <h3 className="font-serif text-xl font-medium tracking-wide text-[#171717]">
              Saved Pieces
            </h3>
            <span className="text-xs font-semibold text-[#888888] ml-1">
              ({products.length})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EFECE6] text-[#171717] transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F0ECE5]">
          {products.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F7F5F1] border border-[#EAE7E1] flex items-center justify-center text-[#B78343]">
                <Heart className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-xl text-[#171717]">No Saved Pieces Yet</h4>
                <p className="text-xs text-[#7A7A7A] max-w-xs">
                  Tap the heart icon on any garment to keep track of your favorites for later.
                </p>
              </div>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="py-4 flex gap-4">
                <div
                  onClick={() => {
                    onClose();
                    onQuickView(product);
                  }}
                  className="w-20 h-24 flex-shrink-0 bg-[#F7F5F1] rounded-xs overflow-hidden border border-[#EAE7E1] cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        onClick={() => {
                          onClose();
                          onQuickView(product);
                        }}
                        className="text-sm font-medium text-[#171717] hover:text-[#B78343] cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveWishlist(product)}
                        className="text-[#999] hover:text-[#C53030] p-1 transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-xs text-[#888]">{product.subCategory}</span>
                    <div className="mt-1">
                      <span className="text-sm font-semibold text-[#171717]">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(product, product.sizes[1] || product.sizes[0]);
                      onRemoveWishlist(product);
                    }}
                    className="mt-2 w-full py-2 bg-[#171717] hover:bg-[#B78343] text-white text-[11px] font-semibold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
