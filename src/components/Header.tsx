import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

import { BrandLogo } from './BrandLogo';
import { MEGA_MENU_DATA } from '../data/fashionData';
import { ProductCategory } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onSelectCategory: (
    category: ProductCategory | 'all' | 'sale' | 'new'
  ) => void;
  currency: string;
  onToggleCurrency: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAuth,
  onSelectCategory,
  currency,
  onToggleCurrency
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const [
    activeDropdown,
    setActiveDropdown
  ] = useState<
    'men' | 'women' | 'kids' | 'collections' | null
  >(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] =
    useState<string | null>(null);

  const dropdownTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ============================================================
     SCROLL STATE
     ============================================================ */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* ============================================================
     LOCK BODY SCROLL WHEN MOBILE MENU IS OPEN
     ============================================================ */

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  /* ============================================================
     CLEANUP DROPDOWN TIMEOUT
     ============================================================ */

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  /* ============================================================
     DESKTOP MEGA MENU HANDLERS
     ============================================================ */

  const handleMouseEnter = (
    cat: 'men' | 'women' | 'kids' | 'collections'
  ) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }

    setActiveDropdown(cat);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  /* ============================================================
     NAVIGATION ITEMS
     ============================================================ */

  interface NavItem {
    label: string;
    key: string;
    category: ProductCategory | 'all' | 'sale' | 'new';
    hasMega?: boolean;
    isSale?: boolean;
    isBadge?: boolean;
  }

  const navItems: NavItem[] = [
    {
      label: 'HOME',
      key: 'home',
      category: 'all'
    },
    {
      label: "MEN'S ATELIER",
      key: 'men',
      hasMega: true,
      category: 'men'
    },
    {
      label: "WOMEN'S STUDIO",
      key: 'women',
      hasMega: true,
      category: 'women'
    },
    {
      label: 'KIDS COLLECTION',
      key: 'kids',
      hasMega: true,
      category: 'kids'
    },
    {
      label: 'FESTIVE WEAR',
      key: 'fashion',
      category: 'festive'
    },
    {
      label: 'CASUAL LUXURY',
      key: 'casual',
      category: 'casual'
    },
    {
      label: 'NEW ARRIVALS',
      key: 'new',
      category: 'new'
    },
    {
      label: 'ARCHIVE SALE',
      key: 'sale',
      category: 'sale',
      isSale: true
    }
  ];

  /* ============================================================
     MOBILE CATEGORY HANDLER
     ============================================================ */

  const handleMobileNavClick = (item: NavItem) => {
    if (item.hasMega) {
      setMobileExpandedCat(
        mobileExpandedCat === item.key ? null : item.key
      );
      return;
    }

    onSelectCategory(item.category);
    setMobileMenuOpen(false);
    setMobileExpandedCat(null);
  };

  /* ============================================================
     CLOSE MOBILE MENU
     ============================================================ */

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileExpandedCat(null);
  };

  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <>
      {/* ========================================================
          MAIN HEADER
          ======================================================== */}

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-white/95 backdrop-blur-md ${
          isScrolled
            ? 'shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] border-b border-[#EAE7E1]'
            : 'border-b border-[#F0ECE5]'
        }`}
      >
        {/* ======================================================
            PRIMARY HEADER ROW
            ====================================================== */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* ====================================================
              MOBILE LEFT ACTIONS
              ==================================================== */}

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="p-2 -ml-2 text-[#171717] hover:text-[#B78343] transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <button
              onClick={onOpenSearch}
              aria-label="Open search"
              className="p-2 text-[#171717] hover:text-[#B78343] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* ====================================================
              BRAND LOGO
              ==================================================== */}

          <div
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });

              onSelectCategory('all');
            }}
            className="flex-shrink-0 cursor-pointer"
          >
            <BrandLogo size="md" />
          </div>

          {/* ====================================================
              DESKTOP NAVIGATION
              ==================================================== */}

          <nav className="hidden lg:flex items-center gap-7 font-sans text-[13px] tracking-[0.14em] font-medium text-[#262626]">
            {navItems.map((item) => (
              <div
                key={item.key}
                className="relative py-7 group"
                onMouseEnter={() =>
                  item.hasMega &&
                  handleMouseEnter(
                    item.key as
                      | 'men'
                      | 'women'
                      | 'kids'
                      | 'collections'
                  )
                }
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => {
                    onSelectCategory(item.category);
                  }}
                  className={`inline-flex items-center gap-1 transition-colors duration-200 uppercase tracking-widest ${
                    item.isSale
                      ? 'text-[#A04D36] font-semibold hover:text-[#803B27]'
                      : 'hover:text-[#B78343]'
                  }`}
                >
                  <span>{item.label}</span>

                  {item.hasMega && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 text-[#888888] group-hover:text-[#B78343] ${
                        activeDropdown === item.key
                          ? 'rotate-180 text-[#B78343]'
                          : ''
                      }`}
                    />
                  )}

                  {item.isBadge && (
                    <span className="ml-1 text-[9px] px-1.5 py-0.5 bg-[#F3EFEA] text-[#B78343] font-semibold rounded-xs">
                      AW24
                    </span>
                  )}
                </button>

                {/* Bottom underline */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#B78343] transform origin-left transition-transform duration-250 ease-out ${
                    activeDropdown === item.key
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </div>
            ))}
          </nav>

          {/* ====================================================
              RIGHT ACTION ICONS
              ==================================================== */}

          <div className="flex items-center gap-3 sm:gap-4.5 text-[#171717]">

            {/* Currency */}
            <button
              onClick={onToggleCurrency}
              className="hidden sm:inline-flex items-center px-2 py-1 text-[11px] font-medium tracking-wider text-[#5E5E5E] hover:text-[#171717] border border-[#E4E1DC] rounded-xs hover:border-[#B78343] transition-colors"
              title="Toggle currency display"
            >
              {currency === 'INR' ? '₹ INR' : '$ USD'}
            </button>

            {/* Search */}
            <button
              onClick={onOpenSearch}
              aria-label="Search clothing catalog"
              className="hidden lg:flex items-center gap-2 p-2 text-[#262626] hover:text-[#B78343] transition-colors group cursor-pointer"
            >
              <Search className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />

              <span className="hidden xl:inline text-xs tracking-wider text-[#7A7A7A] group-hover:text-[#B78343]">
                SEARCH
              </span>
            </button>

            {/* Account */}
            <button
              onClick={onOpenAuth}
              aria-label="My Account"
              className="p-2 text-[#262626] hover:text-[#B78343] transition-colors relative group cursor-pointer"
            >
              <User className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              aria-label={`Wishlist (${wishlistCount} items)`}
              className="p-2 text-[#262626] hover:text-[#B78343] transition-colors relative group cursor-pointer"
            >
              <Heart className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />

              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B78343] text-white text-[10px] font-semibold flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={onOpenCart}
              aria-label={`Shopping Bag (${cartCount} items)`}
              className="flex items-center gap-2 p-2 text-[#262626] hover:text-[#B78343] transition-colors relative group cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />

                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 bg-[#171717] text-white text-[10px] font-semibold flex items-center justify-center rounded-full border border-white">
                    {cartCount}
                  </span>
                )}
              </div>

              <span className="hidden md:inline text-xs tracking-wider font-semibold text-[#171717]">
                BAG
              </span>
            </button>
          </div>
        </div>

        {/* ======================================================
            DESKTOP MEGA MENU
            ====================================================== */}

        {activeDropdown &&
          MEGA_MENU_DATA[activeDropdown] && (
            <div
              className="hidden lg:block absolute top-full left-0 w-full bg-[#FFFFFF] border-b border-[#E4E1DC] shadow-[0_15px_30px_-10px_rgba(0,0,0,0.08)] transition-all duration-250 animate-fadeIn"
              onMouseEnter={() =>
                handleMouseEnter(activeDropdown)
              }
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-12 gap-8">

                {/* Navigation columns */}
                <div className="col-span-8 grid grid-cols-3 gap-8 border-r border-[#EFECE6] pr-8">
                  {MEGA_MENU_DATA[
                    activeDropdown
                  ].columns.map((col, idx) => (
                    <div key={idx} className="space-y-4">

                      <h4 className="text-[11px] font-semibold tracking-[0.2em] text-[#B78343] uppercase font-sans">
                        {col.title}
                      </h4>

                      <ul className="space-y-2.5">
                        {col.links.map(
                          (link, lIdx) => (
                            <li key={lIdx}>
                              <button
                                onClick={() => {
                                  setActiveDropdown(null);
                                  onSelectCategory(
                                    activeDropdown as ProductCategory
                                  );
                                }}
                                className="text-sm text-[#4A4A4A] hover:text-[#171717] hover:translate-x-1 transition-all duration-150 text-left cursor-pointer"
                              >
                                {link}
                              </button>
                            </li>
                          )
                        )}
                      </ul>

                    </div>
                  ))}
                </div>

                {/* Featured card */}
                <div className="col-span-4 pl-4">
                  <div
                    onClick={() => {
                      setActiveDropdown(null);
                      onSelectCategory(
                        activeDropdown as ProductCategory
                      );
                    }}
                    className="group relative overflow-hidden rounded-xs border border-[#EAE7E1] bg-[#F7F5F1] p-4 cursor-pointer flex flex-col h-full justify-between"
                  >
                    <div className="relative h-44 w-full overflow-hidden rounded-xs mb-3">
                      <img
                        src={
                          MEGA_MENU_DATA[
                            activeDropdown
                          ].featured.image
                        }
                        alt={
                          MEGA_MENU_DATA[
                            activeDropdown
                          ].featured.title
                        }
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    <div>
                      <h5 className="font-serif text-lg font-semibold text-[#171717] group-hover:text-[#B78343] transition-colors">
                        {
                          MEGA_MENU_DATA[
                            activeDropdown
                          ].featured.title
                        }
                      </h5>

                      <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                        {
                          MEGA_MENU_DATA[
                            activeDropdown
                          ].featured.subtitle
                        }
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#EAE7E1] flex items-center justify-between text-xs font-semibold tracking-wider text-[#171717] group-hover:text-[#B78343]">
                      <span>
                        {
                          MEGA_MENU_DATA[
                            activeDropdown
                          ].featured.cta
                        }
                      </span>

                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
      </header>

      {/* =========================================================
          MOBILE SLIDE-IN DRAWER
          IMPORTANT: THIS IS OUTSIDE <header>
          ========================================================= */}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            onClick={closeMobileMenu}
          />

          {/* Drawer */}
          <aside
            className="
              absolute
              left-0
              top-0
              h-[100dvh]
              w-[88vw]
              max-w-[380px]
              bg-white
              shadow-2xl
              flex
              flex-col
              overflow-hidden
              animate-slideInLeft
            "
          >

            {/* ===================================================
                DRAWER HEADER
                =================================================== */}

            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAE7E1] shrink-0">

              <BrandLogo size="sm" />

              <button
                onClick={closeMobileMenu}
                className="p-2 text-[#171717] hover:text-[#B78343] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>

            </div>

            {/* ===================================================
                DRAWER CONTENT
                =================================================== */}

            <div className="flex-1 overflow-y-auto px-5 py-5">

              <div className="space-y-1">

                {navItems.map((item) => {

                  const megaData =
                    item.hasMega
                      ? MEGA_MENU_DATA[
                          item.key as
                            | 'men'
                            | 'women'
                            | 'kids'
                            | 'collections'
                        ]
                      : null;

                  const isExpanded =
                    mobileExpandedCat === item.key;

                  return (
                    <div
                      key={item.key}
                      className="border-b border-[#F0ECE5]"
                    >

                      {/* Main menu row */}
                      <div className="flex items-center justify-between py-4">

                        <button
                          onClick={() =>
                            handleMobileNavClick(item)
                          }
                          className={`
                            flex-1
                            text-left
                            text-[14px]
                            font-medium
                            tracking-[0.12em]
                            uppercase
                            transition-colors
                            ${
                              item.isSale
                                ? 'text-[#A04D36]'
                                : 'text-[#171717]'
                            }
                            hover:text-[#B78343]
                          `}
                        >
                          {item.label}
                        </button>

                        {item.hasMega && (
                          <button
                            onClick={() =>
                              handleMobileNavClick(item)
                            }
                            className="p-2 text-[#777777] hover:text-[#B78343] transition-colors"
                            aria-label={`Expand ${item.label}`}
                            aria-expanded={isExpanded}
                          >
                            <ChevronDown
                              className={`
                                w-4 h-4
                                transition-transform
                                duration-200
                                ${
                                  isExpanded
                                    ? 'rotate-180 text-[#B78343]'
                                    : ''
                                }
                              `}
                            />
                          </button>
                        )}

                      </div>

                      {/* =================================================
                          EXPANDED MOBILE MEGA MENU
                          ALL COLUMNS ARE DISPLAYED
                          ================================================= */}

                      {item.hasMega &&
                        isExpanded &&
                        megaData && (
                          <div className="pb-5 pl-2">

                            <div className="space-y-6 border-l-2 border-[#B78343]/30 pl-4">

                              {megaData.columns.map(
                                (column, columnIndex) => (
                                  <div key={columnIndex}>

                                    <h4 className="mb-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-[#B78343]">
                                      {column.title}
                                    </h4>

                                    <div className="space-y-1">

                                      {column.links.map(
                                        (
                                          link,
                                          linkIndex
                                        ) => (
                                          <button
                                            key={linkIndex}
                                            onClick={() => {
                                              onSelectCategory(
                                                item.category
                                              );
                                              closeMobileMenu();
                                            }}
                                            className="
                                              block
                                              w-full
                                              text-left
                                              py-1.5
                                              text-[13px]
                                              leading-5
                                              text-[#5E5E5E]
                                              hover:text-[#171717]
                                              transition-colors
                                            "
                                          >
                                            {link}
                                          </button>
                                        )
                                      )}

                                    </div>
                                  </div>
                                )
                              )}

                            </div>
                          </div>
                        )}

                    </div>
                  );
                })}

              </div>

              {/* =================================================
                  ACCOUNT / WISHLIST
                  ================================================= */}

              <div className="mt-6 pt-5 border-t border-[#EAE7E1] space-y-2">

                <button
                  onClick={() => {
                    onOpenWishlist();
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-3 w-full py-3 text-sm font-medium text-[#262626] hover:text-[#B78343] transition-colors"
                >
                  <Heart className="w-4 h-4" />

                  <span>
                    My Wishlist ({wishlistCount})
                  </span>
                </button>

                <button
                  onClick={() => {
                    onOpenAuth();
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-3 w-full py-3 text-sm font-medium text-[#262626] hover:text-[#B78343] transition-colors"
                >
                  <User className="w-4 h-4" />

                  <span>
                    Account & Orders
                  </span>
                </button>

                <button
                  onClick={onToggleCurrency}
                  className="flex items-center justify-between w-full py-3 text-sm text-[#5E5E5E]"
                >
                  <span>Currency</span>

                  <span className="font-semibold text-[#171717]">
                    {currency}
                  </span>
                </button>

              </div>
            </div>

            {/* =================================================
                DRAWER FOOTER
                ================================================= */}

            <div className="px-5 py-4 bg-[#F7F5F1] border-t border-[#EAE7E1] shrink-0">

              <p className="text-xs font-medium text-[#171717]">
                Complimentary Domestic Shipping
              </p>

              <p className="mt-1 text-[11px] text-[#7A7A7A]">
                On all orders above ₹3,999
              </p>

            </div>

          </aside>
        </div>
      )}
    </>
  );
};