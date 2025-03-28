import { FC } from 'react';

// @ts-ignore
import P2P from 'assets/img/p2p.svg';

import {
	HeroDiv,
	P2PImg,
	HeroDivGrid,
	HeroH2,
	HeroP,
} from '@styles/sections/Index/Hero';

const Hero: FC = () => (
	<HeroDiv>
		<HeroDivGrid>
			<div>
				<HeroH2>Exchange privately</HeroH2>
				<HeroP>
					Exchange cryptocurrencies, goods, and services without the big brother
					watching you at every step.
				</HeroP>
			</div>
			<div>
				<P2PImg src={P2P} alt="Hero" />
			</div>
			<div>
				<HeroH2>Keep anonymous</HeroH2>
				<HeroP>
					Communicate, trade, and exchange without revealing your true identity.
				</HeroP>
			</div>
		</HeroDivGrid>
	</HeroDiv>
);

export default Hero;
