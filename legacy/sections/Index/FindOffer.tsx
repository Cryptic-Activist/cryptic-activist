import { FC } from "react";

import OffersSearch from "@components/Search/Offers/OffersSearch";
import OffersList from "@components/Lists/Offers/OffersList";

import { Wrapper, Container, FlexDiv } from "@styles/sections/Index/FindOffer";

const FindOffer: FC = () => (
	<Wrapper>
		<Container>
			<FlexDiv>
				<OffersSearch borderColor="#3a3a3a" filters={false} />
			</FlexDiv>
			<FlexDiv style={{ width: "100%" }}>
				<OffersList limit={4} height="430px" />
			</FlexDiv>
		</Container>
	</Wrapper>
);

export default FindOffer;
