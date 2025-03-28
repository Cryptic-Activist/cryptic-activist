import { FC } from 'react';
import Link from 'next/link';

import { IFooter } from './types';

import {
	FooterDiv,
	Container,
	BrandQuickSettingsDiv,
	BrandDiv,
	BrandLink,
	ThemeSwitcherLanguageDiv,
	SubMenu,
	SubMenuHeading,
	SubMenus,
	SubMenuItem,
	SubMenuList,
	Copyright,
} from '@styles/components/Footer';
import ThemeSwitcher from '@components/Switchers/Theme';
import LanguageSwitcher from '@components/Switchers/Language';

const Footer: FC<IFooter> = ({ theme, toggleTheme }) => (
	<FooterDiv id="pageFooter">
		<Container>
			<BrandQuickSettingsDiv>
				<BrandDiv>
					<BrandLink href="/" passHref>
						<h1>Cryptic Activist</h1>
						<h2>Catalog</h2>
					</BrandLink>
				</BrandDiv>
				<ThemeSwitcherLanguageDiv>
					<ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
					<LanguageSwitcher />
				</ThemeSwitcherLanguageDiv>
			</BrandQuickSettingsDiv>
			<SubMenus>
				<SubMenu>
					<SubMenuHeading>Trading</SubMenuHeading>
					<SubMenuList>
						<SubMenuItem>
							<Link href="/vendors" as="/vendors">
								Buy / Sell Cryptocurrencies
							</Link>
						</SubMenuItem>
						<SubMenuItem>
							<Link href="/become-a-vendor" as="/become-a-vendor">
								Become a vendor
							</Link>
						</SubMenuItem>
					</SubMenuList>
				</SubMenu>
				<SubMenu>
					<SubMenuHeading>Legalities</SubMenuHeading>
					<SubMenuList>
						<SubMenuItem>
							<Link href="/terms-and-conditions" as="/terms-and-conditions">
								Terms & Conditions
							</Link>
						</SubMenuItem>
						<SubMenuItem>
							<Link href="/privacy-policy" as="/privacy-policy">
								Privacy Policy
							</Link>
						</SubMenuItem>
						<SubMenuItem>
							<Link href="/cookies-policy" as="/cookies-policy">
								Cookies Policy
							</Link>
						</SubMenuItem>
					</SubMenuList>
				</SubMenu>
				<SubMenu>
					<SubMenuHeading>About Cryptic Activist Catalog</SubMenuHeading>
					<SubMenuList>
						<SubMenuItem>
							<Link href="/about-us" as="/about-us">
								About Us
							</Link>
						</SubMenuItem>
					</SubMenuList>
				</SubMenu>
			</SubMenus>
			<Copyright>
				&copy;{' '}
				{`${new Date().getFullYear()} Cryptic Activist Catalog - All rights reserved`}
			</Copyright>
		</Container>
	</FooterDiv>
);

export default Footer;
