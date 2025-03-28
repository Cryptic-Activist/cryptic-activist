import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import ListTemplate from '@components/Lists/ListTemplate';
import { IPaymentMethodsList } from 'types/components/Lists/PaymentMethods';

import {
	Apply,
	EmptyP,
	ItemsList,
	ItemsListItem,
	ItemsListItemBtn,
	List,
	Sep,
} from '@styles/components/Lists/PaymentMethods';

import { useAppDispatch } from '@store/index';
import { setDefaultPaymentMethod } from '@store/reducers/app';
import { resetNavigationBar } from '@store/reducers/navigationBar';

import { PaymentMethodCategoryType, PaymentMethodType } from './types';

const mapStateToProps = ({ paymentMethods }) => ({ paymentMethods });

const PaymentMethods: FC<IPaymentMethodsList> = () => {
	const dispatch = useAppDispatch();

	const [categories, setCategories] = useState<PaymentMethodCategoryType[]>([]);
	const [paymentMethods, setPaymentMethods] = useState<PaymentMethodType[]>([]);

	const [selectedCategory, setSelectedCategory] =
		useState<PaymentMethodCategoryType>(null);
	const [selectedPaymentMethod, setSelectedPaymentMethod] =
		useState<PaymentMethodType>(null);
	const [isAllSelected, setIsAllSelected] = useState(false);

	const handleCheckAllSelected = () => {
		const allSelected =
			selectedCategory !== null && selectedPaymentMethod !== null;
		setIsAllSelected(allSelected);
	};

	const handlePaymentMethodCategory = (categoryId: string): void => {
		// dispatcher(setValue({ category: categoryId }));
	};

	const handlePaymentMethodSelection = (selectionId: string): void => {
		// dispatcher(setValue({ selection: selectionId }));
	};

	const getPaymentMethodCategories = async () => {
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
		const getPaymentMethodsByCategory = async () => {
			const response = await fetch(
				`${process.env.OFFER_API}/payment-methods/${selectedCategory.id}/all`,
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
			handlePaymentMethodCategory(selectedCategory.id);
		}
	}, [selectedCategory]);

	useEffect(() => {
		handlePaymentMethodSelection(selectedPaymentMethod?.id);
	}, [selectedPaymentMethod]);

	useEffect(() => {
		getPaymentMethodCategories();
	}, []);

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

	const handleSelectCategory = (e, category) => {
		unselectAllCategories();
		e.currentTarget.parentElement.classList.add('selected');
		setSelectedPaymentMethod(null);
		setSelectedCategory(category);
	};

	const handleSelectPaymentMethod = (e, paymentMethod) => {
		unselectAllPaymentMethods();
		e.currentTarget.parentElement.classList.add('selected');
		setSelectedPaymentMethod(paymentMethod);
	};

	const handleSubmit = useCallback(() => {
		if (selectedCategory !== null && selectedPaymentMethod !== null) {
			const pm: PaymentMethodType = {
				id: selectedPaymentMethod.id,
				name: selectedPaymentMethod.name,
				paymentMethodCategory: {
					id: selectedCategory.id,
					name: selectedCategory.name,
				},
			};
			dispatch(setDefaultPaymentMethod(pm));
			dispatch(resetNavigationBar('modals'));
		}
	}, [selectedCategory, selectedPaymentMethod]);

	useEffect(() => {
		handleCheckAllSelected();
	}, [selectedCategory, selectedPaymentMethod]);

	return (
		<ListTemplate heading="Payment Methods" type="paymentMethods" allowClose>
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
										onClick={(e) => handleSelectCategory(e, categories[0])}
										id={categories[0].id}
									>
										{categories[0].name}
									</ItemsListItemBtn>
								</ItemsListItem>
							) : (
								<>
									{categories.map((cat, index) => (
										<Fragment key={cat.id}>
											{index === 0 && (
												<ItemsListItem className="firstCategory" key={cat.id}>
													<div />
													<ItemsListItemBtn
														onClick={(e) => handleSelectCategory(e, cat)}
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
														onClick={(e) => handleSelectCategory(e, cat)}
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
														onClick={(e) => handleSelectCategory(e, cat)}
														id={cat.id}
													>
														{cat.name}
													</ItemsListItemBtn>
												</ItemsListItem>
											)}
										</Fragment>
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
										onClick={(e) => handleSelectPaymentMethod(e, paymentMethods[0])}
									>
										{paymentMethods[0].name}
									</ItemsListItemBtn>
								</ItemsListItem>
							) : (
								<>
									{paymentMethods.map((payment, index) => (
										<Fragment key={payment.id}>
											{index === 0 && (
												<ItemsListItem key={payment.id} className="firstPaymentMethod">
													<div />
													<ItemsListItemBtn
														onClick={(e) => handleSelectPaymentMethod(e, payment)}
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
														onClick={(e) => handleSelectPaymentMethod(e, payment)}
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
														onClick={(e) => handleSelectPaymentMethod(e, payment)}
														id={payment.id}
													>
														{payment.name}
													</ItemsListItemBtn>
												</ItemsListItem>
											)}
										</Fragment>
									))}
								</>
							)}
						</>
					) : (
						<EmptyP>No payment methods</EmptyP>
					)}
				</ItemsList>
			</List>
			<Apply onClick={handleSubmit} isCompleted={isAllSelected}>
				Apply
			</Apply>
		</ListTemplate>
	);
};

export default connect(mapStateToProps)(PaymentMethods);
