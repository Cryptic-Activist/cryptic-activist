export type PaymentMethodCategoryType = {
	id: string;
	name: string;
};

export type PaymentMethodType = {
	id: string;
	name: string;
	paymentMethodCategory?: PaymentMethodCategoryType;
};
