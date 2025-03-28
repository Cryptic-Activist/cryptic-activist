import { ReactChild, ReactNode } from "react";

export type ListType = "cryptocurrencies" | "fiats" | "paymentMethods";

export interface IListTemplate {
	children: ReactNode;
	heading: string;
	type: ListType;
	allowClose: boolean;
}
