import { ReactChild } from "react";

export interface ILoading {
	loading: boolean;
	children: ReactChild;
	size: string;
}
