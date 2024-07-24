
export type ProductItem = {
	category: string;
	description: string;
	id: string;
	image: string;
	price: number;
	title: string;
}

export type ProductResponse = {
	items: ProductItem[];
	total: number;
}

export type Order = {
	items: string[];
	payment: string;
	total: number;
	address: string;
	email: string;
	phone: string;
}

export type OrderRequest = Order

export type OrderResponse = {
	id: string;
	total: number;
}

