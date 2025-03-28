import { ReactNode } from 'react';
import { DefaultTheme, StyledComponent } from 'styled-components';

export type FormProps = {
	defaultValues: any;
	Form: StyledComponent<'form', DefaultTheme, {}, never>;
	onSubmit: any;
	children: any;
};
