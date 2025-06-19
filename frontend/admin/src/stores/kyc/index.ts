import type { KYCState, SetterParams } from './types';

import { map } from 'nanostores';

export const kyc = map<KYCState>({
	id: undefined,
	user: undefined,
	submittedAt: undefined,
	status: undefined,
	documentFront: undefined,
	documentBack: undefined,
	selfie: undefined,
	utilityBill: undefined,
	bankStatement: undefined,
	reviewedBy: undefined,
	fullName: undefined,
	documentType: undefined,
	documentNumber: undefined,
	additionalNotes: undefined,
	dateOfBirth: undefined,
	rejectedReason: undefined,
	nationality: undefined,
	reviewedAt: undefined
});

const setter = (params: SetterParams) => {
	const aux = kyc.get();

	kyc.set({
		id: params.id ?? aux.id,
		user: params.user ?? aux.user,
		submittedAt: params.submittedAt ?? aux.submittedAt,
		status: params.status ?? aux.status,
		documentFront: params.documentFront ?? aux.documentFront,
		additionalNotes: params.additionalNotes ?? aux.additionalNotes,
		documentBack: params.documentBack ?? aux.documentBack,
		bankStatement: params.bankStatement ?? aux.bankStatement,
		selfie: params.selfie ?? aux.selfie,
		reviewedBy: params.reviewedBy ?? aux.reviewedBy,
		fullName: params.fullName ?? aux.fullName,
		documentType: params.documentType ?? aux.documentType,
		documentNumber: params.documentNumber ?? aux.documentNumber,
		dateOfBirth: params.dateOfBirth ?? aux.dateOfBirth,
		rejectedReason: params.rejectedReason ?? aux.rejectedReason,
		nationality: params.nationality ?? aux.nationality,
		utilityBill: params.utilityBill ?? aux.utilityBill,
		reviewedAt: params.reviewedAt ?? aux.reviewedAt
	});
};

export const setKYC = async (params: SetterParams) => {
	setter(params);
};

export const resetKYC = () => {
	kyc.set({
		id: undefined,
		user: undefined,
		submittedAt: undefined,
		status: undefined,
		documentFront: undefined,
		documentBack: undefined,
		selfie: undefined,
		utilityBill: undefined,
		bankStatement: undefined,
		reviewedBy: undefined,
		fullName: undefined,
		documentType: undefined,
		documentNumber: undefined,
		additionalNotes: undefined,
		dateOfBirth: undefined,
		rejectedReason: undefined,
		nationality: undefined,
		reviewedAt: undefined
	});
};
