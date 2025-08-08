'use client';

import {
	onSubmitAdminSetPassword,
	validatePasswordSetToken
} from '@/services/setPassword';
import { useMutation, useQuery } from '@tanstack/react-query';

import type { AdminSetPasswordParams } from '@/services/setPassword/types';
import type { SetPasswordValues } from './types';
import { setPasswordResolver } from './zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useURL from '../useURL';

const useSetPassword = () => {
	const { params } = useURL();
	const token = params.token as string;

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset
	} = useForm<SetPasswordValues>({
		resolver: setPasswordResolver,
		defaultValues: {
			password: '',
			confirmPassword: ''
		}
	});

	const setPasswordtokenQuery = useQuery({
		queryKey: ['setPasswordToken', params.token],
		queryFn: async () => {
			if (token) {
				const verified = await validatePasswordSetToken(token);
				return verified;
			}
		},
		retry: 2,
		enabled: !!token,
		refetchOnMount: false
	});

	const setPasswordtokenMutation = useMutation({
		mutationKey: ['setPassword'],
		mutationFn: async (params: AdminSetPasswordParams) => {
			if (token) {
				const verified = await onSubmitAdminSetPassword(params);
				return verified;
			}
		}
	});

	const onSubmit = async (data: SetPasswordValues) => {
		// Send data to your API or handle logic here
		console.log('Set password data:', data);
		const submitted = await setPasswordtokenMutation.mutateAsync({
			password: data.password,
			passwordConfirm: data.confirmPassword,
			token
		});

		console.log({ submitted });
	};

	useEffect(() => {
		if (setPasswordtokenQuery.failureReason) {
			// window.location.href = '/?reset-password=0';
			return;
		}
		if (setPasswordtokenQuery.data?.ok) {
			// window.location.href = '/?reset-password=1&token=' + token;
			return;
		}
	}, [setPasswordtokenQuery.failureReason, setPasswordtokenQuery.data]);

	return {
		form: {
			register,
			handleSubmit,
			errors,
			isSubmitting,
			reset
		},
		setPasswordtokenQuery,
		setPasswordtokenMutation,
		onSubmit
	};
};

export default useSetPassword;
