import { Product } from './product';

export type CartItem = Product & {
  quantity: number;
};

export type OrderSummary = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};
