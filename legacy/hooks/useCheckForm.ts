import { useCallback } from "react";

import useDispatcher from "./useDispatcher";
import useWarnings from "./useWarnings";

const useCheckForm = () => {
	const { dispatcher } = useDispatcher();
	const { add, reset } = useWarnings();

	const checkValidForm = useCallback(
		(errors) => {
			if (Object.entries(errors).length > 0) {
				add(errors[0]);
				return false;
			}
			reset();
			return true;
		},
		[dispatcher, add, reset]
	);

	const passwordMustMatch = useCallback(
		(password: string, password2: string): boolean => {
			if (password === password2) {
				reset();
				return true;
			}
			add("Both passwords must match");
			return false;
		},
		[reset, add]
	);

	return {
		checkValidForm,
		passwordMustMatch,
	};
};

export default useCheckForm;
