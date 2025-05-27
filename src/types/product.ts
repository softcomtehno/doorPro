export interface Product {
  id: number;
  name: string;
  type: 'interior' | 'entrance' | 'sliding' | 'glass';
  price: number;
  oldPrice?: number;
  inStock: boolean;
  images: string[];
  material: string;
  color: string;
  description: string;
  features: {
    width: number;
    height: number;
    thickness: number;
    soundproofing?: number;
    heatInsulation?: number;
    lockType?: string;
  };
  options?: {
    colors?: string[];
    glasses?: string[];
    handles?: {
      name: string;
      price: number;
    }[];
  };
  isNew?: boolean;
  isPopular?: boolean;
  isOnSale?: boolean;
  rating: number;
  reviewCount: number;
}