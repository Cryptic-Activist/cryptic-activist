import { useCallback, useState } from "react";

const useRequest = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState([]);

	const fetcher = useCallback(
		async (
			endpoint: string,
			method: "GET" | "POST" | "PUT" | "DELETE",
			headers: null | object,
			body: null | string
		) => {
			setLoading(true);
			const response = await fetch(endpoint, {
				method,
				mode: "cors",
				cache: "no-cache",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
					...headers,
				},
				body,
			});

			const responseData = await response.json();

			if (
				responseData.errors.length > 0 &&
				responseData.status_code !== 200 &&
				responseData.status_code !== 201
			) {
				setErrors(responseData.errors);
				setData(null);
				setLoading(false);
				return;
			}

			setErrors([]);
			setData(responseData.results);
			setLoading(false);
		},
		[setData, setLoading, setErrors]
	);

	return { fetcher, loading, data, errors };
};

export default useRequest;
