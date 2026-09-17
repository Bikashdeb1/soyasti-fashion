import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CATEGORY_CARDS } from '../data/fashionData';
import { ProductCategory } from '../types';

interface CategoryGridProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section aria-label="Collections by Category" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {CATEGORY_CARDS.map((card) => (
          <div
            key={card.id}
            onClick={() => onSelectCategory(card.category)}
            className="group relative h-[360px] sm:h-[400px] lg:h-[420px] overflow-hidden rounded-md cursor-pointer bg-[#1A1715] shadow-sm hover:shadow-xl transition-all duration-500"
          >
            {/* Background Image with Zoom */}
            <img
              src={card.image}
              alt={`${card.title} Collection`}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5 transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/35" />

            {/* Card Content & Action Button at Bottom */}
            <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col items-start space-y-3">
              <div className="space-y-0.5">
                <h3
                  className="font-serif text-2xl sm:text-3xl font-medium tracking-wide text-white leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-[12px] text-white/90 font-medium tracking-[0.2em] uppercase">
                  {card.subtitle}
                </p>
              </div>

              {/* Circular chevron button */}
              <div className="w-8 h-8 rounded-full bg-[#C49454] hover:bg-[#B3803E] text-white flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-110">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
