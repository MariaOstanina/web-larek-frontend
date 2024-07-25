import { Order } from './api';

export type TOrderFormData = Pick<Order, 'payment' | 'address'>
export type TContactsFormData = Pick<Order, 'email' | 'phone'>

export * from './api';
