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
  const isVertical = layout === 'vertical';

  const textColor = isDark ? '#171717' : '#FFFFFF';
  const subColor = isDark ? '#666666' : '#D0CBC4';

  const sizes = {
    sm: {
      logo: 'w-[42px] h-[42px]',
      brand: 'text-[17px]',
      subtitle: 'text-[7px]',
      gap: 'gap-2'
    },

    md: {
      logo: 'w-[52px] h-[52px]',
      brand: 'text-[22px]',
      subtitle: 'text-[9px]',
      gap: 'gap-2.5'
    },

    lg: {
      logo: 'w-[62px] h-[62px]',
      brand: 'text-[27px]',
      subtitle: 'text-[10px]',
      gap: 'gap-3'
    },

    hero: {
      logo: 'w-[78px] h-[78px]',
      brand: 'text-[34px]',
      subtitle: 'text-[12px]',
      gap: 'gap-3.5'
    }
  };

  const current = sizes[size];

  const logoSrc =
    `${import.meta.env.BASE_URL}images/soyasti-header-logo.jpg`;

  return (
    <div
      className={`
        flex
        ${isVertical
          ? 'flex-col items-center'
          : 'flex-row items-center'}
        ${current.gap}
        shrink-0
        select-none
        cursor-pointer
        group
      `}
    >
      {/* Bird / Crest */}
      <div
        className={`
          ${current.logo}
          shrink-0
          flex
          items-center
          justify-center
          overflow-hidden
        `}
      >
        <img
          src={logoSrc}
          alt={`${BRAND_INFO.name} crest`}
          className="
            w-full
            h-full
            object-contain
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />
      </div>

      {/* Brand Name */}
      <div
        className={`
          flex
          flex-col
          ${isVertical ? 'items-center text-center' : 'items-start'}
          leading-none
        `}
      >
        <span
          className={`
            ${current.brand}
            font-medium
            tracking-[0.08em]
            uppercase
            whitespace-nowrap
          `}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: textColor
          }}
        >
          {BRAND_INFO.name}
        </span>

        {showSubtitle && BRAND_INFO.subtitle && (
          <span
            className={`
              ${current.subtitle}
              mt-[4px]
              font-medium
              tracking-[0.28em]
              uppercase
              whitespace-nowrap
            `}
            style={{
              fontFamily: 'Arial, sans-serif',
              color: subColor
            }}
          >
            {BRAND_INFO.subtitle}
          </span>
        )}
      </div>
    </div>
  );
};