import { FC } from "react";

import {
	Container,
	Item,
} from "@styles/components/Lists/Feedbacks/FeedbackTypeList/FeedbackTypeList";

const FeedbackTypeList: FC = () => (
	<Container>
		<Item>All (6)</Item>
		<Item>Positive (5)</Item>
		<Item>Negative (1)</Item>
	</Container>
);

export default FeedbackTypeList;
