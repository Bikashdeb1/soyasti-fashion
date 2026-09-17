import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  currency: string;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  currency
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularSearches = [
    'Structured Linen Overshirt',
    'Silk Slip Dress',
    'Chanderi Kurta',
    'Pima Polo',
    'Pleated Trousers',
    'Co-ord Sets',
    'Kids Linen'
  ];

  const filteredProducts = query.trim() === ''
    ? []
    : products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.subCategory.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase())
      );

  const formatPrice = (amount: number) => {
    if (currency === 'USD') return `$${Math.round(amount / 83)}`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white animate-fadeIn">
      {/* Search Header Row */}
      <div className="border-b border-[#EAE7E1] px-4 sm:px-8 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-3">
            <Search className="w-6 h-6 text-[#B78343]" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search garments, fabrics, silhouettes, or collections..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-lg sm:text-xl md:text-2xl font-normal text-[#171717] placeholder-[#A0988E] outline-none font-serif"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-[#888] hover:text-[#171717] px-2 py-1 uppercase"
              >
                Clear
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F7F5F1] text-[#171717] transition-colors"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Search Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* If no query: Show Popular Searches & Curated Suggestions */}
          {query.trim() === '' ? (
            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-semibold tracking-[0.2em] text-[#B78343] uppercase mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>TRENDING SEARCHES</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuery(item)}
                      className="px-3.5 py-1.5 bg-[#F7F5F1] hover:bg-[#EFE8DE] text-xs text-[#333] hover:text-[#171717] rounded-xs border border-[#EAE7E1] transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommended spotlight items */}
              <div>
                <h4 className="text-xs font-semibold tracking-[0.2em] text-[#888] uppercase mb-4">
                  SEASONAL SPOTLIGHT
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {products.slice(0, 4).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(product);
                      }}
                      className="group cursor-pointer space-y-2"
                    >
                      <div className="aspect-[3/4] bg-[#F7F5F1] rounded-xs overflow-hidden border border-[#EAE7E1]">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-[#171717] group-hover:text-[#B78343] transition-colors truncate">
                          {product.name}
                        </h5>
                        <span className="text-xs font-semibold text-[#171717]">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Search Results */
            <div>
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#EAE7E1]">
                <h4 className="text-xs font-semibold tracking-[0.15em] text-[#888] uppercase">
                  Search Results for "{query}"
                </h4>
                <span className="text-xs text-[#171717] font-medium">
                  {filteredProducts.length} items found
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 space-y-2">
                  <p className="text-base font-serif text-[#171717]">
                    No garments matching "{query}"
                  </p>
                  <p className="text-xs text-[#777]">
                    Try checking spelling or exploring collections like "Linen", "Silk", or "Overshirt".
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(product);
                      }}
                      className="group cursor-pointer space-y-2"
                    >
                      <div className="relative aspect-[3/4] bg-[#F7F5F1] rounded-xs overflow-hidden border border-[#EAE7E1]">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                        />
                        {product.badge && (
                          <span className="absolute top-2 left-2 px-1.5 py-0.5 text-[9px] font-semibold tracking-wider bg-[#171717] text-white rounded-2xs uppercase">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="text-[10px] text-[#888] uppercase tracking-wider block">
                          {product.subCategory}
                        </span>
                        <h5 className="text-xs font-medium text-[#171717] group-hover:text-[#B78343] transition-colors truncate">
                          {product.name}
                        </h5>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-xs font-semibold text-[#171717]">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[10px] text-[#999] line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
