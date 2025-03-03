import { useArgs } from '@storybook/client-api';
import { ComponentMeta, Story } from '@storybook/react';

import ButtonInfo from '@components/Buttons/Info';

export default {
	title: 'Components/Buttons/ButtonInfo',
	component: ButtonInfo,
	argTypes: {
		message: {
			control: { type: 'text' },
		},
	},
	args: {
		message: 'Some Text',
	},
} as ComponentMeta<typeof ButtonInfo>;

const Template: Story<any> = (args) => {
	const [, updateArgs] = useArgs();

	console.log('SOME ARGS:', args);

	return <ButtonInfo {...args} />;
};

export const Button = Template.bind({});
