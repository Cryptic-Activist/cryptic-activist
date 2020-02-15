import React, { useState, useContext } from 'react';
import _ from 'lodash';

import {
  LoginForm,
  Header,
  LoginButtons,
  Background,
} from '../../../styles/Components/UI/LoginForm/login.styled-components';


import LoginButton from './ThirdPartyLoginButton';

const Login = (props) => {
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });

  const onChangeEmail = (e) => {
    setLoginState({
      email: e.target.value,
    });
  };

  const onChangePassword = (e) => {
    setLoginState({
      password: e.target.value,
    });
  };

  const handleToggleForm = () => {
    const {
      Toggle,
    } = props;
    const toggler = Toggle;
    toggler();
  };

  const loginUser = async (loginInfo) => {
    const response = await fetch(
      'http://localhost:5000/users/login',
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      },
    );
    const data = await response.json();
    return data;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginState;

    const loginInfo = {
      email,
      password,
    };

    loginUser(loginInfo)
      .then((res) => {
        console.log(res.json());
      })
      .catch((err) => console.log(err));
  };

  const { email, password } = loginState;
  return (
    <>
      <LoginForm>
        <Header>
              Login
        </Header>
        <LoginButtons>
          <li
            style={{
              listStyle: 'none',
            }}
          >
            <LoginButton
              icon="google"
              backgroundColor="#4285f4"
              endpoint="//localhost:5000/auth/google"
              providerName="Google"
            />
          </li>
          <li
            style={{
              listStyle: 'none',
            }}
          >
            <LoginButton
              icon="github"
              backgroundColor="#333"
              endpoint="http://localhost:5000/auth/github"
              providerName="Github"
            />
          </li>
          <li
            style={{
              listStyle: 'none',
            }}
          >
            <LoginButton
              icon="facebook"
              backgroundColor="#3a5797"
              endpoint="http://localhost:5000/auth/facebook"
              providerName="Facebook"
            />
          </li>
        </LoginButtons>
      </LoginForm>
      <Background onClick={handleToggleForm} />
    </>
  );
};

export default Login;
