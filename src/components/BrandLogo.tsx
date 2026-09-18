import React from 'react';
import { BRAND_INFO } from '../data/fashionData';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  layout?: 'horizontal' | 'vertical';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  layout = 'horizontal'
}) => {
  const isVertical = layout === 'vertical';

  const sizeClasses = {
    // Mobile / compact uses
    sm: 'h-10 sm:h-11',

    // Main header logo
    md: 'h-14 sm:h-16',

    // Larger footer / special sections
    lg: 'h-18 sm:h-20',

    // Large brand presentation
    hero: 'h-20 sm:h-24'
  };

  const logoSrc = `${import.meta.env.BASE_URL}images/soyastibrandlogo.jpg`;

  return (
    <div
      className={`flex ${
        isVertical
          ? 'flex-col items-center justify-center'
          : 'items-center'
      } select-none group cursor-pointer shrink-0`}
    >
      <img
        src={logoSrc}
        alt={`${BRAND_INFO.name} logo`}
        className={`
          ${sizeClasses[size]}
          w-auto
          max-w-[200px]
          object-contain
          transition-transform
          duration-300
          group-hover:scale-105
        `}
      />
    </div>
  );
};