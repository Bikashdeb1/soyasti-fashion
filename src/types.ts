export type ProductCategory = 'men' | 'women' | 'kids' | 'casual' | 'festive' | 'workwear';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subCategory: string;
  gender: 'Men' | 'Women' | 'Kids' | 'Unisex';
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  badge?: 'NEW' | 'BESTSELLER' | '-20%' | 'LIMITED' | 'ORGANIC' | 'TRENDING' | 'HOT' | 'FESTIVE' | 'POPULAR' | string;
  rating: number;
  reviewCount: number;
  images: [string, string]; // [primary, secondary hover]
  description: string;
  fabric: string;
  fit: string;
  care: string;
  colors: ProductColor[];
  sizes: string[];
  inStock: boolean;
  isTrending?: boolean;
  isSignature?: boolean;
}

export interface CartItem {
  id: string; // unique item key: productId-size-color
  product: Product;
  size: string;
  color: ProductColor;
  quantity: number;
}

export interface HeroSlide {
  id: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  image: string;
  categoryLink: ProductCategory;
  badgeText: string;
}

export interface CollectionCard {
  id: string;
  category: ProductCategory;
  title: string;
  subtitle: string;
  image: string;
  itemCount: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: 'truck' | 'refresh' | 'award' | 'lock' | 'scissors';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  productName: string;
  verified: boolean;
}

export interface SocialPost {
  id: string;
  image: string;
  handle: string;
  likes: string;
  caption: string;
  productTag?: string;
}
