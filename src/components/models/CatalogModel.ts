import { ProductItem } from '../../types';
import { IEvents } from '../base/events';

interface ICatalogModel {
	items: ProductItem[];
	setItems(items: ProductItem[]): void;
	getItemsByIds(ids: string[]): void;
}

export class CatalogModel implements ICatalogModel {
  constructor(protected events: IEvents) {
    this.events = events;
  }

  items: ProductItem[] = [];

  setItems(items: ProductItem[]): void {
    this.items = items;
    this.events.emit('catalog-change', { items: this.items });
  }

  getItemsByIds(ids: string[]) {
    return this.items.filter(el => ids.includes(el.id));
  }
}
