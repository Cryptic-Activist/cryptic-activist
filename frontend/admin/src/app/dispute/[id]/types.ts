import { User } from '@/stores/users/types';

export type Message = {
	createdAt: string;
	from: string;
	to: string;
	message: string;
	type?: string;
};

export type Evidence = {
	fileUrl: string;
	submittedBy: any;
};

export type FileViewer = {
	filename: string;
	src: string;
};
