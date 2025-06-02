import { FC, useEffect, useState } from 'react';
import { Input, Submit } from '@/components/Form';

import { ModalTemplate } from '@/layout/modals';
import template from '@/layout/modals/ModalTemplate/styles.module.scss';
import { useForm } from 'react-hook-form';
import { useNewAdmin } from '@/hooks';

const RegisterForm: FC = () => {
	const { registerAdmin, firstName, lastName, username } = useNewAdmin();
	const { register, handleSubmit, setValue } = useForm();

	const [success, setSuccess] = useState(false);

	useEffect(() => {
		setValue('names.firstName', firstName);
		setValue('names.lastName', lastName);
		setValue('username', username);
	}, [firstName, lastName, username]);

	const onSubmit = async (data: any) => {
		const registered = await registerAdmin(data);

		if (registered) {
			setSuccess(true);
		}
	};

	return (
		<ModalTemplate
			heading="| Register"
			type="registerForm"
			success={success}
			successMessage="Administrator user was successfully created."
			allowClose
		>
			<form onSubmit={handleSubmit(onSubmit)} className={template.form}>
				<div className={template.splitDiv}>
					<Input
						id="names.firstName"
						name="names.firstName"
						register={register}
						label="First Name"
						required
					/>
					<Input
						id="names.lastName"
						name="names.lastName"
						register={register}
						label="Last Name"
						required
					/>
				</div>
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
				<Input
					id="password2"
					name="password2"
					register={register}
					label="Confirm Password"
					required
					type="password"
				/>

				<Submit type="submit">Register</Submit>

				{/* <div>
          <Warnings modal={false} />
          <Button
            type="button"
            onClick={() => dispatch(toggleModal({ modal: "resetPassword" }))}
          >
            Reset Password
          </Button>
          <Button
            type="button"
            onClick={() => dispatch(toggleModal({ modal: "login" }))}
          >
            Already have an account?
          </Button>
        </div> */}
			</form>
		</ModalTemplate>
	);
};

export default RegisterForm;
