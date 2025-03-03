import { closeAllModals } from "oldStore/actions/navigationBar";
import { useCallback } from "react";
import useDispatcher from "./useDispatcher";

const useEsc = () => {
	const { dispatcher } = useDispatcher();

	const closeOnEsc = useCallback(
		(event) => {
			if (event.keyCode === 27) {
				dispatcher(closeAllModals());
			}
		},
		[dispatcher]
	);

	return { closeOnEsc };
};

export default useEsc;
