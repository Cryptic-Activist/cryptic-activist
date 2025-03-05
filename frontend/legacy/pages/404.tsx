import Image from 'next/image';
import { connect } from 'react-redux';

// @ts-ignore
import PageNotFoundDark from 'assets/img/page_not_found_dark.svg';
// @ts-ignore
import PageNotFoundLight from 'assets/img/page_not_found_light.svg';

import { ErrorMessageDiv, Wrapper } from '@styles/pages/Error/Error';

const mapStateToProps = ({ app }) => ({ app });

const Page404 = ({ app }) => (
	<Wrapper>
		<ErrorMessageDiv>
			<Image
				src={app.theme === 'light' ? PageNotFoundLight : PageNotFoundDark}
				alt="page not found"
				height={300}
				width={300}
			/>
		</ErrorMessageDiv>
	</Wrapper>
);

export default connect(mapStateToProps)(Page404);
