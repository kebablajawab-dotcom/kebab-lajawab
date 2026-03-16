export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'STARTER' | 'KEBAB' | 'RICE/BIRYANI' | 'ROTI/BREAD' | 'BEVERAGES' | 'GRAVY CHICKEN' | 'GRAVY MUTTON' | 'ROLL';
  isVeg: boolean;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
}

export interface DetailedMenuItem {
  name: string;
  quarterPrice?: number | string;
  halfPrice?: number | string;
  fullPrice?: number | string;
  price?: number | string; // For items with single price
  isHeader?: boolean;
  image?: string; // Base64 or URL
  subHeaders?: {
    quarter?: string;
    half?: string;
    full?: string;
  };
}

export interface CategoryMenuData {
  category: string;
  items: DetailedMenuItem[];
  headers?: {
    quarter?: string;
    half?: string;
    full?: string;
    left?: string; // Legacy support
    right?: string; // Legacy support
  };
}
