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

export type SubmitDisputeResolutionBody = {
	disputeId: string;
	resolutionType: string;
	resolutionNote: string;
	notifyBothUsers: boolean;
	logAdminAction: boolean;
};

export type SubmitDisputeUserManagementActionsBody = {
	actionForTrader: string;
	actionForVendor: string;
	disputeId: string;
	moderatorId: string;
};

export type ResolveInTraderFavorBody = {
	disputeId: string;
	moderatorId: string;
};

export type ResolveInVendorFavorBody = {
	disputeId: string;
	moderatorId: string;
};

export type CancelTradeByModeratorBody = {
	disputeId: string;
	moderatorId: string;
};

export type EscalateToSeniorAdminBody = {
	disputeId: string;
	moderatorId: string;
};

export type RequestMoreEvidencesBody = {
	disputeId: string;
	moderatorId: string;
};
