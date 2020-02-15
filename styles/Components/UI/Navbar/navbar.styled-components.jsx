import styled from 'styled-components';

export const NavBar = styled.nav`
  background: #ffcd2b;
  border: none;
  padding: .05rem 1rem;
  height: 50px;
  border-bottom: 1px solid #000;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
`;


export const LinkA = styled.a`
  color: #000;
  text-decoration: none;
  font-weight: 100;
  font-size: 13px;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    color: #e0b528!important;
    background: #000;
    box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 991px) {
    display: table;
    margin: 0 auto;
  }
  @media (max-width: 320px) {
    font-size: 12px;
  }
  @media (max-width: 240px) {
    font-size: 11px;
  }
`;

export const LinkAProfile = styled.a`
  @media (max-width: 991px) {
    display: table;
    margin: 0 auto;
  }
`;

export const Ul = styled.ul`
  .nav-item {
    transform: translateY(3px);
  }
  li {
    margin: 0 3px;
    height: 26px;
  }
  .profile-li {
    height: 35px;
    transform: translateX(3px);
  }
  .nav-link {
    padding: 4px;
  }
`;

export const ButtonProfile = styled.button`
  border: none;
  background: transparent;
  /* margin-top: 7px; */
  margin-left: 5px;
  border-radius: 50px;
  &:focus {
    outline: none;
  }
  img {
    /* border: 1px solid #000; */
  }
`;

export const Brand = styled.a`
  color: #000;
  font-weight: 900;
  letter-spacing: 1px;
  cursor: pointer;
  &:hover {
    color: #000;
  } 
  @media (max-width: 991px) {
    margin-right: 0px;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const ToggleButton = styled.button`
  color: #000;
  padding: 0;
  background: transparent;
  border: none;
  
  :focus {
    outline: none;
  }
  @media (max-width: 768px) {
    font-size: 21px;
  }
  @media (max-width: 440px) {
    font-size: 19px;
  }
`;

export const SignUp = styled.a`
  background-color: #000;
  border: none;
  margin: 13px 0 0 10px;
  color: #ffcd2b!important;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 3px 7px;
  font-weight: 700;
  transform: translateY(-10px);
  display: block;
  font-size: 13px;
  transition: .2s all ease-in-out;
  transition-delay: .1s;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover {
    color: #000!important;
    background-color: #ffcd2b;
    border: 1px solid #000;
    text-decoration: none;
  }
`;

export const Button = styled.button`
  background: transparent;
  border: none;
  color: #ff0000;
`;
