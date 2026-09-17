import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { ProductCategory } from '../types';
import { BRAND_INFO, SECONDARY_PERKS } from '../data/fashionData';

interface FooterProps {
  onSelectCategory: (category: ProductCategory | 'all' | 'sale' | 'new') => void;
  onOpenModal: (type: 'privacy' | 'terms' | 'shipping' | 'returns' | 'track') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenModal }) => {
  return (
    <footer aria-label="Site Footer" className="bg-[#171412] text-[#DFDAD3] border-t border-[#2A231E]">
      {/* Top Value Assurance Grid */}
      <div className="border-b border-[#2A231E] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          {SECONDARY_PERKS.map((perk) => (
            <div key={perk.id} className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                {perk.title}
              </span>
              <p className="text-xs text-[#9E958A]">
                {perk.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <BrandLogo variant="light" size="md" />
            <p className="text-xs sm:text-sm text-[#A89F93] leading-relaxed max-w-sm">
              Vaanya Atelier crafts conscious luxury tailored with architectural restraint. Handcrafted from pure organic silks, unbleached linens, and hand-combed Pashmina.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#3A332C] hover:border-[#B78343] hover:text-[#B78343] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-[#3A332C] hover:border-[#B78343] hover:text-[#B78343] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-full border border-[#3A332C] hover:border-[#B78343] hover:text-[#B78343] flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: SHOP (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-[#B78343] uppercase font-sans">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B8AEA3]">
              <li>
                <button
                  onClick={() => onSelectCategory('men')}
                  className="hover:text-white transition-colors"
                >
                  Men's Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('women')}
                  className="hover:text-white transition-colors"
                >
                  Women's Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('kids')}
                  className="hover:text-white transition-colors"
                >
                  Kids Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('casual')}
                  className="hover:text-white transition-colors"
                >
                  Everyday Casuals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('new')}
                  className="hover:text-white transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('sale')}
                  className="text-[#D88267] hover:text-[#EAA18A] transition-colors font-medium"
                >
                  Archive Sale
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: CUSTOMER CARE (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-[#B78343] uppercase font-sans">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B8AEA3]">
              <li>
                <button
                  onClick={() => onOpenModal('track')}
                  className="hover:text-white transition-colors"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('returns')}
                  className="hover:text-white transition-colors"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('shipping')}
                  className="hover:text-white transition-colors"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('terms')}
                  className="hover:text-white transition-colors"
                >
                  FAQs & Sizing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('privacy')}
                  className="hover:text-white transition-colors"
                >
                  Garment Care Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: COMPANY (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-[#B78343] uppercase font-sans">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B8AEA3]">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 1800, behavior: 'smooth' })}
                  className="hover:text-white transition-colors"
                >
                  About the Brand
                </button>
              </li>
              <li>
                <span className="text-[#888]">Weaver Cooperatives</span>
              </li>
              <li>
                <span className="text-[#888]">Atelier Careers</span>
              </li>
              <li>
                <span className="text-[#888]">Sustainability Report</span>
              </li>
              <li>
                <span className="text-[#888]">Press & Editorial</span>
              </li>
            </ul>
          </div>

          {/* Column 5: CONTACT (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-[#B78343] uppercase font-sans">
              ATELIER CONCIERGE
            </h4>
            <div className="space-y-3 text-xs text-[#B8AEA3]">
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B78343] mt-0.5 flex-shrink-0" />
                <a href={`mailto:${BRAND_INFO.email}`} className="hover:text-white">
                  {BRAND_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B78343] mt-0.5 flex-shrink-0" />
                <a href={`tel:${BRAND_INFO.phone}`} className="hover:text-white">
                  {BRAND_INFO.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B78343] mt-0.5 flex-shrink-0" />
                <span>{BRAND_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Payment and Copyright Bar */}
      <div className="border-t border-[#2A231E] py-8 px-4 sm:px-6 lg:px-8 bg-[#110F0E]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright & Legal Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-[#8A8277] text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} {BRAND_INFO.name} ATELIER. All Rights Reserved.</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenModal('privacy')}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <span>&bull;</span>
              <button
                onClick={() => onOpenModal('terms')}
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </button>
              <span>&bull;</span>
              <button
                onClick={() => onOpenModal('shipping')}
                className="hover:text-white transition-colors"
              >
                Shipping Policy
              </button>
            </div>
          </div>

          {/* Secure Payment Badges */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-wider text-[#736A60] hidden sm:inline">
              SECURE PAYMENTS:
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-[#26201B] border border-[#3E342D] rounded-xs text-[10px] font-mono text-[#D4CCC2]">
                VISA
              </span>
              <span className="px-2 py-1 bg-[#26201B] border border-[#3E342D] rounded-xs text-[10px] font-mono text-[#D4CCC2]">
                MASTERCARD
              </span>
              <span className="px-2 py-1 bg-[#26201B] border border-[#3E342D] rounded-xs text-[10px] font-mono text-[#B78343] font-bold">
                UPI
              </span>
              <span className="px-2 py-1 bg-[#26201B] border border-[#3E342D] rounded-xs text-[10px] font-mono text-[#4A90E2] font-semibold">
                RAZORPAY
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
