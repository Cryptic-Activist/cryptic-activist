// @ts-ignore
import UserNotFoundDark from 'assets/img/user_not_found_dark.svg';
// @ts-ignore
import UserNotFoundLight from 'assets/img/user_not_found_light.svg';
import Head from 'next/head';
import { FaCircle, FaHeart, FaHeartBroken } from 'react-icons/fa';

import Avatar from '@components/Avatar';
import CurrentOffersList from '@components/Lists/CurrentOffers/CurrentOffersList';
import FeedbacksList from '@components/Lists/Feedbacks/FeedbacksList';
import ProfileInfo from '@components/Profile/ProfileInfo';
import { USER_API } from '@constants/envs';
import useCurrentOffers from '@hooks/useCurrentOffers';
import useFeedback from '@hooks/useFeedback';
import useVendor from '@hooks/useVendor';
import { fetchGet } from '@services/axios';
import { useAppSelector } from '@store/index';
import {
	Aside,
	Container,
	CurrentOffersListHeading,
	CurrentOffersSection,
	ErrorImg,
	Feedbacks,
	FeedbacksListHeading,
	FeedbacksListSection,
	Flex,
	Main,
	NegativeFeedback,
	PositiveFeedback,
	Profile,
	Status,
	VendorDescription,
	VendorName,
	VendorNameUsername,
	VendorUsername,
	Wrapper,
} from '@styles/pages/Vendor/Vendor';
import { hasFetched } from '@utils/checkers';

const getVendor = async (username: string) => {
	try {
		const response = await fetchGet(
			`${USER_API}/users/username/${username}`
		);

		if (response.status !== 200) {
			return {};
		}

		return response.data;
	} catch (_) {
		return {};
	}
};

const Vendor = () => {
	const { app } = useAppSelector((state) => state);
	const { vendor } = useVendor();
	const {
		feedbacks,
		feedbacksCount,
		negativeFeedbacks,
		negativeFeedbacksCount,
		positiveFeedbacks,
		positiveFeedbacksCount,
	} = useFeedback({ id: vendor.data.id });
	const { currentOffers } = useCurrentOffers({ id: vendor.data.id });

	// const [blockedByCount, setBlockedByCount] = useState<number>(0);
	// const [hasBlockedCount, setHasBlockedCount] = useState<number>(0);

	// const [trustedBy, setTrustedBy] = useState<number>(0);

	// const app = useSelector((state: any) => state.app);

	// async function countTrusts(user_id: string): Promise<void> {
	// 	const res = await fetch(
	// 		`${process.env.USER_API}/trusts?user_id=${user_id}`,
	// 		{
	// 			method: 'GET',
	// 			mode: 'cors',
	// 			cache: 'no-cache',
	// 			credentials: 'same-origin',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 		}
	// 	);

	// 	const data = await res.json();

	// 	if (data.status_code === 200) {
	// 		setTrustedBy(data.results);
	// 	}
	// }

	return (
		<>
			<Head>
				<title>
					{vendor.fetched || vendor.loading
						? `${vendor.data?.names?.firstName} ${vendor.data?.names?.lastName} | Vendor - Cryptic Activist`
						: 'Loading...'}
				</title>
			</Head>
			<Wrapper>
				<Container>
					{hasFetched(vendor) && (
						<Flex>
							<Aside>
								<Profile>
									<Avatar
										width="100%"
										height="7rem"
										borderRadius="0.4rem"
										firstName={vendor.data?.names?.firstName}
										lastName={vendor.data?.names?.lastName}
										isProfilePage={true}
									/>

									<ProfileInfo vendor={vendor} />
								</Profile>
							</Aside>
							<Main>
								<VendorNameUsername>
									<VendorName>{`${vendor.data.names.firstName} ${vendor.data.names.lastName}`}</VendorName>
									<VendorUsername>{vendor.data.username}</VendorUsername>
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
								<Feedbacks>
									<PositiveFeedback>
										<div className="numbers">
											<strong>{positiveFeedbacksCount}</strong>
											<p>Positive feedback</p>
										</div>
										<div className="icon">
											<FaHeart />
										</div>
									</PositiveFeedback>
									<NegativeFeedback>
										<div className="numbers">
											<strong>{negativeFeedbacksCount}</strong>
											<p>Negative feedback</p>
										</div>
										<div className="icon">
											<FaHeartBroken />
										</div>
									</NegativeFeedback>
								</Feedbacks>
								<CurrentOffersSection>
									<CurrentOffersListHeading>Current offers</CurrentOffersListHeading>
									<CurrentOffersList />
								</CurrentOffersSection>
								<FeedbacksListSection>
									<FeedbacksListHeading>Feedbacks</FeedbacksListHeading>
									<FeedbacksList
										vendorId={vendor.data.id}
										positiveFeedbacks={positiveFeedbacks}
										negativeFeedbacks={negativeFeedbacks}
										positiveFeedbackCount={positiveFeedbacksCount}
										negativeFeedbackCount={negativeFeedbacksCount}
										feedbacksCount={feedbacksCount}
									/>
								</FeedbacksListSection>
							</Main>
						</Flex>
					)}
					{vendor.errors && vendor.errors.length > 0 && (
						<ErrorImg
							src={app.theme === 'light' ? UserNotFoundLight : UserNotFoundDark}
							alt="User not found"
						/>
					)}
				</Container>
			</Wrapper>
		</>
	);
};

// export const getServerSideProps: GetServerSideProps =
// 	wrapper.getServerSideProps(async ({ query }) => {
// 		const username: string = query.username.toString();

// 		const res = await fetch(
// 			`${process.env.USER_API}/user/get?username=${username}&associations=languages,profile_image`,
// 			{
// 				method: 'GET',
// 				mode: 'cors',
// 				cache: 'no-cache',
// 				credentials: 'same-origin',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 			}
// 		);

// 		const vendor = await res.json();
// 		const results: IVendorObjSSR = { props: {} };

// 		console.log('vendor:', vendor);

// 		if (
// 			vendor.status_code === 400 &&
// 			Object.entries(vendor.results).length === 0
// 		) {
// 			results.redirect = { permanent: true, destination: '/' };
// 		} else if (
// 			vendor.status_code === 200 &&
// 			Object.entries(vendor.results).length > 0
// 		) {
// 			results.props.vendor = vendor.results;
// 		}

// 		return {
// 			...results,
// 		};
// 	});

export default Vendor;
