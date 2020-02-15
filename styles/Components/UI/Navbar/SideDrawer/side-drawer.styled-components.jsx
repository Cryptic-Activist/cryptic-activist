/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BackgroundDrawer = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, .2);
  z-index: 9999999999;
  height: 100%;
  width: 100%;
  top: 0px;
  display: none;
`;

export const Drawer = styled.nav`
  height: 100%;
  width: 250px;
  background: #ffcd2b;
  position: fixed;
  top: 0px;
  z-index: 99999999999;
  padding: 0;
  overflow-y: scroll;
  transform: translateX(-250px);
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  .closeDrawer {
    position: absolute;
    top: 15px;
    right: 15px;
    transform: rotate(45deg);
    color: #000;
    transition: all .2s ease-in-out;
    &:hover {
      transform: scale(1.1, 1.1) rotate(45deg);
      color: #000;
    }
    &:active {
      transform: scale(0.95, 0.95) rotate(45deg);
    }
  }
`;

export const ProfileDrawerUl = styled.ul`
  width: 100%;
  height: 60px;
  display: block;
  padding: 15px 15px 0 15px;
  li {
    list-style: none;
    display: inline-block;
    position: relative;
    p {
      margin-bottom: 0;
      transform: translateY(-4px);
    }
  }
`;

export const ProfileImage = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50px;
`;

export const ProfileName = styled.span`
  color: #333;
  font-size: 17px;
  letter-spacing: 1px;
`;

export const ProfileRanking = styled.p`
  color: #000;
  font-size: 15px;
  &:hover {
    color: #000;
    text-decoration: none;
  }
`;

export const SideDrawerUl = styled.ul`
  width: 100%;
  margin: 20px 0 0 0;
  padding-left: 0;
  /* @media (min-height: 430px) {
    height: 225px;
  }
  @media (min-height: 450px) {
    height: 245px;
  }
  @media (min-height: 480px) {
    height: 300px;
  }
  @media (min-height: 640px) {
    height: 420px;
  } */
`;

export const SideDrawerSubUl = styled.ul`
  width: 100%;
  background: #e0b528;
  box-shadow: inset 0px 0px 8px -3px rgba(0, 0, 0, 0.15);
`;

export const SideDrawerLi = styled.li`
  /* margin: 3px 0; */
  list-style: none;
`;

export const SideDrawerButtonTo = styled.button`
  color: #000;
  font-size: 17px;
  width: 100%;
  display: block;
  padding: 8px 15px;
  transition: all .3s ease-in-out;
  text-align:left;
  border: none;
  line-height: unset;
  background: #ffcd2b;
  &:hover {
    color: #000;
    text-decoration: none;
    border-radius: 3px;
  }
  &:focus {
    outline: none;
    color: #333;
  }
`;

export const SideDrawerLinkTo = styled.a`
  color: #000;
  font-size: 16px;
  width: 100%;
  display: block;
  padding: 8px 15px;
  transition: all .3s ease-in-out;
  text-align:left;
  border: none;
  background: transparent;
  &:hover {
    color: #ffcd2b;
    text-decoration: none;
    background: #000;
  }
  &:focus {
    outline: none;
  }
`;

export const AdminLink = styled.a`
  color: #000;
  font-size: 16px;
  width: 100%;
  display: block;
  padding: 8px 15px;
  transition: all .3s ease-in-out;
  text-align:left;
  border: none;
  background: transparent;
  &:hover {
    color: #ffcd2b;
    text-decoration: none;
    background: #000;
    border-radius: 3px;
  }
  &:focus {
    outline: none;
  }
`;

export const SideDrawerLinkToAdmin = styled.a`
  transition: all .3s ease-in-out;
  ul {
    padding: 15px 15px 0 15px;
    height: 89px;
  }
  &:hover {
    text-decoration: none;
  }
`;

export const Button = styled.button`
  border: none;
  background: #ff0000;
`;

export const Login = styled.a`
  color: #000;
  font-size: 16px;
  &:hover {
    color: #000;
    text-decoration: none;
  }
`;

export const Separator = styled.div`
  height: 1px;
  width: 50%;
  background: #000;
  display: block;
  margin: 0 auto;
  display: table;
`;

export const LogoutDiv = styled.div`
  /* position: absolute; */
  display: block;
  /* bottom: 50px; */
  width: 88%;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 40px;
`;

export const Logout = styled.button`
  color: #ffcd2b;
  padding: 5px 7px;
  background: #000;
  font-weight: 900;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 3px;
  border: 1px solid #000;
  transition: all .3s ease-in-out;
  &:hover {
    color: #000;
    background-color: #ffcd2b;
    border: 1px solid #000;
  }
  &:focus {
    outline: none;
  }
  &:active {
    color: #000;
    background-color: #ffcd2b;
    border: 1px solid #000;
  }
`;

export const LoginLinkDiv = styled.div`
  padding: 40px 15px;
  display: block;
`;


export const LoginLink = styled.a`
  color: #ffcd2b;
  padding: 5px 7px;
  background: #000;
  margin: 40px 0;
  font-weight: 900;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 3px;
  border: 1px solid #000;
  transition: all .3s ease-in-out;
  &:hover {
    color: #000;
    background-color: #ffcd2b;
    border: 1px solid #000;
    text-decoration: none;
  }
  &:focus {
    outline: none;
  }
  &:active {
    color: #000;
    background-color: #ffcd2b;
    border: 1px solid #000;
  }
`;
