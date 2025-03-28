import { NextPage } from "next";
import Head from "next/head";

import {
	Wrapper,
	Container,
	SettingsContainer,
} from "@styles/pages/Account/Settings";

const Settings: NextPage = () => (
	<>
		<Head>
			<title>Profile Settings</title>
		</Head>
		<Wrapper>
			<Container>
				<SettingsContainer></SettingsContainer>
				<SettingsContainer></SettingsContainer>
				<SettingsContainer></SettingsContainer>
				<SettingsContainer></SettingsContainer>
				<SettingsContainer></SettingsContainer>
				<SettingsContainer></SettingsContainer>
			</Container>
		</Wrapper>
	</>
);

export default Settings;
