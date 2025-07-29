'use client';

import React, { ComponentType } from 'react';

import { WithAuthOptions } from './types';
import { useAuth } from './useAuth';

export const withAuth = <P extends object>(
	WrappedComponent: ComponentType<P>,
	options: WithAuthOptions = {}
) => {
	const {
		redirectTo = '/login',
		unauthorizedComponent = null,
		roles = []
	} = options;

	const AuthenticatedComponent: React.FC<P> = (props) => {
		const { isAuthenticated, isLoading } = useAuth(roles);

		if (isLoading) {
			return <div>Loading...</div>; // Or a spinner component
		}

		if (!isAuthenticated) {
			if (unauthorizedComponent) {
				return <>{unauthorizedComponent}</>;
			}
			if (redirectTo) {
				window.location.href = redirectTo;
			}
			return null;
		}

		return <WrappedComponent {...props} />;
	};

	AuthenticatedComponent.displayName = `withAuth(${
		(
			WrappedComponent.displayName ||
			WrappedComponent.name ||
			'Component'
		).split(' ')[0]
	})`;

	return AuthenticatedComponent;
};
