export interface IProductItem {
	category: string;
	description: string;
	id: string;
	image: string;
	price: number;
	title: string;
}

export interface IProductResponse {
	items: IProductItem[];
	total: number;
}

export interface IOrder {
	items: string[];
	payment: string;
	total: number;
	address: string;
	email: string;
	phone: string;
}

export interface IOrderRequest extends IOrder {}

export interface IOrderResponse {
	id: string;
	total: number;
}

