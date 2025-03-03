
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  brand: string;
  weight: string;
  inStock?: boolean;
}

export interface StockItem {
  id: number;
  title: string;
  inStock: boolean;
  quantity: number;
}
