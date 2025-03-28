import { FC } from 'react';
import Image from 'next/image';
import { connect } from 'react-redux';

import BnbLight from '@assets/img/bnb-yellow.svg';
import EthLight from '@assets/img/ethereum-yellow.svg';
import BnbDark from '@assets/img/bnb-white.svg';
import EthDark from '@assets/img/ethereum-white.svg';

import ModalTemplate from 'layout/Modals/ModalTemplate';

import {
	BlockchainList,
	BlockchainButton,
} from '@styles/components/Modals/ModalTemplate';
import { getEthereumWallet } from '@store/thunks/wallet';
import { ISelectBlockchain } from 'types/components/Modals/SelectBlockchain';
import { useAppDispatch } from '@store/index';

const mapStateToProps = ({ app }) => ({ app });

const SelectBlockchain: FC<ISelectBlockchain> = ({ app }) => {
	const dispatch = useAppDispatch();

	const { theme } = app;

	return (
		<ModalTemplate allowClose heading="Select Blockchain" type="selectBlockchain">
			<BlockchainList>
				<BlockchainButton onClick={() => dispatch(getEthereumWallet())}>
					{theme === 'light' && (
						<Image src={BnbLight} width={28} height={28} alt="BNB light symbol" />
					)}
					{theme === 'dark' && (
						<Image src={BnbDark} width={28} height={28} alt="BNB dark symbol" />
					)}
					<p>Binance Smart Chain</p>
				</BlockchainButton>
				<BlockchainButton onClick={() => dispatch(getEthereumWallet())}>
					{theme === 'light' && (
						<Image src={EthLight} width={28} height={28} alt="ETH light symbol" />
					)}
					{theme === 'dark' && (
						<Image src={EthDark} width={28} height={28} alt="ETH light symbol" />
					)}
					<p>Ethereum</p>
				</BlockchainButton>
			</BlockchainList>
		</ModalTemplate>
	);
};

export default connect(mapStateToProps)(SelectBlockchain);
