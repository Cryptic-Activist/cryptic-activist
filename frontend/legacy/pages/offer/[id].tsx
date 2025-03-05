import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { OfferProps } from 'types/pages/offer/id';

import { OfferHowMuch } from '@components/Offer';
import OfferAboutThisOffer from '@components/Offer/OfferAboutThisOffer';
import OfferAboutThisVendor from '@components/Offer/OfferAboutThisVendor';

import { OFFER_API } from '@constants/envs';
import { fetchGet } from '@services/axios';
import {
	Abouts,
	Container,
	Main,
	NoOfferError,
	Wrapper,
} from '../../styles/pages/Offer/Id';

const Offer: NextPage<OfferProps> = ({ offer }) => {
	return (
		<>
			<Head>
				<title>{`${offer.cryptocurrency.name} offer - ${offer.vendor.firstName} ${offer.vendor.lastName} | Cryptic Activist Catalog`}</title>
			</Head>
			<Wrapper>
				<Container>
					{Object.entries(offer).length > 0 ? (
						<Main>
							<OfferHowMuch offer={offer} />
							<Abouts>
								<OfferAboutThisOffer offer={offer} />
								<OfferAboutThisVendor offer={offer} />
							</Abouts>
						</Main>
					) : (
						<NoOfferError>No Items</NoOfferError>
					)}
				</Container>
			</Wrapper>
		</>
	);
};

export const getServerSideProps: GetServerSideProps<any> = async ({
	query,
}) => {
	const { id } = query;

	console.log(
		`${OFFER_API}/offer?id=${id}&associations=vendor,fiat,cryptocurrency,paymentMethod`
	);

	const getOfferDetails = async () => {
		const offer = await fetchGet(
			`${OFFER_API}/offer?id=${id}&associations=vendor,fiat,cryptocurrency,paymentMethod`
		);

		return offer.data.results;
	};

	const offer = await getOfferDetails();

	return { props: { offer } };
};

export default Offer;
