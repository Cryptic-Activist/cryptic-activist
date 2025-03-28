import { ICreate } from "..";

export interface ICreateRequest {
	data: ICreate;
	loading: boolean;
	fetched: boolean;
	errors: string[];
}
