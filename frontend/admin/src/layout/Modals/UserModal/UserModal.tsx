import { FC } from "react";

import {
  DropDownContainer,
  DropDownList,
  DropDownListItem,
  DropDownListItemButton,
} from "@styles/components/Modals/ModalTemplate";

import { resetNavigationBar } from "@store/reducers/navigationBar";
import { logout } from "@store/reducers/user";

import { useAppDispatch, useAppSelector } from "@store/index";

const UserModal: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.user);

  const handleLogoutUser = () => {
    // emit(GO_OFFLINE, { user: { id: user.data.id } });
    dispatch(logout());
    dispatch(resetNavigationBar("tooltips"));
  };

  return (
    <DropDownContainer>
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
