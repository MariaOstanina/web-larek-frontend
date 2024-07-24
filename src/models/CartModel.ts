import { IEvents } from '../components/base/events';

interface ICartModel {
	add(id: string): void;
	remove(id: string): void;
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
