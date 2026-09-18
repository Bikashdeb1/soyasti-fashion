import React from 'react';
import { BRAND_INFO } from '../data/fashionData';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  layout?: 'horizontal' | 'vertical';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-[120px]',
    md: 'w-[150px]',
    lg: 'w-[190px]',
    hero: 'w-[240px]'
  };

  const logoSrc =
    `${import.meta.env.BASE_URL}images/soyasti-header-logo.jpg`;

  return (
    <div className="flex items-center shrink-0">
      <img
        src={logoSrc}
        alt={`${BRAND_INFO.name} logo`}
        className={`${sizeClasses[size]} h-auto object-contain`}
      />
    </div>
  );
};