import { FC, useCallback } from 'react';
import { FaSpinner } from 'react-icons/fa';
// import { navigationBarSelector } from "oldStore/selectors";
import { useAppDispatch, useAppSelector } from 'store';
import { resetNavigationBar } from 'store/reducers/navigationBar';
import { IModalTemplate } from 'types/components/Modals/ModalTemplate';

import {
	Background,
	Container,
	Heading,
	Loading,
	Message,
} from '@styles/components/Modals/ModalTemplate';

const ModalTemplate: FC<IModalTemplate> = ({
	children,
	heading,
	type,
	success,
	successMessage,
	allowClose,
	dataTestId,
}) => {
	const dispatch = useAppDispatch();
	const { drawers, modals, status, tooltips } = useAppSelector(
		(state) => state.navigationBar
	);

	const handleCloseAllModals = useCallback(() => {
		if (allowClose) {
			dispatch(resetNavigationBar('modals'));
			dispatch(resetNavigationBar('tooltips'));
			dispatch(resetNavigationBar('drawers'));
		}
	}, [dispatch, allowClose]);

	return (
		<>
			<Background onClick={handleCloseAllModals} />
			<Container
				id={type}
				privateKeys={modals.privateKeys}
				data-testid={dataTestId}
			>
				<Heading>{heading}</Heading>
				{status === 'loading' ? (
					<Loading>
						<FaSpinner />
					</Loading>
				) : (
					<>
						{success && successMessage ? (
							<Message>{successMessage}</Message>
						) : (
							children
						)}
					</>
				)}
			</Container>
		</>
	);
};

export default ModalTemplate;
