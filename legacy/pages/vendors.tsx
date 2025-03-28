import { NextPage } from 'next';
import { connect } from 'react-redux';

import OffersList from '@components/Lists/Offers/OffersList';
import OffersSearch from '@components/Search/Offers/OffersSearch';

import { IVendors } from 'types/pages/vendors';

import {
	Container,
	ContainerSticky,
	Wrapper,
} from '@styles/pages/Vendors/Vendors';

const mapStateToProps = ({ offers }) => ({ offers });

const Vendors: NextPage<IVendors> = () => (
	<Wrapper>
		<Container>
			<ContainerSticky>
				<OffersSearch borderColor="transparent" filters={false} />
			</ContainerSticky>
			<OffersList limit={4} height="100%" />
		</Container>
	</Wrapper>
);

export default connect(mapStateToProps)(Vendors);
