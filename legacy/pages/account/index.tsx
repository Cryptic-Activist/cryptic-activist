import { NextPage } from 'next';
import Head from 'next/head';
import { FaCircle } from 'react-icons/fa';

import { IAccount } from 'types/pages/account';

import { checkRequest } from '@utils/checkers';

import CurrentOffersList from '@components/Lists/CurrentOffers/CurrentOffersList';
import FeedbacksList from '@components/Lists/Feedbacks/FeedbacksList';

import ButtonLink from '@components/Buttons/Link';

import Avatar from '@components/Avatar';
import FeedbacksCount from '@components/FeedbacksCount';
import ProfileInfo from '@components/ProfileInfo';
import useProfile from '@hooks/useProfile';
import { useAppSelector } from '@store/index';
import {
	Aside,
	BtnsDiv,
	Container,
	CurrentOffersListHeading,
	CurrentOffersSection,
	FeedbacksListHeading,
	FeedbacksListSection,
	Flex,
	InlineSettingsDiv,
	Main,
	Profile,
	Status,
	VendorDescription,
	VendorName,
	VendorNameUsername,
	VendorUsername,
	Wrapper,
} from '@styles/pages/Account/Index';

const Index: NextPage<IAccount> = () => {
	const { user } = useAppSelector((state) => state);
	const {
		currentOffers,
		feedbacks,
		feedbacksCount,
		negativeFeedbacks,
		positiveFeedbacks,
		negativeFeedbacksCount,
		positiveFeedbacksCount,
	} = useProfile(user.data?.id);

	return (
		<>
			<Head>
				<title>Account - Cryptic Activist</title>
			</Head>
			{checkRequest(user) && (
				<Wrapper>
					<Container>
						<Flex>
							<Aside>
								<Profile>
									<Avatar
										width="100%"
										height="7rem"
										borderRadius="0.3rem"
										firstName={user.data.names.firstName}
										lastName={user.data.names.lastName}
										isProfilePage={true}
										profileColor={user.data.profileColor}
									/>
								</Profile>
								<ProfileInfo />
							</Aside>
							<Main>
								<VendorNameUsername>
									<InlineSettingsDiv>
										<VendorName>{`${user.data.names.firstName} ${user.data.names.lastName}`}</VendorName>
										<ButtonLink
											name="cog"
											href="/account/settings"
											as="/account/settings"
										/>
									</InlineSettingsDiv>
									<VendorUsername>{user.data.username}</VendorUsername>
									<VendorDescription>
										Phasellus nisl nunc, luctus eu leo in, semper convallis sapien. Nullam
										augue ipsum, scelerisque faucibus tincidunt eget, tempus id nisl.
										Morbi eu lorem a ipsum gravida hendrerit eget at sapien.
									</VendorDescription>
								</VendorNameUsername>
								<Status>
									<FaCircle className="online" />
									<p>Online</p>
								</Status>

								<FeedbacksCount
									negativeFeedbackCount={negativeFeedbacksCount}
									positiveFeedbackCount={positiveFeedbacksCount}
								/>

								<CurrentOffersSection>
									<InlineSettingsDiv>
										<CurrentOffersListHeading>Current offers</CurrentOffersListHeading>
										<BtnsDiv>
											<ButtonLink name="plus" href="/offer/create" as="/offer/create" />
											<ButtonLink
												name="cog"
												href="/account/offers/settings"
												as="/account/offers/settings"
											/>
										</BtnsDiv>
									</InlineSettingsDiv>
									<CurrentOffersList />
								</CurrentOffersSection>
								<FeedbacksListSection>
									<FeedbacksListHeading>Feedbacks</FeedbacksListHeading>
									<FeedbacksList
										vendorId={user.data.id}
										feedbacksCount={feedbacksCount}
										positiveFeedbacks={positiveFeedbacks}
										negativeFeedbacks={negativeFeedbacks}
										positiveFeedbackCount={positiveFeedbacksCount}
										negativeFeedbackCount={negativeFeedbacksCount}
									/>
								</FeedbacksListSection>
							</Main>
						</Flex>
					</Container>
				</Wrapper>
			)}
		</>
	);
};

export default Index;
