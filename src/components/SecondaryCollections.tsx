import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SECONDARY_COLLECTIONS } from '../data/fashionData';
import { ProductCategory } from '../types';

interface SecondaryCollectionsProps {
  onSelectCollection: (category: ProductCategory) => void;
}

export const SecondaryCollections: React.FC<SecondaryCollectionsProps> = ({ onSelectCollection }) => {
  return (
    <section aria-label="Secondary Fashion Collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B78343] uppercase font-sans">
          CURATED OCCASIONS
        </span>
        <h2
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#171717] mt-1.5"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          CURATED CAPSULES
        </h2>
        <p className="text-xs sm:text-sm text-[#666666] mt-2 leading-relaxed">
          From crisp morning tailoring to twilight festivities and weekend ease.
        </p>
      </div>

      {/* Asymmetrical 4-Card Editorial Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
        {SECONDARY_COLLECTIONS.map((item, index) => {
          // Map to category
          const catMap: Record<string, ProductCategory> = {
            workwear: 'workwear',
            weekend: 'casual',
            festive: 'festive',
            essentials: 'men'
          };
          const targetCategory = catMap[item.id] || 'casual';

          return (
            <div
              key={item.id}
              onClick={() => onSelectCollection(targetCategory)}
              className="group relative flex flex-col bg-[#F7F5F1] rounded-xs overflow-hidden border border-[#EAE7E1] cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-[#D4C9BC]"
            >
              {/* Image Box */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFECE6]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Upper label tag */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase bg-white/90 backdrop-blur-xs text-[#171717] rounded-2xs">
                    {item.label}
                  </span>
                </div>

                {/* Bottom arrow inside image */}
                <div className="absolute bottom-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-white text-[#171717] group-hover:bg-[#B78343] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-md">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Bottom text info */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3
                    className="font-serif text-xl sm:text-2xl font-normal text-[#171717] group-hover:text-[#B78343] transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#666666] mt-1 line-clamp-2 leading-relaxed font-normal">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
