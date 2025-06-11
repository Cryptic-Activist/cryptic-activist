export type GetDisputeParam = {
	id: string;
};

export type GetPreviousDisputePartyNoteParams = {
	traderId: string;
	vendorId: string;
};

export type AddDisputePartyNoteBody = {
	disputeId: string;
	userId: string;
	adminId: string;
	content: string;
};
