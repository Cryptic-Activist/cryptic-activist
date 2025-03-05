import { FC, useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import useWarnings from '@hooks/useWarnings';
import useCheckForm from '@hooks/useCheckForm';

import {
	Button,
	Required,
	SplitDiv,
	Submit,
	Form,
	Input,
	InputsContainer,
	InputLabel,
	InputRequiredLabelContainer,
	DisabledInput,
} from '@styles/components/Modals/ModalTemplate';

import ModalTemplate from '../ModalTemplate';
import Warnings from '@components/Warnings/Warnings';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { toggleModal } from '@store/reducers/navigationBar';
import { setPrivateKeys } from 'store/reducers/privateKeys';

import useNewUser from '@hooks/useNewUser';
import { RegisterUserPayload } from './types';
import { parseInstancePath } from '@utils/string/backendResponse';

const RegisterForm: FC = () => {
	const dispatch = useAppDispatch();

	const { add, reset } = useWarnings();
	const { firstName, lastName, username, registerUser } = useNewUser({ reset });
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors, isSubmitted },
	} = useForm();
	const { checkValidForm, passwordMustMatch } = useCheckForm();

	const [success, setSuccess] = useState<boolean>(false);

	useEffect(() => {
		setValue('names.firstName', firstName);
		setValue('names.lastName', lastName);
		setValue('username', username);
	}, [firstName, lastName, username]);

	const onSubmit = async (data: RegisterUserPayload) => {
		const pass = getValues('password');
		const pass2 = getValues('password2');

		if (checkValidForm(errors) && passwordMustMatch(pass, pass2)) {
			const registered = await registerUser({
				names: {
					firstName: data.names.firstName,
					lastName: data.names.lastName,
				},
				username: data.username,
				password: data.password,
				password2: data.password2,
			});

			if (registered.status_code === 201) {
				dispatch(setPrivateKeys({ privateKeys: registered.results.private_keys }));

				setSuccess(true);

				setTimeout(() => {
					dispatch(toggleModal({ modal: 'privateKeys' }));
				}, 5000);
			} else {
				registered.errors.forEach((error) => {
					const parsedInstancePath = parseInstancePath(error.instancePath);
					const msg = [parsedInstancePath, error.message].join(': ');
					add(msg);
				});
			}
		}
	};

	return (
		<ModalTemplate
			heading="| Register"
			type="registerForm"
			success={success}
			successMessage="The next step is crucial. Make sure to follow the next
				instructions since it wont able available anymore."
			allowClose
		>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<SplitDiv>
					<InputsContainer>
						<InputRequiredLabelContainer>
							<InputLabel htmlFor="names.firstName">First Name</InputLabel>
							<Required>*</Required>
						</InputRequiredLabelContainer>
						<DisabledInput id="names.firstName">{firstName}</DisabledInput>
					</InputsContainer>
					<InputsContainer>
						<InputRequiredLabelContainer>
							<InputLabel htmlFor="names.lastName">Last Name</InputLabel>
							<Required>*</Required>
						</InputRequiredLabelContainer>
						<DisabledInput id="names.lastName">{lastName}</DisabledInput>
					</InputsContainer>
				</SplitDiv>

				<InputsContainer>
					<InputRequiredLabelContainer>
						<InputLabel htmlFor="username">Username</InputLabel>
						<Required>*</Required>
					</InputRequiredLabelContainer>
					<DisabledInput id="username">{username}</DisabledInput>
				</InputsContainer>

				<InputsContainer>
					<InputRequiredLabelContainer>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Required>*</Required>
					</InputRequiredLabelContainer>
					<Input {...register('password')} type="password" id="password" />
				</InputsContainer>

				<InputsContainer>
					<InputRequiredLabelContainer>
						<InputLabel htmlFor="password2">Confirm Password</InputLabel>
						<Required>*</Required>
					</InputRequiredLabelContainer>
					<Input {...register('password2')} type="password" id="password2" />
				</InputsContainer>

				<Submit id="registerSubmitButton" type="submit">
					Register
				</Submit>

				<div>
					<Warnings modal={false} />
					<Button
						type="button"
						onClick={() => dispatch(toggleModal({ modal: 'resetPassword' }))}
					>
						Reset Password
					</Button>
					<Button
						type="button"
						onClick={() => dispatch(toggleModal({ modal: 'login' }))}
					>
						Already have an account?
					</Button>
				</div>
			</Form>
		</ModalTemplate>
	);
};

export default RegisterForm;
