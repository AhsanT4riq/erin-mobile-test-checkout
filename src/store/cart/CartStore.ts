import { makeAutoObservable } from 'mobx';
import { CartLine } from './CartLine';
import { Product } from '../../types/product';

export class CartStore {
  readonly lines = new Map<string, CartLine>();

  cartId: string | null = null;
  cartCreationError: string | null = null;
  taxRate = 0.1;

  constructor() {
    makeAutoObservable(this);
  }

  get items(): CartLine[] {
    return Array.from(this.lines.values());
  }

  get itemCount(): number {
    return this.items.reduce((sum, l) => sum + l.quantity, 0);
  }

  get subtotal(): number {
    return this.items.reduce((sum, l) => sum + l.lineTotal, 0);
  }

  get tax(): number {
    return +(this.subtotal * this.taxRate).toFixed(2);
  }

  get isEmpty(): boolean {
    return this.itemCount === 0;
  }

  getTotal(shippingCost: number): number {
    return +(this.subtotal + shippingCost + this.tax).toFixed(2);
  }

  setCartId(id: string) {
    this.cartId = id;
  }

  setCartCreationError(error: string | null) {
    this.cartCreationError = error;
  }

  addItem(item: Product) {
    const existing = this.lines.get(item.productId);
    if (existing) {
      existing.increment();
      return;
    }
    this.lines.set(item.productId, new CartLine({ ...item, quantity: 1 }));
  }

  increment(id: string, by: number = 1) {
    const line = this.lines.get(id);
    if (line) line.increment(by);
  }

  removeItem = (id: string) => {
    this.lines.delete(id);
  };

  clearCart() {
    this.cartId = null;
    this.lines.clear();
    this.cartCreationError = null;
  }
}
