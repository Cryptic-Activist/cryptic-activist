export type GetKYCParams = {
	kycId: string;
	adminId?: string;
};

export type ApproveKYCParams = {
	kycId: string;
	adminId?: string;
};

export type RejectKYCParams = {
	kycId: string;
	adminId?: string;
	rejectionReason?: string;
};
