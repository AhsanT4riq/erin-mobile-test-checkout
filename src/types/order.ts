import { Address } from './address';

export type OrderDetails = {
  orderNumber: string;
  orderDate: Date;
  totalAmount: number;
  deliveryAddress: Address;
  estimatedDeliveryDate: string;
};
