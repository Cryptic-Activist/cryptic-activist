/* eslint-disable no-tabs */
import styled from 'styled-components';

export const FooterDiv = styled.footer`
    background: #ffcd2b;
    padding-top: 30px;
    /* margin-top: 40px; */
		/* position: absolute; */
    width: 100%;
		bottom: 0;
		border-top: 1px solid #000;
		box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.2);
	@media (max-width: 768px) {
		&::before {
			margin-bottom: 45px;
		}
	}
`;

export const P = styled.p`
	color: #000;
	margin: 15px 0px 3px 0px;
	font-size: 12px;
	text-align: center;
	/* text-transform: uppercase; */
	@media (max-width: 440px) {
		font-size: 11px;
	}
	@media (max-width: 380px) {
		font-size: 10px;
	}
	@media (max-width: 310px) {
		font-size: 9px;
	}
`;

export const Github = styled.a`
	color: #000;
	font-weight: 900;
	font-size: 13px;
	transition: all .25s ease-in-out;
	:hover {
		text-decoration: none;
		color: #000;
	}
	@media (max-width: 440px) {
		font-size: 12px;
	}
	@media (max-width: 380px) {
		font-size: 11px;
	}
	@media (max-width: 310px) {
		font-size: 10px;
	}
`;

export const Header = styled.h6`
	color: #000;
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 1px;
	text-transform: uppercase;
	@media (max-width: 768px) {
		text-align: center;
		margin-bottom: 0px;
	}
`;

export const Ul = styled.ul`
	list-style: none;
	padding-left: 0;
	@media (max-width: 768px) {
		display: table;
		margin: 0 auto 15px auto;
	}
`;

export const Li = styled.li`
	list-style: none;
`;

export const LinkTo = styled.a`
	color: #000;
	transition: all .3s ease-in-out;
	font-size: 12px;
	&:hover {
		text-decoration: none;
		color: #000;
	}
`;

export const LinkToPolicies = styled.a`
	color: #000;
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 1px;
	transition: all .3s ease-in-out;
	p {
		margin-bottom: 0px;
		margin-top: 5px;
		@media (max-width: 768px) {
			margin-bottom: 0px;
			margin-top: 0px;
		}
	}
	&:hover {
		text-decoration: none;
	}
	@media (max-width: 991px) {
		line-height: 14px;
	}
	@media (max-width: 768px) {
		display: table;
		margin: 5px auto;
	}
`;

export const CopyRight = styled.p`
	color: #000;
	font-size: 11px;
	font-weight: 300;
	letter-spacing: 1px;
	margin-top: 6px;
	@media (max-width: 991px) {
		line-height: 14px;
	}
	@media (max-width: 768px) {
		line-height: 0px;
		text-align: center;
		margin-top: 12px;
	}
`;

export const SocialMediaTitle = styled.h6`
	color: #000;
	font-size: 10px;
	text-transform: uppercase;
	font-weight: 700;
	@media (max-width: 991px) {
		font-size: 9px;
	}
	@media (max-width: 768px) {
		text-align: center;
	}
`;

export const SocialMediaUl = styled.ul`
	margin: 7px 0px;
	padding-left: 0;
	@media (max-width: 768px) {
		margin: 7px auto;
		display: table;
	}
`;

export const SocialMediaLi = styled.li`
	display: inline-block;
	margin: 0 7px 0 0;
	background-color: #000;
	padding: 4px 4px 0px 4px;
	border-radius: 3px;
	border: 1px solid #000;
	transition: .2s all ease-in-out;
	@media (max-width: 768px) {
		margin: 0 3px;
	}
	&:hover {
		background-color: #ffcd2b;
		a {
			svg {
				color: #000;
			}
		}
	}
`;

export const SocialMediaLink = styled.a`
	height: 21px;
	display: block;
	svg {
		color: #ffcd2b;
		font-size: 17px;
		transition: all .25s ease-in-out;
	}
`;

export const Donate = styled.div`
	color: #000;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 1px;
	margin-bottom: 3px;
	margin-top: -3px;
	@media (max-width: 768px) {
		font-size: 13px;
		text-align: center;
	}
`;

export const QRCode = styled.img`
	height: 90px;
	width: 90px;
	display: block;
	@media (max-width: 768px) {
		height: 100px;
		width: 100px;
		display: table;
		margin: 0 auto 20px auto;
	}
`;
