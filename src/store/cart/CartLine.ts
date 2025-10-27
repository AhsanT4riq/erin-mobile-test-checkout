import { makeAutoObservable } from 'mobx';
import { CartItem } from '../../types/cart';

export class CartLine {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly description: string;
  quantity: number;

  constructor(item: CartItem) {
    this.id = item.id;
    this.name = item.name;
    this.price = item.price;
    this.description = item.description;
    this.quantity = Math.max(0, Math.floor(item.quantity || 0));

    makeAutoObservable(this);
  }

  get lineTotal(): number {
    return this.price * this.quantity;
  }

  increment(by: number = 1) {
    this.quantity += Math.max(1, Math.floor(by));
  }

  decrement(by: number = 1) {
    this.quantity = Math.max(0, this.quantity - Math.max(1, Math.floor(by)));
  }

  toJSON(): CartItem {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      description: this.description,
      quantity: this.quantity,
    };
  }
}
