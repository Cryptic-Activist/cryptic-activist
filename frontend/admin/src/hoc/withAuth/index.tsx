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
		roles
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

// 🔓 Logout helpers
export const logoutUser = (): void => {
	document.cookie.split(';').forEach((cookie) => {
		const name = cookie.split('=')[0].trim();
		if (name.includes('auth') || name.includes('token')) {
			document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
		}
	});

	localStorage.setItem('logout', 'true');
	window.location.href = '/login';
};

export const clearAuthCookie = (cookieName: string): void => {
	document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
	localStorage.setItem('logout', 'true');
};
