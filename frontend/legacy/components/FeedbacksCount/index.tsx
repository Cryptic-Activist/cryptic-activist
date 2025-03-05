import { FC } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

import { IFeedbacksCount } from "./types";

import {
	Feedbacks,
	NegativeFeedback,
	PositiveFeedback,
} from "@styles/components/FeedbacksCount";

const FeedbackCount: FC<IFeedbacksCount> = ({
	positiveFeedbackCount,
	negativeFeedbackCount,
}) => {
	return (
		<Feedbacks>
			<PositiveFeedback>
				<div className="numbers">
					<strong>{positiveFeedbackCount}</strong>
					<p>Positive feedback</p>
				</div>
				<div className="icon">
					<FaHeart />
				</div>
			</PositiveFeedback>
			<NegativeFeedback>
				<div className="numbers">
					<strong>{negativeFeedbackCount}</strong>
					<p>Negative feedback</p>
				</div>
				<div className="icon">
					<FaHeartBroken />
				</div>
			</NegativeFeedback>
		</Feedbacks>
	);
};

export default FeedbackCount;
