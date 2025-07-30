export type Attachment = {
	size: number;
	fileName: string;
	key: string;
	mimeType: string;
};

export type Message = {
	createdAt: string;
	from: string;
	to: string;
	message: string;
	type?: string;
	attachment?: Attachment;
};

export type File = {
	key: string;
};

export type Evidence = {
	file: File;
	submittedBy: any;
};

export type FileViewer = {
	filename: string;
	src: string;
};

export type StatusBadgeProps = {
	status: string;
	priority: string;
};

type KYC = {
	status: 'VERIFIED' | 'REJECTED' | 'PENDING';
};

type User = {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
	profileColor: string;
	kyc?: KYC[];
};

export type UserCardProps = {
	role: string;
	user?: User;
	winner?: User;
	loser?: User;
};

export type TimelineItemProps = {
	time: string;
	event: string;
};
