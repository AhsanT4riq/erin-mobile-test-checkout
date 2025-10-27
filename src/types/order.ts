export interface OrderSummary {
  itemCount: number;
  itemsTotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface OrderDetails {
  orderNumber: string;
  orderDate: Date;
  orderTotal: number;
  shippingAddress: string;
  estimatedDeliveryDate: string;
}
