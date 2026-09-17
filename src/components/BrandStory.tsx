import React from 'react';
import { ArrowRight, Feather, Compass, Users, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { BRAND_INFO } from '../data/fashionData';

interface BrandStoryProps {
  onReadStory: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onReadStory }) => {
  const brandValues = [
    {
      icon: <Feather className="w-4 h-4 text-[#B78343]" />,
      title: 'Premium Quality Fabrics',
      desc: '100% natural linen, organic cotton & silk'
    },
    {
      icon: <Compass className="w-4 h-4 text-[#B78343]" />,
      title: 'Thoughtful Design',
      desc: 'Balanced cuts engineered for everyday ease'
    },
    {
      icon: <Users className="w-4 h-4 text-[#B78343]" />,
      title: 'For All Generations',
      desc: 'Refined menswear, womenswear & kids'
    },
    {
      icon: <Sparkles className="w-4 h-4 text-[#B78343]" />,
      title: 'Made with Passion',
      desc: 'Crafted responsibly with master artisans'
    }
  ];

  return (
    <section aria-label="About the Brand Story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-[#EAE7E1]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Side: Editorial Monogram Crest & Visual Card */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-10 sm:p-14 bg-[#FBF9F5] border border-[#EAE7E1] rounded-xs text-center relative overflow-hidden">
          {/* Subtle background decorative geometry */}
          <div className="absolute -top-10 -left-10 w-40 h-40 border border-[#B78343]/15 rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-[#B78343]/15 rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Soyasti Emblem */}
            <div className="mb-4">
              <BrandLogo size="lg" />
            </div>

            <div className="h-px w-16 bg-[#B78343]/40 my-4" />

            <p className="text-xs text-[#6B6B6B] max-w-xs font-serif italic leading-relaxed">
              “{BRAND_INFO.tagline} — Rooted in slow craftsmanship, exceptional fabrics, and timeless architectural restraint.”
            </p>

            <span className="mt-4 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B78343]">
              MEHRAULI &bull; NEW DELHI ATELIER
            </span>
          </div>
        </div>

        {/* Right Side: Editorial Narrative & Values */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          <div className="space-y-3">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B78343] uppercase font-sans">
              THE {BRAND_INFO.name} ATELIER PHILOSOPHY
            </span>
            <h2
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#171717] leading-[1.12]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              BORN FROM ARCHITECTURAL RESTRAINT,<br className="hidden sm:inline" /> CRAFTED FOR TRANQUILITY
            </h2>
          </div>

          <p className="text-[#5E5E5E] text-sm sm:text-base leading-relaxed">
            At {BRAND_INFO.name}, we believe true luxury is quiet, deliberate, and deeply tactile. Our collections for Men, Women & Kids are born from a philosophy of architectural restraint and pure natural textiles. Working directly with master weaving guilds in Chanderi, Kashmir, and Bengal, every silhouette is tailored in unhurried succession to be cherished across decades.
          </p>

          {/* 4 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
            {brandValues.map((val, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-3.5 rounded-xs bg-[#FBF9F5] border border-[#EAE7E1]"
              >
                <div className="w-8 h-8 rounded-full bg-white border border-[#E4E1DC] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  {val.icon}
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13px] font-semibold text-[#171717] uppercase tracking-wider">
                    {val.title}
                  </h4>
                  <p className="text-xs text-[#7A7A7A] mt-0.5 leading-snug">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={onReadStory}
              className="group px-7 py-3.5 bg-[#171717] hover:bg-[#B78343] text-white text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase rounded-xs transition-all duration-300 shadow-sm flex items-center gap-2.5 cursor-pointer"
            >
              <span>KNOW MORE ABOUT US</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
