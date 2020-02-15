import React from 'react';
import Link from 'next/link'
import { useDispatch } from 'react-redux';

import {
  Wrapper,
  WrapperArrow,
  ProfileDiv,
  Profile,
  MenuOpitionUl,
  MenuOpitionLi,
  LinkTo,
} from '../../../../styles/Components/UI/Navbar/UserMenu/user-menu.styled-components';

import * as UserActions from '../../../../store/actions/user/user';

const UserMenu = (props) => {
  const {
    displayName,
    CloseUserMenuOnClick,
    isAdmin,
  } = props;
  console.log('isAdmin:', isAdmin);

  const dispatch = useDispatch();

  const handleCloseOnClick = () => {
    const handleClick = CloseUserMenuOnClick;
    handleClick();
  };

  const handleLogout = async () => {
    dispatch(UserActions.logoutUser());
  };

  let Admin;

  if (isAdmin) {
    Admin = (
      <>
        <LinkTo
          to="/admin"
          onClick={handleCloseOnClick}
        >
          Admin
        </LinkTo>
      </>
    );
  } else {
    Admin = (
      <>
        <LinkTo
          to="/admin"
          onClick={handleCloseOnClick}
        >
          Contributor
        </LinkTo>
      </>
    );
  }

  return (
    <>
      <WrapperArrow />
      <Wrapper>
        <ProfileDiv>
          <Link href="/profile">
            <Profile
              onClick={handleCloseOnClick}
            >
              <p>
            Signed in as
                <br />
                <strong>
                  {displayName}
                </strong>
              </p>
            </Profile>
          </Link>
        </ProfileDiv>
        <hr />
        <MenuOpitionUl>
          <MenuOpitionLi>
            {Admin}
          </MenuOpitionLi>
          <MenuOpitionLi>
            <LinkTo
              to="/my-courses"
              onClick={handleCloseOnClick}
            >
              My Courses
            </LinkTo>
          </MenuOpitionLi>
          <MenuOpitionLi>
            <LinkTo
              to="/"
              onClick={handleLogout}
              className="last"
            >
              Sign out
            </LinkTo>
          </MenuOpitionLi>
        </MenuOpitionUl>
      </Wrapper>
    </>
  );
};

export default UserMenu;
