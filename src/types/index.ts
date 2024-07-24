import { Order } from './api';

export type TFirsOrderFormData = Pick<Order, 'payment' | 'address'>
export type TSecondOrderFormData = Pick<Order, 'email' | 'phone'>

export * from './api';
