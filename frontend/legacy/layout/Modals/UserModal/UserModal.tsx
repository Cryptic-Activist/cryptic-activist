import { FC } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

import {
	DropDownContainer,
	DropDownList,
	DropDownListItemButton,
	DropDownListItem,
} from '@styles/components/Modals/ModalTemplate';

import { logout } from '@store/reducers/user';
import { resetNavigationBar } from '@store/reducers/navigationBar';

import { emit } from '@utils/socketio';

import { useAppDispatch, useAppSelector } from '@store/index';

const UserModal: FC = () => {
	const dispatch = useAppDispatch();
	const { data } = useAppSelector((state) => state.user);

	const handleLogoutUser = () => {
		// emit(GO_OFFLINE, { user: { id: user.data.id } });
		dispatch(logout());
		dispatch(resetNavigationBar('tooltips'));
	};

	return (
		<DropDownContainer onBlur={() => console.log('on Blur')}>
			<DropDownList>
				<DropDownListItem href="/account" passHref>
					Account
				</DropDownListItem>
				<DropDownListItem href="/account/messages" passHref>
					Messages
				</DropDownListItem>
				<DropDownListItemButton onClick={handleLogoutUser}>
					Sign out
				</DropDownListItemButton>
			</DropDownList>
		</DropDownContainer>
	);
};

export default UserModal;
