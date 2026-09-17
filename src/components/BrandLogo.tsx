import React from 'react';
import { BRAND_INFO } from '../data/fashionData';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  layout?: 'horizontal' | 'vertical';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
  layout = 'horizontal'
}) => {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-[#171717]' : 'text-[#FFFFFF]';
  const subColor = isDark ? 'text-[#888888]' : 'text-[#B8AEA3]';
  const isVertical = layout === 'vertical';

  return (
    <div className={`flex ${isVertical ? 'flex-col items-center text-center' : 'items-center'} gap-2.5 sm:gap-3 select-none group cursor-pointer`}>
      {/* Vaanya Geometric Diamond Atelier Crest */}
      <div className={`relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105 text-[#B78343] ${
        size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-12 h-12' : size === 'hero' ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-9 h-9 sm:w-10 sm:h-10'
      }`}>
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Diamond outer frame */}
          <rect
            x="22"
            y="3"
            width="26"
            height="26"
            transform="rotate(45 22 3)"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeOpacity="0.85"
          />
          {/* Stylized geometric V atelier monogram */}
          <path
            d="M12 14L22 34L32 14C30 18 26 25 22 28C18 25 14 18 12 14Z"
            fill="currentColor"
          />
          <path
            d="M17 11L22 21L27 11C25 13 23 15 22 16C21 15 19 13 17 11Z"
            fill={isDark ? '#171717' : '#FFFFFF'}
          />
          <circle cx="22" cy="7" r="1.75" fill="currentColor" />
        </svg>
      </div>

      {/* Vaanya Brand Typography */}
      <div className={`flex flex-col ${isVertical ? 'items-center mt-1' : ''}`}>
        <span
          className={`tracking-[0.24em] font-medium uppercase leading-none transition-colors duration-200 ${
            size === 'sm' ? 'text-lg sm:text-xl' : size === 'lg' ? 'text-3xl sm:text-4xl' : size === 'hero' ? 'text-4xl sm:text-5xl' : 'text-xl sm:text-2xl'
          } ${textColor}`}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {BRAND_INFO.name}
        </span>
        {showSubtitle && BRAND_INFO.subtitle && (
          <span
            className={`tracking-[0.45em] font-sans font-medium uppercase mt-1 ${
              size === 'sm' ? 'text-[7px]' : size === 'hero' ? 'text-[11px] sm:text-xs' : 'text-[8px] sm:text-[9px]'
            } ${subColor}`}
          >
            {BRAND_INFO.subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
