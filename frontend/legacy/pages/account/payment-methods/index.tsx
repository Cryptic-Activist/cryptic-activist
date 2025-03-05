import { NextPage } from 'next';

import ButtonLink from '@components/Buttons/Link';

import {
	Container,
	Heading,
	HeadingButtonContainer,
	PaymentMethodListItem,
	PaymentMethodsContainer,
	Wrapper,
} from '@styles/pages/Account/PaymentMethods';

const PaymentMethods: NextPage = () => {
	return (
		<Wrapper>
			<Container>
				<HeadingButtonContainer>
					<Heading>Payment Methods</Heading>
					<ButtonLink
						name="plus"
						href="/account/payment-methods/create"
						as="/account/payment-methods/create"
					/>
				</HeadingButtonContainer>
				<PaymentMethodsContainer>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15].map(
						(item, index) => (
							<PaymentMethodListItem key={index}>
								<h1>Test</h1>
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<h1>Hello World</h1>
								<h1>{item}</h1>
							</PaymentMethodListItem>
						)
					)}
				</PaymentMethodsContainer>
			</Container>
		</Wrapper>
	);
};

export const getServerSideProps = () => {
	const results = {};

	return { props: { ...results } };
};

export default PaymentMethods;
