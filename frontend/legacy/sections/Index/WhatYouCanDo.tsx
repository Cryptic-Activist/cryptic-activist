import { FC } from "react";
import {
	FaArrowUp,
	FaArrowDown,
	FaBitcoin,
	FaMonero,
	FaThumbsUp,
	FaDollarSign,
} from "react-icons/fa";

import {
	Wrapper,
	Container,
	HeadingsDiv,
	Grid,
	Tile,
	Icons,
	TileHeading,
	TileDescription,
} from "@styles/sections/Index/WhatYouCanDo";

const WhatYouCanDo: FC = () => (
	<Wrapper>
		<Container>
			<HeadingsDiv>
				<h1>What you can do on Cryptic Activist Catalog</h1>
				<h2>Seek your anonymity and privacy with us throught the our services</h2>
			</HeadingsDiv>
			<Grid>
				<Tile>
					<Icons>
						<FaArrowUp className="up" />
						<FaBitcoin className="main" />
					</Icons>
					<TileHeading>Buy Cryptocurrencies</TileHeading>
					<TileDescription>
						Buy cryptocurrencies in real time privately and anonymously.
					</TileDescription>
				</Tile>
				<Tile>
					<Icons>
						<FaArrowDown className="down" />
						<FaMonero className="main" />
					</Icons>
					<TileHeading>Sell Cryptocurrencies</TileHeading>
					<TileDescription>
						Sell cryptocurrencies at your rate, and receipt paid in your chosen
						payment methods.
					</TileDescription>
				</Tile>
				<Tile>
					<Icons>
						<FaThumbsUp className="main" />
					</Icons>
					<TileHeading>Build your reputation</TileHeading>
					<TileDescription>
						Get user reviews and earn social approval, and trust, and build your
						reputation.
					</TileDescription>
				</Tile>
				<Tile>
					<Icons>
						<FaDollarSign className="main" />
					</Icons>
					<TileHeading>Earn extra income</TileHeading>
					<TileDescription>
						Make it as an actual source of income by doing trading as a side business.
					</TileDescription>
				</Tile>
			</Grid>
		</Container>
	</Wrapper>
);

export default WhatYouCanDo;
