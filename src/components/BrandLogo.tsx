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
    sm: {
      wrapper: 'w-[72px] h-[52px]',
      image: 'w-[120px]'
    },
    md: {
      wrapper: 'w-[105px] h-[72px]',
      image: 'w-[175px]'
    },
    lg: {
      wrapper: 'w-[125px] h-[85px]',
      image: 'w-[205px]'
    },
    hero: {
      wrapper: 'w-[150px] h-[105px]',
      image: 'w-[245px]'
    }
  };

  const currentSize = sizeClasses[size];

  const logoSrc = `${import.meta.env.BASE_URL}images/soyastibrandlogo.jpg`;

  return (
    <div
      className={`flex ${
        isVertical
          ? 'flex-col items-center justify-center'
          : 'items-center justify-center'
      } shrink-0 select-none group cursor-pointer`}
    >
      <div
        className={`${currentSize.wrapper} relative overflow-hidden flex items-center justify-center`}
      >
        <img
          src={logoSrc}
          alt={`${BRAND_INFO.name} logo`}
          className={`
            ${currentSize.image}
            max-w-none
            h-auto
            object-contain
            transition-transform
            duration-300
            group-hover:scale-105
          `}
        />
      </div>
    </div>
  );
};