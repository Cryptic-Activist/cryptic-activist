import { FC } from 'react';
import { connect } from 'react-redux';

import { IWarnings } from 'types/components/Warnings/Warnings';

import { WarningList, Warning } from '@styles/components/Warnings/Warnings';

const mapStateToProps = ({ app }) => ({ app });

const Warnings: FC<IWarnings> = ({ modal, app }) => (
	<>
		{app.warnings?.length > 0 && (
			<WarningList modal={modal} id="loginErrorList">
				<h3>Errors:</h3>
				<ul>
					{app.warnings.map((message) => (
						<Warning key={message}>
							<p>{message}</p>
						</Warning>
					))}
				</ul>
			</WarningList>
		)}
	</>
);

export default connect(mapStateToProps)(Warnings);
