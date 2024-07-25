import { Order } from '../../types';

const INITIAL_ORDER: Order = {
  items: [],
  payment: 'card',
  total: 0,
  address: '',
  email: '',
  phone: '',
};

interface IOrderModel {
	change(data: Partial<Order>): void;
	reset(): void;
	getOrder(): Partial<Order>;
}

export class OrderModel implements IOrderModel {
  protected order: Partial<Order> = INITIAL_ORDER;

  change(data: Partial<Order>): void {
    this.order = { ...this.order, ...data };
  }

  reset() {
    this.order = INITIAL_ORDER;
  }

  getOrder() {
    return this.order;
  }
}
