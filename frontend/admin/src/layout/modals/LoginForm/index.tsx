import { useCallback, type FC } from 'react';
import { useForm } from 'react-hook-form';

import ModalTemplate from '@/layout/modals/ModalTemplate';

import { Input, Submit } from '@/components/form';
import { useAdmin, useNavigationBar } from '@/hooks';

import Errors from '@/components/form/Errors';
import FormButton from '@/components/form/FormButton';

import template from '@/layout/modals/ModalTemplate/styles.module.scss';

const LoginForm: FC = () => {
	const { loginAdmin } = useAdmin();
	const { handleCloseModal } = useNavigationBar();

	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors
	} = useForm();

	const checkValidForm = useCallback((): boolean => {
		if (Object.entries(errors).length > 0) {
			return false;
		}

		return true;
	}, [errors]);

	const onSubmit = useCallback(
		async (data: any) => {
			const handleLogin = async (data: any) => {
				const loggedIn = await loginAdmin(data);
				return loggedIn;
			};
			clearErrors();
			if (checkValidForm()) {
				const loggedIn = await handleLogin(data);

				if (loggedIn) {
					handleCloseModal();
				}
			}
		},
		[checkValidForm, clearErrors, loginAdmin]
	);

	return (
		<ModalTemplate heading="| Login" type="loginForm" allowClose>
			<form onSubmit={handleSubmit(onSubmit)} className={template.form}>
				<Input
					id="username"
					name="username"
					register={register}
					label="Username"
					required
				/>
				<Input
					id="password"
					name="password"
					register={register}
					label="Password"
					required
					type="password"
				/>

				<Submit type="submit">Login</Submit>

				<Errors errors={[]} />

				<FormButton
					modal={{ modal: 'register' }}
					label="Don't have an account yet?"
				/>

				{/* <div>
          <Warnings modal={false} />
          <Button
            type="button"
            onClick={() => handleLoginButtons("resetPassword")}
          >
            Reset Password
          </Button>
          <Button
            id="loginRegisterAccount"
            type="button"
            onClick={() => handleLoginButtons("register")}
          >
            Don't have an account yet?
          </Button>
        </div> */}
			</form>
		</ModalTemplate>
	);
};

export default LoginForm;
