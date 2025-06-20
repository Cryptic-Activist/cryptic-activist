export type User = {
	username?: string;
	email?: string;
	id?: string;
};

export type Admin = {
	id?: string;
	username?: string;
};

export type KYCStatus = 'REJECTED' | 'PENDING' | 'APPROVED';

export type File = {
	id?: string;
	key?: string;
	mimeType?: string;
	size?: number;
	submittedAt?: string;
};

export type KYCState = {
	id?: string;
	user?: User;
	submittedAt?: string;
	status?: KYCStatus;
	documentFront?: File;
	documentBack?: File;
	selfie?: File;
	utilityBill?: File;
	bankStatement?: File;
	reviewedBy?: Admin;
	fullName?: string;
	documentType?: string;
	documentNumber?: string;
	additionalNotes?: string;
	dateOfBirth?: string;
	rejectedReason?: string;
	nationality?: string;
	reviewedAt?: string;
};

export type SetterParams = {
	id?: string;
	user?: User;
	submittedAt?: string;
	status?: KYCStatus;
	documentFront?: File;
	documentBack?: File;
	selfie?: File;
	utilityBill?: File;
	bankStatement?: File;
	reviewedBy?: Admin;
	fullName?: string;
	documentType?: string;
	documentNumber?: string;
	additionalNotes?: string;
	dateOfBirth?: string;
	rejectedReason?: string;
	nationality?: string;
	reviewedAt?: string;
};
