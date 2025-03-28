import { FC, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import { ISelectPaymentMethod } from 'types/components/SelectPaymentMethod';

import { useAppSelector } from '@store/index';
import {
	Container,
	EmptyP,
	ItemsList,
	ItemsListItem,
	ItemsListItemBtn,
	LabelsDiv,
	List,
	ListDiv,
	SearchDiv,
	SearchIconDiv,
	SearchLabel,
	Sep,
} from '@styles/components/SelectPaymentMethod';

const SelectPaymentMethod: FC<ISelectPaymentMethod> = ({
	handlePaymentMethodCategory,
	handlePaymentMethodSelection,
}) => {
	const { app } = useAppSelector((state) => state);
	const [categories, setCategories] = useState<{ id: string; name: string }[]>(
		[]
	);
	const [paymentMethods, setPaymentMethods] = useState<
		{ id: string; name: string }[]
	>([]);

	const [selectedCategory, setSelectedCategory] = useState<string>(null);
	const [selectedPaymentMethod, setSelectedPaymentMethod] =
		useState<string>(null);

	const getPaymentMethodCategories = async (): Promise<void> => {
		const response = await fetch(
			`${process.env.OFFER_API}/payment-method/categories`,
			{
				method: 'GET',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
			}
		);

		const data = await response.json();

		if (data.status_code === 200) {
			const categoriesArr = data.results.map((cat) => ({
				id: cat.id,
				name: cat.name,
			}));

			setCategories(categoriesArr);
		}
	};

	useEffect(() => {
		const getPaymentMethodsByCategory = async (): Promise<void> => {
			const response = await fetch(
				`${process.env.OFFER_API}/payment-methods/${selectedCategory}/all`,
				{
					method: 'GET',
					mode: 'cors',
					cache: 'no-cache',
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
				}
			);

			const data = await response.json();

			const paymentMethodsArr = data.results.map((payment) => ({
				id: payment.id,
				name: payment.name,
			}));

			setPaymentMethods(paymentMethodsArr);
		};

		if (selectedCategory) {
			handlePaymentMethodSelection(null);
			getPaymentMethodsByCategory();
			handlePaymentMethodCategory(selectedCategory);
		}
	}, [selectedCategory]);

	const unselectAllCategories = () => {
		const allSelectedCategories = document
			.querySelector('.categories')
			.querySelectorAll('.selected');

		allSelectedCategories.forEach((category) => {
			category.classList.remove('selected');
		});
	};

	const unselectAllPaymentMethods = () => {
		const allSelectedPaymentMethods = document
			.querySelector('.paymentMethods')
			.querySelectorAll('.selected');

		allSelectedPaymentMethods.forEach((category) => {
			category.classList.remove('selected');
		});
	};

	const handleSelectCategory = (e) => {
		unselectAllCategories();
		e.currentTarget.parentElement.classList.add('selected');
		setSelectedPaymentMethod(null);
		setSelectedCategory(e.currentTarget.id);
	};

	const handleSelectPaymentMethod = (e) => {
		unselectAllPaymentMethods();
		e.currentTarget.parentElement.classList.add('selected');
		setSelectedPaymentMethod(e.currentTarget.id);
	};

	useEffect(() => {
		handlePaymentMethodSelection(selectedPaymentMethod);
	}, [selectedPaymentMethod]);

	useEffect(() => {
		getPaymentMethodCategories();
	}, []);

	return (
		<Container className="selectPaymentMethod">
			<SearchDiv className="searchDiv">
				<SearchLabel htmlFor="searchPaymentMethod">
					Search all payment methods
				</SearchLabel>
				<SearchIconDiv>
					<button type="button">
						<FaSearch />
					</button>
					<input type="text" id="searchPaymentMethod" placeholder="Search" />
				</SearchIconDiv>
			</SearchDiv>

			<ListDiv>
				{!app.isMobile && (
					<LabelsDiv>
						<span>Choose category</span>
						<span>Select a payment method below</span>
					</LabelsDiv>
				)}
				<List>
					<ItemsList className="categories">
						{categories.length > 0 ? (
							<>
								{categories.length === 1 ? (
									<ItemsListItem
										className="firstCategory lastCategory"
										key={categories[0].id}
									>
										<div />
										<ItemsListItemBtn
											onClick={(e) => handleSelectCategory(e)}
											id={categories[0].id}
										>
											{categories[0].name}
										</ItemsListItemBtn>
									</ItemsListItem>
								) : (
									<>
										{categories.map((cat, index) => (
											<>
												{index === 0 && (
													<ItemsListItem className="firstCategory" key={cat.id}>
														<div />
														<ItemsListItemBtn
															onClick={(e) => handleSelectCategory(e)}
															id={cat.id}
														>
															{cat.name}
														</ItemsListItemBtn>
													</ItemsListItem>
												)}
												{index !== 0 && index !== categories.length - 1 && (
													<ItemsListItem key={cat.id}>
														<div />
														<ItemsListItemBtn
															onClick={(e) => handleSelectCategory(e)}
															id={cat.id}
														>
															{cat.name}
														</ItemsListItemBtn>
													</ItemsListItem>
												)}
												{index === categories.length - 1 && (
													<ItemsListItem className="lastCategory" key={cat.id}>
														<div />
														<ItemsListItemBtn
															onClick={(e) => handleSelectCategory(e)}
															id={cat.id}
														>
															{cat.name}
														</ItemsListItemBtn>
													</ItemsListItem>
												)}
											</>
										))}
									</>
								)}
							</>
						) : (
							<EmptyP>No Categories</EmptyP>
						)}
					</ItemsList>
					<Sep />
					<ItemsList className="paymentMethods">
						{paymentMethods.length > 0 ? (
							<>
								{paymentMethods.length === 1 ? (
									<ItemsListItem
										key={paymentMethods[0].id}
										className="firstPaymentMethod lastPaymentMethod"
									>
										<div />
										<ItemsListItemBtn
											onClick={(e) => handleSelectPaymentMethod(e)}
											id={paymentMethods[0].id}
										>
											{paymentMethods[0].name}
										</ItemsListItemBtn>
									</ItemsListItem>
								) : (
									<>
										{paymentMethods.map((payment, index) => (
											<>
												{index === 0 && (
													<ItemsListItem key={payment.id} className="firstPaymentMethod">
														<div />
														<ItemsListItemBtn
															onClick={(e) => handleSelectPaymentMethod(e)}
															id={payment.id}
														>
															{payment.name}
														</ItemsListItemBtn>
													</ItemsListItem>
												)}
												{index !== 0 && index !== paymentMethods.length - 1 && (
													<ItemsListItem key={payment.id}>
														<div />
														<ItemsListItemBtn
															onClick={(e) => handleSelectPaymentMethod(e)}
															id={payment.id}
														>
															{payment.name}
														</ItemsListItemBtn>
													</ItemsListItem>
												)}
												{index === paymentMethods.length - 1 && (
													<ItemsListItem key={payment.id} className="lastPaymentMethod">
														<div />
														<ItemsListItemBtn
															onClick={(e) => handleSelectPaymentMethod(e)}
															id={payment.id}
														>
															{payment.name}
														</ItemsListItemBtn>
													</ItemsListItem>
												)}
											</>
										))}
									</>
								)}
							</>
						) : (
							<EmptyP>No payment methods</EmptyP>
						)}
					</ItemsList>
				</List>
			</ListDiv>
		</Container>
	);
};

export default SelectPaymentMethod;
