export type CartItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
};

export type OrderSummary = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};
