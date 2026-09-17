import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface EditorialBannerProps {
  onExplore: () => void;
}

export const EditorialBanner: React.FC<EditorialBannerProps> = ({ onExplore }) => {
  return (
    <section aria-label="Featured Editorial Campaign" className="w-full bg-[#F7F5F1] border-y border-[#EAE7E1] my-8 sm:my-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Luxury Editorial Photography Composition */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-xs border border-[#E4E0D7] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85"
                alt="The Everyday Edit Campaign"
                className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-103"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Overlapping floating editorial quote card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-white p-5 border border-[#EAE7E1] shadow-md rounded-xs max-w-xs">
              <div className="flex items-center gap-1.5 text-[#B78343] mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[10px] font-semibold tracking-widest uppercase">Atelier Note</span>
              </div>
              <p className="font-serif italic text-sm text-[#2A211B] leading-relaxed">
                “Luxury is when quality speaks with quiet restraint.”
              </p>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6 lg:pl-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFE8DE] text-[#B78343] rounded-xs text-[11px] font-semibold tracking-[0.2em] uppercase">
              <span>AUTUMN / WINTER PERSPECTIVE</span>
            </div>

            <h2
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#171717] leading-[1.12]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              THE EVERYDAY EDIT
            </h2>

            <p className="text-[#5E5E5E] text-sm sm:text-base leading-relaxed">
              Garments created for effortless versatility across morning meetings, afternoon travels, and twilight dinners. We blend organic natural fibers with architectural silhouettes that adapt seamlessly to your personal cadence.
            </p>

            <div className="pt-2">
              <button
                onClick={onExplore}
                className="group px-7 py-3.5 bg-[#171717] hover:bg-[#B78343] text-white text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase rounded-xs transition-all duration-300 shadow-sm flex items-center gap-2.5 cursor-pointer"
              >
                <span>EXPLORE THE EDIT</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
