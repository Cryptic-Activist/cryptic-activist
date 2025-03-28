import { FC, useCallback } from 'react';
import { FaPlus } from 'react-icons/fa';

import useDispatcher from '@hooks/useDispatcher';

import {
	Background,
	CloseBtn,
	Container,
	Heading,
	HeadingCloseDiv,
} from '@styles/components/Lists/ListTemplate';
import { IListTemplate } from 'types/components/Lists/ListTemplate';

import { resetNavigationBar } from '@store/reducers/navigationBar';

const ListTemplate: FC<IListTemplate> = ({
	children,
	allowClose,
	heading,
	type,
}) => {
	const { dispatcher } = useDispatcher();

	const handleCloseAllModals = useCallback(() => {
		if (allowClose) dispatcher(resetNavigationBar('modals'));
	}, [allowClose]);

	return (
		<>
			<Background onClick={handleCloseAllModals} />
			<Container id={type}>
				<HeadingCloseDiv>
					<Heading>{heading}</Heading>
					<CloseBtn onClick={handleCloseAllModals}>
						<FaPlus />
					</CloseBtn>
				</HeadingCloseDiv>
				{children}
			</Container>
		</>
	);
};

export default ListTemplate;
