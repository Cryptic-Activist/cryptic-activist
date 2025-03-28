import { NextPage } from 'next';

import FindOffer from 'sections/Index/FindOffer';
import Hero from 'sections/Index/Hero';
import WhatYouCanDo from 'sections/Index/WhatYouCanDo';

import { Container } from '@styles/pages/Index/Index';

const Index: NextPage = () => (
	<Container>
		<Hero />
		<FindOffer />
		<WhatYouCanDo />
	</Container>
);

export default Index;
