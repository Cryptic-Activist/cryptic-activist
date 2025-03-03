import { FC } from 'react';

import { FaClone } from 'react-icons/fa';

import {
	WalletAddress,
	WalletDiv,
	Copy,
	SmallButton,
	WalletContainer,
} from '@styles/components/Modals/ModalTemplate';
import ModalTemplate from '../ModalTemplate';
import { copyToClipboard, handleCopyWalletAddress } from '@utils/browser';
import { useAppDispatch, useAppSelector } from '@store/index';
import { resetWallet } from '@store/reducers/wallet';

const Wallet: FC = () => {
	const { wallet } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	const handleDisconnectWallet = () => {
		dispatch(resetWallet());
	};

	return (
		<ModalTemplate heading="| My Wallet" allowClose type="walletModal">
			<WalletContainer>
				<WalletDiv onClick={handleCopyWalletAddress} className="noSelect">
					<WalletAddress id="walletAddress">{wallet.wallet.address}</WalletAddress>
					<Copy onClick={() => copyToClipboard(wallet.wallet.address)}>
						<FaClone />
					</Copy>
				</WalletDiv>
				<SmallButton onClick={() => handleDisconnectWallet()}>
					Disconnect Wallet
				</SmallButton>
			</WalletContainer>
		</ModalTemplate>
	);
};

export default Wallet;
