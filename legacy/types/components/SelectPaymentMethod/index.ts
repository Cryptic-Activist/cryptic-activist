export interface ISelectPaymentMethod {
	handlePaymentMethodCategory: (categoryId: string) => void;
	handlePaymentMethodSelection: (selectionid: string) => void;
}
