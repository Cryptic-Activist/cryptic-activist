import { IStyledListFeedbacksFeedback } from "./Feedback";

export interface IStyledListFeedbacks {
	background: string;
	borderColor: string;
	header: {
		color: string;
		background: string;
		borderColor: string;
		buttons: {
			active: {
				background: string;
				color: string;
			};
			deactive: {
				background: string;
				color: string;
			};
		};
		positiveNegativeAll: {
			background: string;
			color: string;
		};
	};
	feedback: IStyledListFeedbacksFeedback;
}
