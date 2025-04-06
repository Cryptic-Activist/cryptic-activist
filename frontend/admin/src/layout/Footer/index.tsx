import styles from './styles.module.scss';

const Footer = () => {
	return (
		<footer>
			<p>
				&copy;{' '}
				{`${new Date().getFullYear()} Cryptic Activist Catalog - All rights reserved`}
			</p>
		</footer>
	);
};

export default Footer;
