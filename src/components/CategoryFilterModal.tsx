import React, { useState, useMemo } from 'react';
import { X, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product, ProductCategory } from '../types';

interface CategoryFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  initialCategory?: ProductCategory | 'all' | 'sale' | 'new';
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onQuickAdd: (product: Product, size?: string) => void;
  currency: string;
}

export const CategoryFilterModal: React.FC<CategoryFilterModalProps> = ({
  isOpen,
  onClose,
  products,
  initialCategory = 'all',
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onQuickAdd,
  currency
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedSize, setSelectedSize] = useState<string>('all');

  // Reset or sync when modal opens with new category
  React.useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory, isOpen]);

  if (!isOpen) return null;

  const categories = [
    { label: 'ALL COLLECTIONS', value: 'all' },
    { label: 'MEN', value: 'men' },
    { label: 'WOMEN', value: 'women' },
    { label: 'KIDS', value: 'kids' },
    { label: 'CASUAL', value: 'casual' },
    { label: 'FESTIVE', value: 'festive' },
    { label: 'WORKWEAR', value: 'workwear' },
    { label: 'NEW IN', value: 'new' },
    { label: 'SALE', value: 'sale' }
  ];

  const sizes = ['all', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory === 'sale') {
      list = list.filter((p) => p.discountPercent && p.discountPercent > 0);
    } else if (selectedCategory === 'new') {
      list = list.filter((p) => p.badge === 'NEW' || p.isSignature);
    } else if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Gender filter
    if (selectedGender !== 'all') {
      list = list.filter((p) => p.gender.toLowerCase() === selectedGender.toLowerCase());
    }

    // Size filter
    if (selectedSize !== 'all') {
      list = list.filter((p) => p.sizes.includes(selectedSize));
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedCategory, selectedGender, selectedSize, sortBy]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Main Full View / Large Drawer */}
      <div className="relative w-full max-w-5xl bg-white h-full shadow-2xl flex flex-col z-10 animate-slideInRight overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EAE7E1] flex items-center justify-between bg-[#FBF9F5]">
          <div>
            <span className="text-[10px] uppercase font-semibold tracking-[0.25em] text-[#B78343]">
              ATELIER CATALOGUE
            </span>
            <h3
              className="font-serif text-2xl sm:text-3xl font-medium tracking-wide text-[#171717]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {categories.find((c) => c.value === selectedCategory)?.label || 'COLLECTIONS'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EFECE6] text-[#171717] transition-colors"
            aria-label="Close catalog"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter & Sort Bar */}
        <div className="px-6 py-3.5 border-b border-[#EAE7E1] bg-white flex flex-wrap items-center justify-between gap-3">
          {/* Category tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-[#171717] text-white'
                    : 'bg-[#F7F5F1] text-[#555] hover:text-[#171717] hover:bg-[#EFE8DE]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Selector & Size Filter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#555]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#B78343]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border border-[#DCD6CC] rounded-xs px-2 py-1 text-xs text-[#171717] outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <span className="text-xs text-[#888]">
              {filteredAndSortedProducts.length} styles
            </span>
          </div>
        </div>

        {/* Catalog Products Grid */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
              <p className="font-serif text-xl text-[#171717]">No pieces found in this view</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSize('all');
                }}
                className="text-xs font-semibold text-[#B78343] uppercase tracking-wider underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistIds.has(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickView={onQuickView}
                  onQuickAdd={onQuickAdd}
                  currency={currency}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
