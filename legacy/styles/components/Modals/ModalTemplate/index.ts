import styled from 'styled-components';
import { Spin } from '@styles/animations';
import Link from 'next/link';

interface Props {
	privateKeys?: boolean;
}

interface PrivateKeyProp {
	size: 'normal' | 'large';
}

export const Background = styled.div`
	position: fixed;
	height: 100%;
	width: 100%;
	background: rgba(0, 0, 0, 0.3);
	z-index: 999;
`;

export const Container = styled.div<Pick<Props, 'privateKeys'>>`
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: ${({ theme }) => theme.components.modal.background};
	padding: 20px;
	border-radius: 6px;
	position: fixed;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
	${({ privateKeys }) => (privateKeys ? 'width: 750px' : 'width: 350px')};
	z-index: 9999;
	&::-webkit-scrollbar {
		display: none;
	}
	@media (max-height: 840px) {
		max-width: 75%;
	}
`;

export const Heading = styled.h1`
	color: ${({ theme }) => theme.components.modal.heading.color};
	font-size: 17px;
	font-weight: 900;
	margin-bottom: 1rem;
`;

export const Loading = styled.div`
	width: 250px;
	height: 180px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	svg {
		font-size: 20px;
		color: ${({ theme }) => theme.components.modal.loading.color};
		animation: ${Spin} 0.5s linear infinite;
	}
`;

export const Message = styled.p`
	font-size: 16px;
	color: ${({ theme }) => theme.components.modal.message.color};
`;

export const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const InputsContainer = styled.label`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
`;

export const Input = styled.input`
	color: ${({ theme }) => theme.components.modal.input.color};
	font-size: 1rem;
	padding: 0.9rem;
	width: 100%;
	border: none;
	background: ${({ theme }) => theme.components.modal.input.background};
	box-shadow: 0 0 15px -5px rgba(0, 0, 0, 0.4);
	border-radius: 0.4rem;
	border: 1px solid ${({ theme }) => theme.components.modal.input.borderColor};
	&:focus {
		border-color: ${({ theme }) =>
			theme.components.modal.input.focus.borderColor};
		outline: none;
	}
`;

export const DisabledInput = styled.div`
	color: ${({ theme }) => theme.components.modal.input.color};
	font-size: 1rem;
	padding: 0.9rem;
	width: 100%;
	border: none;
	background: ${({ theme }) => theme.components.modal.input.background};
	box-shadow: 0 0 15px -5px rgba(0, 0, 0, 0.4);
	border-radius: 0.4rem;
	border: 1px solid ${({ theme }) => theme.components.modal.input.borderColor};
	&:focus {
		border-color: ${({ theme }) =>
			theme.components.modal.input.focus.borderColor};
		outline: none;
	}
`;

export const Submit = styled.button`
	width: 100%;
	font-size: 16px;
	display: block;
	padding: 0.9rem;
	box-sizing: border-box;
	letter-spacing: 0.04em;
	border: 1px solid ${({ theme }) => theme.components.modal.submit.borderColor};
	border-radius: 0.4rem;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 3px 1px;
	background-color: ${({ theme }) => theme.components.modal.submit.background};
	color: ${({ theme }) => theme.components.modal.submit.color};
	cursor: pointer;
	&:focus {
		outline: none;
	}
`;

export const Button = styled.button`
	display: table;
	margin: 4px auto;
	background: transparent;
	border: none;
	color: ${({ theme }) => theme.components.modal.button.color};
	font-size: 14px;
	cursor: pointer;
	&:focus {
		outline: none;
	}
`;

export const SplitDiv = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 4px;
`;

export const InputLabel = styled.label`
	font-size: 0.85rem;
	color: ${({ theme }) => theme.components.modal.label.color};
	font-weight: 900;
	letter-spacing: 0.04em;
`;

export const InputRequiredLabelContainer = styled.label`
	display: flex;
	gap: 0.2rem;
`;

export const Required = styled.span`
	font-size: 16px;
	color: ${({ theme }) => theme.components.modal.label.color};
	margin-left: 3px;
`;

export const PrivateKeysList = styled.div`
	display: flex;
	flex-direction: row;
	gap: 5px;
	justify-content: center;
	flex-wrap: wrap;
`;

export const PrivateKeyLabelDiv = styled.div`
	display: flex;
	flex-direction: column;
`;

export const PrivateKey = styled.span<Pick<PrivateKeyProp, 'size'>>`
	background: ${({ theme }) => theme.components.modal.privateKey.background};
	color: ${({ theme }) => theme.components.modal.privateKey.color};
	padding: 0.4rem 0.8rem;
	border-radius: 0.4rem;
	font-size: ${({ size }) => (size === 'normal' ? '1rem' : '1.1rem')};
`;

export const DropDownContainer = styled.div`
	width: 100px;
	position: absolute;
	top: 52px;
	right: -14px;
	transform: translateX(-13px);
	background: ${({ theme }) => theme.components.modal.background};
	border-radius: 4px;
	border: 1px solid ${({ theme }) => theme.components.modal.borderColor};
	z-index: 9;
`;

export const DropDownList = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

export const DropDownListItem = styled(Link)`
	padding: 0.5rem 0.5rem;
	font-size: 1rem;
	text-align: center;
	color: ${({ theme }) => theme.components.modal.list.item.color};
	text-decoration: none;
	text-align: left;
`;

export const DropDownListItemButton = styled.button`
	padding: 0.5rem 0.5rem;
	font-size: 1rem;
	text-align: center;
	color: ${({ theme }) => theme.components.modal.list.button.color};
	text-decoration: none;
	border: none;
	background: transparent;
	border: none;
	cursor: pointer;
	text-align: left;
	&:focus {
		outline: none;
	}
`;

export const WalletContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const WalletDiv = styled.div`
	display: flex;
	gap: 1.5rem;
	align-items: center;
	cursor: pointer;
`;

export const WalletAddress = styled.p`
	font-size: 1.2rem;
	line-break: anywhere;
	color: ${({ theme }) => theme.components.modal.wallet.address.color};
`;

export const Copy = styled.span`
	svg {
		font-size: 1.2rem;
		color: ${({ theme }) => theme.components.modal.wallet.copy.color};
	}
`;

export const BlockchainButton = styled.button`
	padding: 0.8rem;
	border-radius: 0.3rem;
	display: flex;
	align-items: center;
	gap: 1rem;
	border: none;
	cursor: pointer;
	width: 100%;
	background: ${({ theme }) =>
		theme.components.modal.selectBlockchain.background};
	p {
		color: ${({ theme }) => theme.components.modal.selectBlockchain.color};
		font-size: 1.15rem;
	}
	svg {
		color: ${({ theme }) => theme.components.modal.selectBlockchain.icon.color};
	}
`;

export const BlockchainList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
`;

export const PrivateKeysContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

export const PrivateKeysCopyButton = styled.button`
	border: none;
	background-color: transparent;
	width: fit-content;
	height: fit-content;
	margin: 0 auto;
	cursor: pointer;
`;

export const SmallButton = styled.button`
	width: fit-content;
	font-size: 16px;
	display: block;
	padding: 0.9rem;
	box-sizing: border-box;
	letter-spacing: 0.04em;
	border: 1px solid ${({ theme }) => theme.components.modal.submit.borderColor};
	border-radius: 0.4rem;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 3px 1px;
	background-color: ${({ theme }) => theme.components.modal.submit.background};
	color: ${({ theme }) => theme.components.modal.submit.color};
	cursor: pointer;
	&:focus {
		outline: none;
	}
`;
