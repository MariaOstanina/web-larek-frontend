import { IEvents } from '../base/events';

interface ICartModel {
	add(id: string): void;
	remove(id: string): void;
  has(id: string): boolean;
	reset(): void;
	getItems(): string[]
}

export class CartModel implements ICartModel {
  constructor(protected events: IEvents) {
  }

  protected items: string[] = [];

  add(id: string): void {
    if (this.items.includes(id)) return;
    this.items.push(id); 
    this.cartDataChange();
  }

  remove(id: string) {
    this.items = this.items.filter(el => el !== id);
    this.cartDataChange();
  }

  has(id: string) {
    return this.items.includes(id);
  }

  reset() {
    this.items = [];
    this.cartDataChange();
  }

  getItems(): string[] {
    return this.items;
  }

  protected cartDataChange() {
    this.events.emit('cart-change', { items: this.items });
  }
}
