import { useCallback, useState } from "react";

import {
	Wrapper,
	Heading,
	Category,
	CategoryH2,
} from "@styles/components/Search/Offers/Filters/Filters";

import Filter from "./Filter/Filter";

const Filters = () => {
	const [hostName, setHostName] = useState<string>("locahost:5000");
	const [params, setParams] = useState<string>("");

	const insertIntoSearchFilterString = (
		type: "payment-method" | "tags" | "trade-limit",
		string: string,
		checkedBox: boolean
	): void => {
		const baseURL = hostName;

		const url = new URL(baseURL);
		const auxParams = url.searchParams;

		// auxParams.append('q', 'This is seach query'.toLowerCase());
		// auxParams.append('payment-method', 'Bank Transfer');
		// auxParams.append('tags', 'cash only');
		// auxParams.delete('payment-method');

		if (type === "payment-method") {
			if (checkedBox) {
				auxParams.delete(type.toLowerCase());
			} else {
				auxParams.append(type.toLowerCase(), string.toLowerCase());
			}
		} else if (type === "tags") {
			console.log(type);
		} else if (type === "trade-limit") {
			console.log(type);
		}

		console.log(auxParams.toString());

		// console.log(url.toString());
		// setParams(auxParams.toString);
	};

	return (
		<Wrapper>
			<Heading>Filter Offers</Heading>
			<Category>
				<CategoryH2>Popular Payment Method</CategoryH2>
				<Filter
					statement="Bank Transfer"
					type="payment-method"
					insertIntoSearchFilterString={insertIntoSearchFilterString}
				/>
				<Filter
					statement="Cash Deposit to Bank"
					type="payment-method"
					insertIntoSearchFilterString={insertIntoSearchFilterString}
				/>
				<Filter
					statement="Cash in Person"
					type="payment-method"
					insertIntoSearchFilterString={insertIntoSearchFilterString}
				/>
				<Filter
					statement="Paypal"
					type="payment-method"
					insertIntoSearchFilterString={insertIntoSearchFilterString}
				/>
			</Category>
			<Category>
				<CategoryH2>Offer tag</CategoryH2>
				<Filter
					statement="cash in person"
					type="tags"
					insertIntoSearchFilterString={insertIntoSearchFilterString}
				/>
				<Filter
					statement="cash only"
					type="tags"
					insertIntoSearchFilterString={insertIntoSearchFilterString}
				/>
				<Filter
					statement="no receipt required"
					type="tags"
					insertIntoSearchFilterString={insertIntoSearchFilterString}
				/>
				<Filter
					statement="same bank only"
					type="tags"
					insertIntoSearchFilterString={insertIntoSearchFilterString}
				/>
			</Category>
			<Category>
				<CategoryH2>Trade limits</CategoryH2>
				<Filter
					statement="Bank Transfer"
					type="payment-method"
					insertIntoSearchFilterString={insertIntoSearchFilterString}
				/>
			</Category>
		</Wrapper>
	);
};

export default Filters;
