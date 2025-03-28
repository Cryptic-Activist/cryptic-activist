import { FC, FormEvent, useCallback } from 'react';

import Warnings from '@components/Warnings/Warnings';

import { Form, Submit, Button } from '@styles/components/Modals/ModalTemplate';

import ModalTemplate from '../ModalTemplate';

import { useAppDispatch } from 'store';
import { toggleModal } from 'store/reducers/navigationBar';

const ResetPasswordForm: FC = () => {
	const dispatch = useAppDispatch();

	function checkValidForm(): boolean {
		return true;
	}

	function handleSubmitResetPassword(e: FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		if (checkValidForm()) {
		}
	}

	const handleToggleModal = useCallback((): void => {
		dispatch(toggleModal({ modal: 'login' }));
	}, [dispatch]);

	return (
		<ModalTemplate heading="| Reset Password" type="resetPasswordForm" allowClose>
			<Form
				onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmitResetPassword(e)}
			>
				<Submit type="submit">Reset Password</Submit>
				<div>
					<Warnings modal={false} />
					<Button type="button" onClick={() => handleToggleModal()}>
						Already have an account?
					</Button>
				</div>
			</Form>
		</ModalTemplate>
	);
};

export default ResetPasswordForm;
