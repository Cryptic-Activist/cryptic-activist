import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useDispatcher = () => {
	const dispatch = useDispatch();

	const dispatcher = useCallback(
		(action: any): void => {
			dispatch(action);
		},
		[dispatch]
	);

	return { dispatcher };
};

export default useDispatcher;
