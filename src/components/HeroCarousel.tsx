import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/fashionData';
import { ProductCategory } from '../types';

interface HeroCarouselProps {
  onShopCategory: (category: ProductCategory) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onShopCategory }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 6200);
    return () => clearInterval(interval);
  }, [isHovered, totalSlides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      aria-label="Editorial Campaign Carousel"
      className="relative w-full h-[580px] sm:h-[620px] lg:h-[680px] bg-[#171412] text-white overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Photography with slow subtle zoom on active */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
              {/* Controlled gradient overlay: heavy charcoal/black on left fading to gentle translucent on right */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25 sm:via-black/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
            </div>

            {/* Slide Content Box */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-center">
              <div className="max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-6">
                {/* Eyebrow badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[#E5D7C5] rounded-xs text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B78343]" />
                  <span>{slide.eyebrow}</span>
                </div>

                {/* Editorial Headline */}
                <h1
                  className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.08] font-normal tracking-tight text-white drop-shadow-sm"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {slide.title}
                </h1>

                {/* Supporting description */}
                <p className="text-[#DFDAD3] text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl">
                  {slide.subtitle}
                </p>

                {/* Dual Call to Actions */}
                <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onShopCategory(slide.categoryLink)}
                    className="px-7 py-3.5 bg-[#B78343] hover:bg-[#A37033] text-white text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase rounded-xs transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                  >
                    {slide.primaryCta}
                  </button>

                  <button
                    onClick={() => onShopCategory(slide.categoryLink)}
                    className="px-7 py-3.5 bg-transparent hover:bg-white/10 text-white border border-white/40 hover:border-white text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase rounded-xs transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                  >
                    {slide.secondaryCta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-white/30 bg-black/30 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B78343]"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-white/30 bg-black/30 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B78343]"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators & Numbering */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 w-full z-30 flex items-center justify-center gap-3">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentIndex ? 'w-10 bg-[#B78343]' : 'w-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
