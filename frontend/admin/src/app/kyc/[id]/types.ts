import type { File } from '@/stores/kyc/types';

export type Message = {
	createdAt: string;
	from: string;
	to: string;
	message: string;
	type?: string;
};

export type Document = {
	file?: File;
	type: string;
};

export type FileViewer = {
	filename: string;
	src: string;
};

export type StatusBadgeProps = {
	status: string;
};

type User = {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
	profileColor: string;
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
