import { FC } from 'react';
import { connect } from 'react-redux';

import { IWithUser } from 'types/utils/hoc/withUser';

const mapStateToProps = ({ user }) => ({ user });

const WithUser: FC<IWithUser> = ({ user, children }) => {
	console.log(
		'Object.entries(user.data).length:',
		Object.entries(user.data).length
	);
	if (Object.entries(user.data).length > 0) {
		console.log(user);
		return <>{children[0]}</>;
	}

	return <>{children[1]}</>;
};

export default connect(mapStateToProps)(WithUser);
