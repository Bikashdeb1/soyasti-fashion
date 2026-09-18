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
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    hero: 'h-16 sm:h-20'
  };

  const logoSrc = `${import.meta.env.BASE_URL}soyastibrandlogo.JPG`;

  return (
    <div
      className={`flex ${
        isVertical
          ? 'flex-col items-center justify-center'
          : 'items-center'
      } select-none group cursor-pointer`}
    >
      <img
        src={logoSrc}
        alt={`${BRAND_INFO.name} logo`}
        className={`${sizeClasses[size]} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
      />
    </div>
  );
};