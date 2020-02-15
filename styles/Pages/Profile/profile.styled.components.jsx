/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { rotate } from '../../Animations/animations';

import {
  letterColor,
} from '../../Colors/color-scheme.styled-components';

export const ContainerProfile = styled.div`
  margin-bottom: 25px;
  @media (max-width: 768px) {
    margin-bottom: 450px;
  }
`;

export const Cover = styled.div`
  width: 100%;
  height: 180px;
  background-size: no-repeat;
  background-size: cover;
  background-position: center;
  @media (max-width: 565px) {
    height: 150px;
  }
  @media (max-width: 440px) {
    height: 140px;
  }
  @media (max-width: 385px) {
    height: 130px;
  }
  @media (max-width: 340px) {
    height: 120px;
  }
`;

export const Wrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
  @media (max-width: 767px) {
    margin-top: 90px;
  }
`;

export const EditableButton = styled.button`
  color: #ffcd2b;
  position: absolute;
  display: table;
  padding: 5px;
  right: 0;
  font-size: 23px;
  height: 50px;
  width: 50px;
  border-radius: 50px;
  border: 1px solid #000;
  background: #000;
  transition: .2s all ease-in-out;
  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    background: #ffcd2b;
    color: #000;
  }
  &:active {
    transform: scale(0.95, 0.95);
  }
`;

export const SubmitButton = styled.button`
  color: #ffcd2b;
  padding: 5px 7px;
  background: #000;
  font-weight: 900;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 3px;
  border: 1px solid #000;
  display: table;
  margin: 15px 0;
  transition: .2s all ease-in-out;
  &:focus {
    outline: none;
  }
  &:hover {
    background: #ffcd2b;
    color: #000;
  }
`;

export const ProfileImage = styled.img`
  height: 170px;
  width: 170px;
  border-radius: 80px;
  border: 3px solid #fff;
  position: absolute;
  top: -80px;
  @media (max-width: 565px) {
    width: 150px;
    height: 150px;
    top: -70px;
  }
  @media (max-width: 440px) {
    width: 140px;
    height: 140px;
    top: -62px;
  }
  @media (max-width: 385px) {
    width: 130px;
    height: 130px;
    top: -57px;
  }
  @media (max-width: 340px) {
    width: 120px;
    height: 120px;
    top: -54px;
  }
`;

export const LoadingProfileImage = styled.div`
  height: 170px;
  width: 170px;
  border-radius: 80px;
  border: 3px solid #fff;
  position: absolute;
  top: -80px;
  @media (max-width: 565px) {
    width: 150px;
    height: 150px;
    top: -70px;
  }
  @media (max-width: 440px) {
    width: 140px;
    height: 140px;
    top: -62px;
  }
  @media (max-width: 385px) {
    width: 130px;
    height: 130px;
    top: -57px;
  }
  @media (max-width: 340px) {
    width: 120px;
    height: 120px;
    top: -54px;
  }
`;

export const Label = styled.label`
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #333;
`;

export const DisplayName = styled.h1`
  font-size: 20px;
  color: #333;
  font-weight: 700;
  letter-spacing: 1px;
`;

export const Input = styled.input`
  font-size: 20px;
  color: #333;
  font-weight: 700;
  letter-spacing: 1px;
  display: block;
  background: #eaeaea;
  width: 100%;
  border: none;
  &:focus {
    outline: none;
  }
  &:disabled {
    background: transparent;
  }
`;

export const TextArea = styled.textarea`
  font-size: 20px;
  color: #333;
  font-weight: 700;
  letter-spacing: 1px;
  display: block;
  width: 100%;
  height: 100px;
  background: #eaeaea;
  border: none;
  &:focus {
    outline: none;
  }
  &:disabled {
    background: transparent;
  }
`;

export const RecentActivitiesH2 = styled.div`
  font-size: 20px;
  color: ${letterColor};
  font-weight: 900;
  margin: 10px auto;
  display: table;
`;

export const RecentActivitiesCover = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 120px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

export const RecentActivitiesAuthorPicture = styled.img`
  width: 60px;
  height: 60px;
  display: table;
  margin: -27px auto 0 auto;
  border: 2px solid #fff;
  border-radius: 50px;
`;


export const RecentActivityWrapper = styled(Link)`
  background: #fff;
  box-shadow: 0px 0px 9px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  display: inline-block;
  margin: 0 auto 25px auto;
  display: table;
  width: 100%;
  color: ${letterColor};
  transition: all .25s ease-in-out;
  &:hover {
    text-decoration: none;
    color: ${letterColor};
    box-shadow: 0px 0px 11px 2px rgba(0, 0, 0, 0.3);
  }

`;

export const RecentActivityTitle = styled.p`
  font-size: 16px;
  font-weight: 100;
  color: #000;
  margin: 5px 15px;
  text-align: center;
`;

export const RecentActivityPublishedOn = styled.p`
  font-size: 13px;
  font-weight: 100;
  color: #999;
  margin-bottom: 7px;
  text-align: center;
`;

export const LoadingAllContent = styled.div`
  width: 100%;
  padding: 50px 0;
  svg {
    animation: ${rotate} 1s infinite;
    color: #333;
    font-size: 18px;
    display: table;
    margin: 25px auto;
  }
`;
