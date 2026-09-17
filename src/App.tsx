import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryGrid } from './components/CategoryGrid';
import { BenefitsStrip } from './components/BenefitsStrip';
import { ProductCarousel } from './components/ProductCarousel';
import { EditorialBanner } from './components/EditorialBanner';
import { SecondaryCollections } from './components/SecondaryCollections';
import { BrandStory } from './components/BrandStory';
import { Testimonials } from './components/Testimonials';
import { SocialGallery } from './components/SocialGallery';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

// Drawers & Modals
import { MiniCartDrawer } from './components/MiniCartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { SearchOverlay } from './components/SearchOverlay';
import { CategoryFilterModal } from './components/CategoryFilterModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { PolicyModal } from './components/PolicyModal';

// Data & Types
import { PRODUCTS } from './data/fashionData';
import { Product, CartItem, ProductCategory, ProductColor } from './types';
import { CheckCircle2, Heart } from 'lucide-react';

export default function App() {
  // Currency State
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  // Cart State with LocalStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('SOYASTI CLOTHING_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    // Seed with 1 initial sample item to show user how beautiful the cart is right away
    return [
      {
        id: 'init-cart-1',
        product: PRODUCTS[0],
        size: 'M',
        color: PRODUCTS[0].colors[0],
        quantity: 1
      }
    ];
  });

  // Wishlist State with LocalStorage
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('SOYASTI CLOTHING_wishlist');
      if (saved) return new Set(JSON.parse(saved));
    } catch (e) {
      // ignore
    }
    return new Set(['vyn-001', 'vyn-002']);
  });

  // Modals & Drawers visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [catalogModal, setCatalogModal] = useState<{
    isOpen: boolean;
    category: ProductCategory | 'all' | 'sale' | 'new';
  }>({
    isOpen: false,
    category: 'all'
  });
  const [policyModal, setPolicyModal] = useState<{
    isOpen: boolean;
    type: 'privacy' | 'terms' | 'shipping' | 'returns' | 'track' | null;
  }>({
    isOpen: false,
    type: null
  });

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('SOYASTI CLOTHING_cart', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  // Sync Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('SOYASTI CLOTHING_wishlist', JSON.stringify(Array.from(wishlistIds)));
    } catch (e) {
      // ignore
    }
  }, [wishlistIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  // Cart Actions
  const handleAddToCart = (
    product: Product,
    size: string = 'M',
    color?: ProductColor,
    qty: number = 1
  ) => {
    const chosenColor = color || product.colors[0];
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color.name === chosenColor.name
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += qty;
        return next;
      } else {
        return [
          ...prev,
          {
            id: `${product.id}-${size}-${chosenColor.name}-${Date.now()}`,
            product,
            size,
            color: chosenColor,
            quantity: qty
          }
        ];
      }
    });

    showToast(`Added ${product.name} (${size}) to your bag`);
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from your bag');
  };

  // Wishlist Actions
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Removed from saved pieces`);
      } else {
        next.add(product.id);
        showToast(`Saved ${product.name} to your wishlist`);
      }
      return next;
    });
  };

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.has(p.id));

  // Category selection handler (from Header, Banner, Hero, or Grid)
  const handleOpenCategory = (cat: ProductCategory | 'all' | 'sale' | 'new') => {
    setCatalogModal({
      isOpen: true,
      category: cat
    });
  };

  // Shop product by exact name (from Social lookbook tag)
  const handleShopProductByName = (name: string) => {
    const found = PRODUCTS.find((p) => p.name.toLowerCase() === name.toLowerCase());
    if (found) {
      setQuickViewProduct(found);
    } else {
      setCatalogModal({ isOpen: true, category: 'all' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#171717] font-sans antialiased selection:bg-[#B78343]/20 selection:text-[#171717] flex flex-col">
      {/* 1. Announcement Bar */}
      <AnnouncementBar
        currency={currency}
        onToggleCurrency={() => setCurrency((prev) => (prev === 'INR' ? 'USD' : 'INR'))}
        onTrackOrder={() => setPolicyModal({ isOpen: true, type: 'track' })}
      />

      {/* 2. Primary Navigation Header */}
      <Header
        wishlistCount={wishlistIds.size}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSelectCategory={handleOpenCategory}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* 3. Editorial Hero Carousel */}
        <HeroCarousel
          onExploreCollection={() => handleOpenCategory('new')}
          onShopCategory={(cat) => handleOpenCategory(cat)}
        />

        {/* 4. Category Grid (Men, Women, Kids, Casuals) */}
        <CategoryGrid onSelectCategory={(cat) => handleOpenCategory(cat)} />

        {/* 5. Trust & Service Benefits Strip */}
        <BenefitsStrip />

        {/* 6. Trending Products Carousel */}
        <ProductCarousel
          products={PRODUCTS}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onQuickAdd={(prod, size) => handleAddToCart(prod, size || 'M')}
          onViewAll={() => handleOpenCategory('all')}
          currency={currency}
        />

        {/* 7. Featured Collection Editorial Banner */}
        <EditorialBanner onExplore={() => handleOpenCategory('casual')} />

        {/* 8. Secondary Collections & Capsules */}
        <SecondaryCollections onSelectCollection={(cat) => handleOpenCategory(cat)} />

        {/* 9. Brand Story & Craftsmanship Values */}
        <BrandStory onReadStory={() => setPolicyModal({ isOpen: true, type: 'terms' })} />

        {/* 10. Community Social Proof & Testimonials */}
        <Testimonials />

        {/* 11. Instagram / Social Gallery */}
        <SocialGallery onShopProductByName={handleShopProductByName} />

        {/* 12. Newsletter Subscription */}
        <Newsletter onSuccessToast={showToast} />
      </main>

      {/* 13. Site Footer */}
      <Footer
        onSelectCategory={handleOpenCategory}
        onOpenModal={(type) => setPolicyModal({ isOpen: true, type })}
      />

      {/* DRAWERS & MODALS */}

      {/* Mini Cart Drawer */}
      <MiniCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onContinueShopping={() => handleOpenCategory('all')}
        currency={currency}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={wishlistedProducts}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(prod, size) => {
          handleAddToCart(prod, size || 'M');
        }}
        onQuickView={(prod) => setQuickViewProduct(prod)}
        currency={currency}
      />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.has(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(prod, size, col, qty) => handleAddToCart(prod, size, col, qty)}
        currency={currency}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(prod) => setQuickViewProduct(prod)}
        currency={currency}
      />

      {/* Catalog & Filter Explorer Modal */}
      <CategoryFilterModal
        isOpen={catalogModal.isOpen}
        onClose={() => setCatalogModal((prev) => ({ ...prev, isOpen: false }))}
        products={PRODUCTS}
        initialCategory={catalogModal.category}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onQuickView={(prod) => setQuickViewProduct(prod)}
        onQuickAdd={(prod, size) => handleAddToCart(prod, size || 'M')}
        currency={currency}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccessToast={showToast}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderComplete={() => {
          setCartItems([]);
          showToast('Order confirmed! Receipt dispatched to your email.');
        }}
        currency={currency}
      />

      {/* Policy and Order Tracking Modal */}
      <PolicyModal
        isOpen={policyModal.isOpen}
        onClose={() => setPolicyModal({ isOpen: false, type: null })}
        type={policyModal.type}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171717] text-white px-4 py-3 rounded-xs shadow-xl flex items-center gap-2.5 text-xs border border-[#3A332C] animate-slideInRight">
          <CheckCircle2 className="w-4 h-4 text-[#B78343] flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
