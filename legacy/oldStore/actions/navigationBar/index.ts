import { ModalType } from 'types/components/Modals/ModalTemplate';

export function toggleModal(modal: ModalType): {
	type: 'TOGGLE_MODAL';
	payload: { modal: string };
} {
	return {
		type: 'TOGGLE_MODAL',
		payload: {
			modal,
		},
	};
}

export function closeAllModals(): { type: 'CLOSE_ALL_MODALS' } {
	return {
		type: 'CLOSE_ALL_MODALS',
	};
}

export function toggleLoading(): { type: 'TOGGLE_LOADINNG' } {
	return {
		type: 'TOGGLE_LOADINNG',
	};
}
