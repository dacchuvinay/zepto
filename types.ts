export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  weight: string;
  image: string;
  rating?: number;
  ratingCount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}
