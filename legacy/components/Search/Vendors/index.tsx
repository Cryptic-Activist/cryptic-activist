import { useRouter } from 'next/router';
import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import { Button, Form, Input } from '@styles/components/Search/Vendors';

const VendorsSearch: FC = () => {
	const router = useRouter();

	const [search, setSearch] = useState<string>('');

	const handleVendorSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.currentTarget.value);
	};

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			router.push(`/users/${search}`);
			setSearch('');
		},
		[search]
	);

	return (
		<Form onSubmit={handleSubmit}>
			<Input
				placeholder="Find vendor..."
				onChange={handleVendorSearchInput}
				value={search}
			/>
			<Button>
				<FaSearch />
			</Button>
		</Form>
	);
};

export default VendorsSearch;
