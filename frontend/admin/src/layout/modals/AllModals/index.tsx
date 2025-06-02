'use client';

import { LoginForm, RegisterForm } from '@/layout/modals';
import { useAdmin, useNavigationBar } from '@/hooks';

import { isLoggedIn } from '@/utils/checks/admin';

const AllModals = () => {
	const { navigationBar } = useNavigationBar();
	const { admin } = useAdmin();
	const hasLoggedIn = isLoggedIn(admin.data);

	return (
		<>
			{navigationBar.modals.login ? !hasLoggedIn && <LoginForm /> : null}
			{navigationBar.modals.register ? !hasLoggedIn && <RegisterForm /> : null}
		</>
	);
};

export default AllModals;
