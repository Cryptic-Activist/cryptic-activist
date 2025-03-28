import { FC, useCallback } from 'react';
import { FaClone } from 'react-icons/fa';

import { resetNavigationBar } from 'store/reducers/navigationBar';
import { resetPrivateKeys } from 'store/reducers/privateKeys';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import {
	PrivateKey,
	PrivateKeysList,
	Message,
	Submit,
	PrivateKeysContainer,
	Copy,
	PrivateKeysCopyButton,
} from '@styles/components/Modals/ModalTemplate';

import ModalTemplate from '../ModalTemplate';
import { IMPORT_ACTIONS } from '@constants/components/Modals/PrivateKeys';
import { copyToClipboard } from '@utils/browser';

const PrivateKeys: FC = () => {
	const dispatch = useAppDispatch();
	const { privateKeys } = useAppSelector((state) => state.privateKeys);

	const handleClosePrivateKeysModal = useCallback((): void => {
		dispatch(resetPrivateKeys());
		dispatch(resetNavigationBar('modals'));
	}, [dispatch]);

	const handleCopyPrivateKeysToClipboard = () => {
		const pksString = privateKeys.join(', ');
		copyToClipboard(pksString);
	};

	return (
		<ModalTemplate heading="| Private Keys" type="privateKeys" allowClose={false}>
			<PrivateKeysContainer>
				<Message>
					The private keys are used for a few important things on the{' '}
					<strong>Cryptic Activist</strong> platform such as:
				</Message>
				<PrivateKeysList>
					{IMPORT_ACTIONS.map((action) => (
						<PrivateKey size="normal">{action}</PrivateKey>
					))}
				</PrivateKeysList>
				<Message>
					{`Make sure to store these ${privateKeys.length} words private keys somewhere safe. It
            won't be available to retrieve at any time.`}
				</Message>
				<PrivateKeysList>
					{privateKeys.map((privateKey) => (
						<PrivateKey key={privateKey} size="large">
							{privateKey}
						</PrivateKey>
					))}
				</PrivateKeysList>

				<PrivateKeysCopyButton
					onClick={handleCopyPrivateKeysToClipboard}
					type="button"
				>
					<Copy>
						<FaClone size="1.2rem" />
					</Copy>
				</PrivateKeysCopyButton>

				<Submit
					onClick={() => {
						handleClosePrivateKeysModal();
					}}
				>
					I have stored it safely and understood the consequences of losing it
				</Submit>
			</PrivateKeysContainer>
		</ModalTemplate>
	);
};

export default PrivateKeys;
