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

  const sizes = {
    sm: {
      wrapper: 'w-[70px] h-[50px]',
      image: 'w-[82px] h-[82px]'
    },
    md: {
      wrapper: 'w-[92px] h-[68px]',
      image: 'w-[105px] h-[105px]'
    },
    lg: {
      wrapper: 'w-[110px] h-[78px]',
      image: 'w-[120px] h-[120px]'
    },
    hero: {
      wrapper: 'w-[140px] h-[95px]',
      image: 'w-[150px] h-[150px]'
    }
  };

  const current = sizes[size];

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
        className={`${current.wrapper} relative overflow-hidden flex items-center justify-center`}
      >
        <img
          src={logoSrc}
          alt={`${BRAND_INFO.name} logo`}
          className={`${current.image} max-w-none object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:scale-[1.03]`}
        />
      </div>
    </div>
  );
};