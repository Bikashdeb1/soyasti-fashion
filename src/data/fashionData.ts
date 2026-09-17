import { Product, HeroSlide, CollectionCard, Benefit, Testimonial, SocialPost } from '../types';

export const BRAND_INFO = {
  name: 'SOYASTI CLOTHING',
  subtitle: 'ATELIER',
  fullName: 'SOYASTI CLOTHING ATELIER',
  tagline: 'Timeless Elegance, Modern Craft',
  description: 'Conscious luxury tailored with architectural restraint. Handcrafted from pure organic silks, unbleached linens, and hand-combed Pashmina.',
  contactPerson: 'Atelier Concierge',
  phone: '+91 11 4982 3000',
  email: 'concierge@SOYASTI CLOTHING-atelier.com',
  address: 'The Crescent, Mehrauli, New Delhi 110030',
  instagramHandle: '@SOYASTI CLOTHING.atelier',
  freeShippingThreshold: 3999,
  returnPolicyDays: 30,
  logoType: 'svg' as const,
  logoImageUrl: ''
};

export const BRAND_NAME = BRAND_INFO.fullName;
export const BRAND_TAGLINE = BRAND_INFO.tagline;

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    eyebrow: 'AUTUMN / WINTER 2024 COLLECTION',
    title: 'THE SILENT ARCHITECTURE OF DRESSING',
    subtitle: 'Engineered in raw Mulberry silks, handwoven Pashmina, and organic Belgian linens. Tailored with architectural restraint for timeless presence.',
    primaryCta: 'EXPLORE THE COLLECTION',
    secondaryCta: 'VIEW EDITORIAL',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85',
    categoryLink: 'women',
    badgeText: 'NEW RELEASE'
  },
  {
    id: 2,
    eyebrow: 'HAND-LOOMED HERITAGE CAPSULE',
    title: 'TEXTURES WOVEN IN QUIET HARMONY',
    subtitle: 'Chanderi zari borders, plant-dyed indigo weaves, and featherweight organza designed for celebrations and serene evenings.',
    primaryCta: 'DISCOVER HERITAGE',
    secondaryCta: 'MEET THE WEAVERS',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85',
    categoryLink: 'festive',
    badgeText: 'LIMITED RUN'
  },
  {
    id: 3,
    eyebrow: 'BESPOKE CONTEMPORARY TAILORING',
    title: 'SCULPTED FOR UNCOMPROMISING EASE',
    subtitle: 'Relaxed bandhgalas, unstructured summer linen suits, and fluid silk kurtas crafted for the modern connoisseur.',
    primaryCta: 'SHOP MENSWEAR',
    secondaryCta: 'ATELIER SERVICES',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=85',
    categoryLink: 'men',
    badgeText: 'SIGNATURE'
  }
];

export const CATEGORY_CARDS: CollectionCard[] = [
  {
    id: 'women',
    category: 'women',
    title: "WOMEN'S STUDIO",
    subtitle: 'Tailored Silks & Cottons',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80',
    itemCount: '38 Pieces'
  },
  {
    id: 'men',
    category: 'men',
    title: "MEN'S ATELIER",
    subtitle: 'Linen Suits & Casuals',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80',
    itemCount: '26 Pieces'
  },
  {
    id: 'kids',
    category: 'kids',
    title: 'KIDS COLLECTION',
    subtitle: 'Organic Festive & Playwear',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80',
    itemCount: '19 Pieces'
  },
  {
    id: 'casual',
    category: 'casual',
    title: 'EVERYDAY CASUALS',
    subtitle: 'Pure Linen Daily Luxury',
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=900&q=80',
    itemCount: '31 Pieces'
  }
];

export const BENEFITS: Benefit[] = [
  {
    id: '1',
    title: 'COMPLIMENTARY SHIPPING',
    description: 'On all domestic atelier orders above ₹3,999',
    iconName: 'truck'
  },
  {
    id: '2',
    title: 'DOORSTEP CONCIERGE & RETURNS',
    description: '30-day effortless returns with pickup',
    iconName: 'refresh'
  },
  {
    id: '3',
    title: 'CERTIFIED ORGANIC TEXTILES',
    description: '100% GOTS certified cotton, raw silk & linen',
    iconName: 'award'
  },
  {
    id: '4',
    title: 'COMPLIMENTARY MONOGRAMMING',
    description: 'Personalized tailoring with hand-finished initials',
    iconName: 'scissors'
  }
];

export const SECONDARY_PERKS = [
  {
    id: '1',
    title: 'EXCLUSIVE OFFERS',
    description: 'Special perks for our loyal atelier members',
    iconName: 'gift'
  },
  {
    id: '2',
    title: 'NEW ARRIVALS WEEKLY',
    description: 'Stay ahead with timeless seasonal releases',
    iconName: 'sparkles'
  },
  {
    id: '3',
    title: 'PRICE TRANSPARENCY',
    description: 'Ethical luxury without retail markups',
    iconName: 'tag'
  },
  {
    id: '4',
    title: 'DEDICATED CONCIERGE',
    description: 'Personalized sizing and styling support',
    iconName: 'headset'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'vyn-001',
    name: 'Bias-Cut Silk Slip Midi Dress',
    category: 'women',
    subCategory: 'Dresses',
    gender: 'Women',
    price: 12800,
    originalPrice: 15500,
    discountPercent: 17,
    badge: 'BESTSELLER',
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Fluid silhouette cut on the bias in heavyweight sandwashed Mulberry silk. Drapes effortlessly along natural body contours with delicate French seams and French rouleau straps.',
    fabric: '100% Sandwashed Mulberry Silk (22 Momme)',
    fit: 'Fluid Bias Cut',
    care: 'Dry clean only or delicate cold handwash',
    colors: [
      { name: 'Caramel Bronze', hex: '#A87954' },
      { name: 'Onyx Noir', hex: '#1C1C1C' },
      { name: 'Ivory Pearl', hex: '#F7F5F0' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isTrending: true,
    isSignature: true
  },
  {
    id: 'vyn-002',
    name: 'Structured Linen Overshirt',
    category: 'men',
    subCategory: 'Overshirts & Shackets',
    gender: 'Men',
    price: 8400,
    originalPrice: 9800,
    discountPercent: 14,
    badge: 'NEW',
    rating: 4.8,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Substantial 340 GSM Normandy linen tailored with a dropped shoulder, dual utility breast pockets, and hand-carved horn buttons. Built to soften with every season.',
    fabric: '100% Pure Normandy Flax Linen',
    fit: 'Relaxed Architectural Fit',
    care: 'Gentle machine wash cold, lay flat to dry',
    colors: [
      { name: 'Raw Sand', hex: '#D6C8B4' },
      { name: 'Smoked Olive', hex: '#585E4E' },
      { name: 'Deep Indigo', hex: '#263445' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isTrending: true,
    isSignature: true
  },
  {
    id: 'vyn-003',
    name: 'Chanderi Zari Festive Anarkali',
    category: 'women',
    subCategory: 'Indian Ethnic & Fusion',
    gender: 'Women',
    price: 16500,
    originalPrice: 19800,
    discountPercent: 17,
    badge: 'ORGANIC',
    rating: 5.0,
    reviewCount: 28,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Woven by master artisans in Chanderi, Madhya Pradesh. Features hand-interlocked real zari motifs along the hem, paired with pure mulmul inner lining and organza dupatta.',
    fabric: 'Chanderi Silk-Cotton with Handwoven Zari',
    fit: 'Flared Regal Silhouette',
    care: 'Specialist dry clean only',
    colors: [
      { name: 'Saffron Ochre', hex: '#C68E37' },
      { name: 'Dusty Rose', hex: '#C88E88' },
      { name: 'Emerald Pine', hex: '#2A4B40' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isTrending: true,
    isSignature: true
  },
  {
    id: 'vyn-004',
    name: 'Tailored Pleated Trousers',
    category: 'men',
    subCategory: 'Trousers',
    gender: 'Men',
    price: 7800,
    originalPrice: 9200,
    discountPercent: 15,
    badge: 'LIMITED',
    rating: 4.9,
    reviewCount: 39,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Double reverse pleats, extended tab waistband, and side buckle adjusters. Woven from breathable tropical wool and organic Belgian linen blend for year-round sharpness.',
    fabric: '60% Tropical Wool, 40% Belgian Linen',
    fit: 'High-Rise Tapered Leg',
    care: 'Dry clean recommended',
    colors: [
      { name: 'Oatmeal Melange', hex: '#CBC3B5' },
      { name: 'Espresso', hex: '#3B2F2F' },
      { name: 'Slate Grey', hex: '#4A5056' }
    ],
    sizes: ['30', '32', '34', '36', '38'],
    inStock: true,
    isTrending: false,
    isSignature: true
  },
  {
    id: 'vyn-005',
    name: 'Essential Pima Knit Polo',
    category: 'men',
    subCategory: 'Knitwear',
    gender: 'Men',
    price: 4900,
    originalPrice: 5800,
    discountPercent: 15,
    badge: 'BESTSELLER',
    rating: 4.8,
    reviewCount: 56,
    images: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Fine 18-gauge knit spun from extra-long staple Peruvian Pima cotton. Open camp collar without buttons for clean, unpretentious mid-century sophistication.',
    fabric: '100% Extra-Long Staple Pima Cotton',
    fit: 'Standard Tailored Fit',
    care: 'Hand wash cold or gentle wool cycle',
    colors: [
      { name: 'Alabaster White', hex: '#F2EFE9' },
      { name: 'Desert Camel', hex: '#A37A52' },
      { name: 'Midnight Navy', hex: '#162030' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isTrending: true
  },
  {
    id: 'vyn-006',
    name: 'Pure Cashmere Pashmina Stole',
    category: 'women',
    subCategory: 'Accessories',
    gender: 'Unisex',
    price: 14200,
    originalPrice: 16800,
    discountPercent: 15,
    badge: 'LIMITED',
    rating: 5.0,
    reviewCount: 18,
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Hand-spun and handwoven by Kashmiri artisan families using grade-A Changthangi goat fiber. Weighs less than 110 grams yet delivers peerless warmth.',
    fabric: '100% Ladakhi Changthangi Cashmere',
    fit: 'Generous Wrap (200cm x 75cm)',
    care: 'Dry clean or specialized wool shampoo',
    colors: [
      { name: 'Natural Natural Grey', hex: '#9E988E' },
      { name: 'Warm Biscuit', hex: '#D1BFA9' },
      { name: 'Deep Burgundy', hex: '#581825' }
    ],
    sizes: ['One Size'],
    inStock: true,
    isTrending: false,
    isSignature: true
  },
  {
    id: 'vyn-007',
    name: 'Junior Linen Camp Collar Shirt',
    category: 'kids',
    subCategory: 'Boys',
    gender: 'Kids',
    price: 3400,
    originalPrice: 4200,
    discountPercent: 19,
    badge: 'NEW',
    rating: 4.8,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Lightweight, pre-washed European linen designed for active little ones. Breathable, hypoallergenic, and finished with smooth coconut shell buttons.',
    fabric: '100% Pre-Washed Organic Linen',
    fit: 'Casual Boxy Fit',
    care: 'Machine wash warm, line dry',
    colors: [
      { name: 'Natural Sand', hex: '#DFD8CC' },
      { name: 'Terracotta', hex: '#B78343' },
      { name: 'Ocean Mist', hex: '#94A3B8' }
    ],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    inStock: true,
    isTrending: true
  },
  {
    id: 'vyn-008',
    name: 'Tiered Broderie Anglaise Dress',
    category: 'kids',
    subCategory: 'Girls',
    gender: 'Kids',
    price: 3800,
    originalPrice: 4600,
    discountPercent: 17,
    badge: 'ORGANIC',
    rating: 5.0,
    reviewCount: 27,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Delicate eyelet embroidery and a twirl-worthy tiered silhouette lined with buttery soft organic cotton cambric. Gentle on sensitive skin.',
    fabric: '100% GOTS Certified Organic Cotton',
    fit: 'A-Line Tiered Fit',
    care: 'Gentle cycle wash, warm iron',
    colors: [
      { name: 'Dusty Rose', hex: '#D6A6A0' },
      { name: 'Cream Ivory', hex: '#FAF7F2' }
    ],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    inStock: true,
    isTrending: true
  }
];

export const SECONDARY_COLLECTIONS = [
  {
    id: 'workwear',
    label: 'WORKWEAR',
    title: 'Architectural Tailoring',
    subtitle: 'Sharp, crease-resistant separates curated for purposeful modern ambition.',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'aspect-[4/5]'
  },
  {
    id: 'weekend',
    label: 'WEEKEND ESCAPE',
    title: 'Relaxed Resort Linens',
    subtitle: 'Unstructured blazers, drawstring trousers, and sun-bleached palettes.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'aspect-[4/3]'
  },
  {
    id: 'festive',
    label: 'FESTIVE CELEBRATION',
    title: 'Artisanal Weaves & Silk',
    subtitle: 'Handwoven silhouettes adorned with restrained metallic thread work.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'aspect-[4/3]'
  },
  {
    id: 'essentials',
    label: 'MONOCHROME ESSENTIALS',
    title: 'The Permanent Wardrobe',
    subtitle: 'Foundation pieces created with unmatched density and timeless lines.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'aspect-[4/5]'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ananya Deshmukh',
    location: 'Mumbai, MH',
    rating: 5,
    comment: 'The drape of the Sandwashed Silk Slip is astonishing. It feels like bespoke couture at an honest price point. The packaging alone felt like opening a private atelier gift.',
    productName: 'Bias-Cut Silk Slip Midi Dress',
    verified: true
  },
  {
    id: '2',
    name: 'Vikramaditya Roy',
    location: 'Bengaluru, KA',
    rating: 5,
    comment: 'Finally, a contemporary menswear label that understands fabric weight. The Normandy Linen Overshirt holds its structure even in southern humidity. Superb craftsmanship.',
    productName: 'Structured Linen Overshirt',
    verified: true
  },
  {
    id: '3',
    name: 'Meera & Kabir Kapoor',
    location: 'New Delhi, DL',
    rating: 5,
    comment: 'Purchased both the Chanderi Kurta and the boys linen camp shirt for Diwali. The natural breathability and gentle organic lining kept our son comfortable all evening.',
    productName: 'Junior Linen Camp Collar Shirt',
    verified: true
  },
  {
    id: '4',
    name: 'Eleanor Vance',
    location: 'London, UK',
    rating: 5,
    comment: 'International delivery arrived in 4 days. The stitching and natural horn buttons on the wool trousers rival Savile Row ready-to-wear pieces. Truly impressed.',
    productName: 'Tailored Pleated Trousers',
    verified: true
  }
];

export const SOCIAL_GALLERY: SocialPost[] = [
  {
    id: 's1',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    handle: '@SOYASTI CLOTHINGstudio',
    likes: '2.4k',
    caption: 'Quiet confidence in our Caramel Bronze Rib Set. Shot on location in Jaipur.',
    productTag: 'Minimalist Cotton Rib Co-ord'
  },
  {
    id: 's2',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    handle: '@tanya_sharma',
    likes: '4.1k',
    caption: 'Sunday mornings in pure unbleached linen. #SOYASTI CLOTHINGWomen',
    productTag: 'Soft Linen Maxi Dress'
  },
  {
    id: 's3',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    handle: '@aditya_k',
    likes: '1.9k',
    caption: 'Architectural cuts for the everyday gentleman. @SOYASTI CLOTHINGstudio',
    productTag: 'Structured Linen Overshirt'
  },
  {
    id: 's4',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    handle: '@arjun.vogue',
    likes: '3.6k',
    caption: 'The art of layering when seasons change. Fine merino & heavy flax.',
    productTag: 'Essential Pima Knit Polo'
  },
  {
    id: 's5',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    handle: '@SOYASTI CLOTHINGstudio',
    likes: '5.2k',
    caption: 'Light catch on mulberry silk. Crafted for lingering twilight evenings.',
    productTag: 'Bias-Cut Silk Slip Midi Dress'
  },
  {
    id: 's6',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    handle: '@leela_living',
    likes: '3.1k',
    caption: 'Everyday elevated. Breathable fabrics for our little companions.',
    productTag: 'Tiered Broderie Anglaise Dress'
  }
];

export const MEGA_MENU_DATA = {
  men: {
    columns: [
      {
        title: 'HIGHLIGHTS',
        links: ['New In: Autumn/Winter', 'Atelier Bestsellers', 'The Linen Edit', 'Festive Occasions', 'Monochrome Permanent']
      },
      {
        title: 'CLOTHING',
        links: ['Overshirts & Shackets', 'Tailored Shirts', 'Fine Knit Polos', 'Structured Trousers', 'Relaxed Shorts', 'Suits & Blazers']
      },
      {
        title: 'TRADITIONAL & ETHNIC',
        links: ['Handwoven Kurtas', 'Nehru Bandhgala Jackets', 'Silk Churidars & Dhotis', 'Festive Sets']
      }
    ],
    featured: {
      title: 'THE MODERN OVERSHIRT',
      subtitle: 'Heavyweight Normandy linen with horn buttons',
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80',
      cta: 'Explore Men'
    }
  },
  women: {
    columns: [
      {
        title: 'HIGHLIGHTS',
        links: ['New In This Week', 'The Silk Edit', 'Contemporary Drapes', 'Minimalist Lounge', 'Award Winners']
      },
      {
        title: 'WESTERN & CONTEMPORARY',
        links: ['Dresses & Slips', 'Tailored Co-ords', 'High-Waist Trousers', 'Linen Blouses', 'Structured Trench Coats']
      },
      {
        title: 'INDIAN ETHNIC & FUSION',
        links: ['Chanderi & Organza Kurtas', 'Handloom Sarees', 'Embroidered Kaftans', 'Celebration Anarkalis']
      }
    ],
    featured: {
      title: 'FLUID SILK EDIT',
      subtitle: 'Sandwashed mulberry silk for effortless movement',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
      cta: 'Explore Women'
    }
  },
  kids: {
    columns: [
      {
        title: 'BOYS (3-12 YRS)',
        links: ['Organic Linen Shirts', 'Cotton Chinos', 'Festive Kurta Pyjamas', 'Playwear Tees', 'Lightweight Jackets']
      },
      {
        title: 'GIRLS (3-12 YRS)',
        links: ['Broderie Anglaise Dresses', 'Linen Jumpsuits', 'Festive Lehengas', 'Organic Cotton Tops', 'Tiered Skirts']
      },
      {
        title: 'CARE & VALUES',
        links: ['100% GOTS Certified Cotton', 'Zero Scratchy Labels', 'Natural Shell Buttons', 'Handmade in India']
      }
    ],
    featured: {
      title: 'GENTLE COMFORT',
      subtitle: 'Pure hypoallergenic textiles crafted with care',
      image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80',
      cta: 'Shop Kids'
    }
  },
  collections: {
    columns: [
      {
        title: 'SEASONAL EDITS',
        links: ['Autumn/Winter 2024', 'The Summer Solstice', 'Monsoon Minimal', 'Resort 2025']
      },
      {
        title: 'CURATED CAPSULES',
        links: ['The Everyday Edit', 'Architectural Workwear', 'Festive Heritage', 'The Linen Studio', 'Raw Earth Tones']
      },
      {
        title: 'OUR ATELIER',
        links: ['Sustainable Sourcing', 'Craftsmanship & Weavers', 'The Permanent Wardrobe', 'Fabric Care Guide']
      }
    ],
    featured: {
      title: 'THE EVERYDAY EDIT',
      subtitle: 'Versatile garments designed for modern lifestyles',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
      cta: 'View All Collections'
    }
  }
};
