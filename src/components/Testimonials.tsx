import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/fashionData';

export const Testimonials: React.FC = () => {
  return (
    <section aria-label="Customer Reviews & Testimonials" className="bg-[#F7F5F1] py-16 sm:py-24 border-y border-[#EAE7E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-[#B78343] mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#B78343] text-[#B78343]" />
            ))}
            <span className="text-xs font-semibold text-[#171717] ml-2">4.9 / 5.0 (2,800+ REVIEWS)</span>
          </div>

          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#171717]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            LOVED BY OUR COMMUNITY
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-2">
            Dispatches from clients wearing Vaanya across the globe.
          </p>
        </div>

        {/* 4 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 sm:p-7 rounded-xs border border-[#EAE7E1] shadow-2xs flex flex-col justify-between relative group hover:border-[#B78343]/50 transition-colors"
            >
              <div>
                {/* Quotation icon */}
                <Quote className="w-8 h-8 text-[#B78343]/20 mb-3" />

                {/* Star rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#B78343] text-[#B78343]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#4A4A4A] leading-relaxed italic font-serif">
                  "{review.comment}"
                </p>
              </div>

              {/* Author & Item */}
              <div className="pt-6 mt-6 border-t border-[#F0ECE5]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#171717] tracking-wider uppercase">
                    {review.name}
                  </span>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#B78343] font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#888888] mt-1">
                  <span>{review.location}</span>
                  <span className="truncate max-w-[120px]" title={review.productName}>
                    {review.productName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
