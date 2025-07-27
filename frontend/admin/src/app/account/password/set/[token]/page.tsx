'use client';

import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useURL } from '@/hooks';
import { validatePasswordSetToken } from '@/services/setPassword';

const AdminAccountPasswordSetValidation = () => {
	const { params } = useURL();
	const token = params.token as string;

	const { failureReason, data } = useQuery({
		queryKey: ['resetPasswordToken', params.token],
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

	useEffect(() => {
		console.log({ failureReason, data });
		// if (failureReason) {
		// 	window.location.href = '/?reset-password=0';
		// 	return;
		// }
		// if (data?.ok) {
		// 	window.location.href = '/?reset-password=1&token=' + token;
		// 	return;
		// }
	}, [failureReason, data]);

	return <div></div>;
};

export default AdminAccountPasswordSetValidation;
