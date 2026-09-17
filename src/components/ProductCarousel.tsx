import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface ProductCarouselProps {
  products: Product[];
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onQuickAdd: (product: Product, size?: string) => void;
  onViewAll: () => void;
  currency: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onQuickAdd,
  onViewAll,
  currency
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section aria-label="Trending Products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4 border-b border-[#EAE7E1] pb-5">
        <div>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#171717]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            SIGNATURE PIECES
          </h2>
          <p className="text-xs sm:text-sm text-[#777777] mt-1.5 font-normal">
            Curated atelier releases tailored in unhurried succession
          </p>
        </div>

        {/* View All and Navigation Arrows */}
        <div className="flex items-center gap-4">
          <button
            onClick={onViewAll}
            className="group inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.15em] text-[#171717] hover:text-[#B78343] uppercase transition-colors cursor-pointer"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-9 h-9 rounded-full border border-[#DCD6CC] hover:border-[#B78343] hover:text-[#B78343] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-9 h-9 rounded-full border border-[#DCD6CC] hover:border-[#B78343] hover:text-[#B78343] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] snap-start"
          >
            <ProductCard
              product={product}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onQuickAdd={onQuickAdd}
              currency={currency}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
