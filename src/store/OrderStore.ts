import { makeAutoObservable } from 'mobx';

import { Order } from '../graphql/types';

export class OrderStore {
  order: Order | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get hasOrder(): boolean {
    return !!this.order;
  }

  get orderNumber(): string {
    return this.order?.orderNumber || '';
  }

  get orderTotal(): number {
    return this.order?.total || 0;
  }

  get estimatedDeliveryStart(): string {
    return this.order?.estimatedDeliveryStart || '';
  }

  get estimatedDeliveryEnd(): string {
    return this.order?.estimatedDeliveryEnd || '';
  }

  get shippingAddress(): string {
    const parts = [
      this.order?.shippingAddress?.streetAddress,
      this.order?.shippingAddress?.apartmentSuite,
      this.order?.shippingAddress?.city,
      this.order?.shippingAddress?.stateProvince,
      this.order?.shippingAddress?.zipPostalCode,
      this.order?.shippingAddress?.country,
    ].filter(Boolean);
    return parts.join(', ');
  }

  get userInfo() {
    return this.order?.user;
  }

  get orderItems() {
    return this.order?.items || [];
  }

  get orderDate(): Date {
    if (!this.order?.createdAt) return new Date();
    return new Date(this.order.createdAt);
  }

  setOrder(order: Order) {
    this.order = order;
  }

  clear() {
    this.order = null;
  }
}
