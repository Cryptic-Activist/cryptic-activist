import { Links } from './Links/types';
import { SocialMedia } from './types';

export const links: Links = [
  {
    heading: 'Trading',
    links: [
      {
        label: 'Buy / Sell Cryptocurrency',
        href: '/vendors',
      },
      {
        label: 'Become a Vendor',
        href: '/become-a-vendor',
      },
      {
        label: 'Fees',
        href: '/fees',
      },
      {
        label: 'Tier System',
        href: '/tier',
      },
    ],
  },
  {
    heading: 'Legal',
    links: [
      {
        label: 'Terms & Conditions',
        href: '/terms-and-conditions',
      },
      {
        label: 'Privacy Policy',
        href: '/privacy-policy',
      },
      {
        label: 'Cookies Policy',
        href: '/cookies-policy',
      },
      {
        label: 'Imprint',
        href: '/imprint',
      },
      {
        label: 'KYC',
        href: '/kyc',
      },
    ],
  },
  {
    heading: 'About Cryptic Activist Catalog',
    links: [
      {
        label: 'About Us',
        href: '/about-us',
      },
      {
        label: 'Help',
        href: '/help',
      },
    ],
  },
];

export const socialMedias: SocialMedia[] = [
  {
    href: '#',
    iconName: 'FaInstagram',
  },
  {
    href: '#',
    iconName: 'FaYoutube',
  },
  {
    href: '#',
    iconName: 'FaXTwitter',
  },
  {
    href: '#',
    iconName: 'FaFacebook',
  },
];
