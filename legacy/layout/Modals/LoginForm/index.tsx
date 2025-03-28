import ModalTemplate from 'layout/Modals/ModalTemplate';
import { FC, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';
import { toggleModal } from 'store/reducers/navigationBar';
import { Modal } from 'store/reducers/navigationBar/types';

import Warnings from '@components/Warnings/Warnings';
import useWarnings from '@hooks/useWarnings';
import { loginUser } from '@store/thunks/user';
import {
	InputLabel,
	InputRequiredLabelContainer,
} from '@styles/components/Input';
import {
	Button,
	Form,
	Input,
	InputsContainer,
	Required,
	Submit,
} from '@styles/components/Modals/ModalTemplate';

const LoginForm: FC = () => {
	const { user } = useAppSelector((state) => state);

	const { add, reset } = useWarnings();
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm();

	const dispatch = useAppDispatch();

	useEffect(() => {
		reset();
	}, []);

	useEffect(() => {
		if (user.errors.length > 0) {
			add(user.errors[0]);
		} else {
			reset();
		}
	}, [user.errors]);

	const checkValidForm = useCallback((): boolean => {
		if (Object.entries(errors).length > 0) {
			// add(errors[0]);
			return false;
		}
		reset();
		return true;
	}, [dispatch, errors]);

	const onSubmit = useCallback(
		(data): void => {
			clearErrors();
			if (checkValidForm()) {
				dispatch(loginUser(data));
			}
		},
		[dispatch, clearErrors]
	);

	const handleLoginButtons = (modal: Modal) => {
		dispatch(toggleModal({ modal }));
	};

	return (
		<ModalTemplate
			heading="| Login"
			type="loginForm"
			allowClose
			dataTestId="login-form"
		>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<InputsContainer>
					<InputRequiredLabelContainer>
						<InputLabel htmlFor="username">Username</InputLabel>
						<Required>*</Required>
					</InputRequiredLabelContainer>
					<Input
						{...register('username')}
						type="username"
						data-testid="login-form-input-username"
					/>
				</InputsContainer>

				<InputsContainer>
					<InputRequiredLabelContainer>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Required>*</Required>
					</InputRequiredLabelContainer>
					<Input
						{...register('password')}
						type="password"
						data-testid="login-form-input-password"
					/>
				</InputsContainer>

				<Submit type="submit" id="loginSubmitButton">
					Login
				</Submit>
				<div>
					<Warnings modal={false} />
					<Button type="button" onClick={() => handleLoginButtons('resetPassword')}>
						Reset Password
					</Button>
					<Button
						id="loginRegisterAccount"
						type="button"
						onClick={() => handleLoginButtons('register')}
					>
						Don't have an account yet?
					</Button>
					<Button
						id="loginVerifyAccountButton"
						type="button"
						onClick={() => handleLoginButtons('verifyAccount')}
					>
						Verify an account
					</Button>
				</div>
			</Form>
		</ModalTemplate>
	);
};

export default LoginForm;
