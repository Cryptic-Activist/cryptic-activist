export type PreviousDisputePartyNotes = {
	trader: any;
	vendor: any;
};

export type ResolutionType =
	| 'RELEASE_CRYPTO'
	| 'REFUND_PAYMENT'
	| 'CANCEL_TRADE'
	| 'PARTIAL_REFUND'
	| 'SPLIT_RESOLUTION'
	| 'NO_ACTION_TAKEN'
	| 'OFF_PLATFORM_DECISION'
	| 'PLATFORM_COMPENSATION';
