import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link'

import _ from 'lodash';

import {
  FaBars,
  FaSearch,
} from 'react-icons/fa';

import {
  NavBar,
  LinkA,
  Brand,
  ToggleButton,
  SignUp,
  ButtonProfile,
  Ul,
} from '../../../styles/Components/UI/Navbar/navbar.styled-components'

import SideDrawer from './SideDrawer/SideDrawer';
import UserMenu from './UserMenu/UserMenu';

import Login from '../LoginForm/Login';

import * as UserActions from '../../../store/actions/user/user';
import * as NavbarActions from '../../../store/actions/navbar';


const Navbar = () => {
  const [userMenuState, setUserMenuState] = useState({
    showUserMenu: false,
  });
  const [searchFormState, setSearchFormState] = useState({
    showSearchForm: false,
  });
  const [loginForm, setLoginForm] = useState(false);

  const user = useSelector((state) => state.user);
  const { showSideDrawer } = useSelector((state) => state.navbar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserActions.loginUser());
  }, []);

  let UserDiv;
  let UserMenuDiv;
  let SearchFormDiv;

  const handleUserMenu = () => {
    if (userMenuState.showUserMenu) {
      setUserMenuState({
        showUserMenu: false,
      });
    } else {
      setUserMenuState({
        showUserMenu: true,
      });
    }
  };

  const handleCloseSideDrawer = () => {
    const sideDrawer = window.document.body.children[1].children[1];
    const sideBackgroundDrawer = window.document.body.children[1].children[0];
    if (showSideDrawer) {
      sideDrawer.classList.remove('showSideDrawer');
      sideBackgroundDrawer.classList.remove('showBackgroundSideDrawer');
      sideDrawer.classList.add('hideSideDrawer');
      sideBackgroundDrawer.classList.add('hideBackgroundSideDrawer');
      dispatch(NavbarActions.closeSideDrawer());
    }
  };

  const handleSideDrawer = () => {
    console.log(window.document.body.children[0].children[0].children[1])
    const sideDrawer = window.document.body.children[0].children[0].children[1];
    const sideBackgroundDrawer = window.document.body.children[0].children[0].children[0];
    if (!showSideDrawer) {
      sideDrawer.classList.remove('hideSideDrawer');
      sideBackgroundDrawer.classList.remove('hideBackgroundSideDrawer');
      sideDrawer.classList.add('showSideDrawer');
      sideBackgroundDrawer.classList.add('showBackgroundSideDrawer');
      dispatch(NavbarActions.openSideDrawer());
    } else {
      sideDrawer.classList.remove('showSideDrawer');
      sideBackgroundDrawer.classList.remove('showBackgroundSideDrawer');
      sideDrawer.classList.add('hideSideDrawer');
      sideBackgroundDrawer.classList.add('hideBackgroundSideDrawer');
      dispatch(NavbarActions.closeSideDrawer());
    }
  };

  const handleSearchForm = () => {
    handleCloseSideDrawer();
    if (searchFormState.showSearchForm) {
      setSearchFormState({
        showSearchForm: false,
      });
    } else {
      setSearchFormState({
        showSearchForm: true,
      });
    }
  };

  const closeUserMenuOnClick = () => {
    setUserMenuState({
      showUserMenu: false,
    });
  };

  const closeSearchFormOnClick = () => {
    setSearchFormState({
      showSearchForm: false,
    });
  };

  const onScroll = () => {
    if (window.scrollY > 0) {
      setUserMenuState({
        showUserMenu: false,
      });
    }
  };

  const toggleLoginForm = () => {
    setLoginForm(!loginForm);
  };

  if (!_.isEmpty(user.data)) {
    const {
      profileImage,
      name,
      isAdmin,
    } = user.data;
    UserDiv = (
      <>
        <ButtonProfile
          onClick={handleUserMenu}
        >
          <img
            src={profileImage.url}
            alt="Profile Placeholder"
            style={{
              width: '35px',
              height: '35px',
              borderRadius: '50px',
            }}
          />
        </ButtonProfile>
      </>
    );
    if (userMenuState.showUserMenu) {
      console.log('isAdmin navbar:', isAdmin);
      UserMenuDiv = (
        <>
          <div className="row">
            <div className="col-12">
              <UserMenu
                displayName={name}
                CloseUserMenuOnClick={closeUserMenuOnClick}
                isAdmin={isAdmin}
              />
            </div>
          </div>
        </>
      );
    } else {
      UserMenuDiv = (
        <>
        </>
      );
    }
    if (searchFormState.showSearchForm) {
      SearchFormDiv = (
        <>
          <SearchForm SearchFormOnClick={closeSearchFormOnClick} />
        </>
      );
    } else {
      SearchFormDiv = (
        <>
        </>
      );
    }
  } else {
    UserDiv = (
      <>
        <SignUp
          // className="nav-link"
          onClick={() => {
            document
              .querySelector('#navbarResponsive')
              .classList.remove('show');
            toggleLoginForm();
          }}
        >
          Login
        </SignUp>
      </>
    );
    UserMenuDiv = (
      <>
      </>
    );
    if (searchFormState.showSearchForm) {
      SearchFormDiv = (
        <>
          <SearchForm SearchFormOnClick={closeSearchFormOnClick} />
        </>
      );
    } else {
      SearchFormDiv = (
        <>
        </>
      );
    }
  }


  return (
    <>
      <SideDrawer
        ShowSideDrawer={showSideDrawer}
        HandleSideDrawer={handleSideDrawer}
        UserData={user.data}
        Toggle={toggleLoginForm}
        style={{
          top: '30px',
        }}
      />
      <NavBar
        className="navbar navbar-expand-md"
        onScroll={onScroll}
      >
      <div className="container">
        <ToggleButton
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          onClick={handleSideDrawer}
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </ToggleButton>
        <Link href="/">
          <Brand className="navbar-brand">
            Cryptic Activist
          </Brand>
        </Link>
        <ToggleButton
          className="navbar-toggler"
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaSearch
            onClick={handleSearchForm}
          />
          {SearchFormDiv}
        </ToggleButton>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <Ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <LinkA
                className="nav-link"
                href="http://blog.crypticactivist.com/"
                target="_blank"
                onClick={() => {
                  document
                    .querySelector('#navbarResponsive')
                    .classList.remove('show');
                }}
                target="_blank"
              >
                Blog
              </LinkA>
            </li>
            <li className="nav-item">
              <LinkA
                className="nav-link"
                href="http://podcast.crypticactivist.com/"
                target="_blank"
                onClick={() => {
                  document
                    .querySelector('#navbarResponsive')
                    .classList.remove('show');
                }}
              >
                    Podcasts
              </LinkA>
            </li>
            <li className="nav-item">
              <LinkA
                className="nav-link"
                href="http://station.crypticactivist.com/"
                target="_blank"
                onClick={() => {
                  document
                    .querySelector('#navbarResponsive')
                    .classList.remove('show');
                }}
              >
                Station
              </LinkA>
            </li>
            <li className="nav-item">
              <LinkA
                className="nav-link"
                href="http://exchange.crypticactivist.com/"
                target="_blank"
                onClick={() => {
                  document
                    .querySelector('#navbarResponsive')
                    .classList.remove('show');
                }}
              >
                Exchange
              </LinkA>
            </li>
            <li className="nav-item">
              <LinkA
                className="nav-link"
                href="http://meetup.crypticactivist.com/"
                target="_blank"
                onClick={() => {
                  document
                    .querySelector('#navbarResponsive')
                    .classList.remove('show');
                }}
              >
                Meetup
              </LinkA>
            </li>
            <li className="nav-item">
              <LinkA
                className="nav-link"
                href="http://forum.crypticactivist.com/"
                target="_blank"
                onClick={() => {
                  document
                    .querySelector('#navbarResponsive')
                    .classList.remove('show');
                }}
              >
                Forum
              </LinkA>
            </li>
            <li className="profile-li">
              {UserDiv}
            </li>
          </Ul>
          {UserMenuDiv}
        </div>
      </div>
    </NavBar>
    {loginForm && (
      <Login Toggle={toggleLoginForm} />
    )}
  </>
  )
}

export default Navbar
