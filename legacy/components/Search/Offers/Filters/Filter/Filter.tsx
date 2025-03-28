import { FC, useCallback, useState } from 'react';

import {
	CheckboxChecked,
	CheckboxUnchecked,
	FilterContainer,
} from '@styles/components/Search/Offers/Filters/Filter/Filter';

import { IFilter } from 'types/components/Search/Offers';

const Filter: FC<IFilter> = ({
	statement,
	type,
	insertIntoSearchFilterString,
}) => {
	const [checked, setChecked] = useState<boolean>(false);

	const checkFilter = useCallback((): void => {
		setChecked((oldCheck) => !oldCheck);
		insertIntoSearchFilterString(type, statement, checked);
	}, [type, statement, checked]);

	return (
		<FilterContainer onClick={checkFilter}>
			{checked ? (
				<CheckboxChecked>
					<div />
				</CheckboxChecked>
			) : (
				<CheckboxUnchecked />
			)}
			<p>{statement}</p>
		</FilterContainer>
	);
};

export default Filter;
