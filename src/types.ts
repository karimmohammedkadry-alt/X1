export type Currency = 'EGP' | 'SAR' | 'USD';
export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';

export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  category: 'hoodies' | 'outerwear' | 'tees' | 'bottoms' | 'accessories';
  priceEGP: number;
  priceSAR: number;
  priceUSD: number;
  image: string;
  secondaryImage?: string;
  tagEn?: string;
  tagAr?: string;
  descriptionEn: string;
  descriptionAr: string;
  weightGsm?: number;
  fabricEn: string;
  fabricAr: string;
  fitEn: string;
  fitAr: string;
  hardwareEn?: string;
  hardwareAr?: string;
  washCareEn?: string;
  washCareAr?: string;
  silhouetteEn?: string;
  silhouetteAr?: string;
  availableSizes: string[];
  colors: { nameEn: string; nameAr: string; hex: string }[];
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  commentEn: string;
  commentAr: string;
  dateEn: string;
  dateAr: string;
  verified: boolean;
}

export interface ContactMessage {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
