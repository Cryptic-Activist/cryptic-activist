import { ApproveKYCParams, RejectKYCParams } from '@/services/kyc/types';
import { approveKYC, getKYC, rejectKYC } from '@/services/kyc';
import {
	getFilter,
	getKYCs,
	getTotalApprovedKYC,
	getTotalKYCApplications,
	getTotalPendingKYC,
	getTotalRejectedKYC
} from '@/services/kycs';
import { kyc, resetKYC, setKYC } from '@/stores/kyc';
import { kycs, setKYCs, setKYCsCurrentPage } from '@/stores';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';

import { GetKYCsParams } from '@/services/kycs/types';
import { KYCStatus } from '@/stores/kycs/types';
import { kycsColumns } from './data';
import { kycsFiltersResolver } from './zod';
import { useAdmin } from '..';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useStore } from '@nanostores/react';

const useKYC = () => {
	const params = useParams();
	const id = params?.id as string;

	const { admin } = useAdmin();
	const $kyc = useStore(kyc);

	const { register, handleSubmit, setValue, getFieldState, getValues } =
		useForm({
			resolver: kycsFiltersResolver
		});

	const kycQuery = useQuery({
		queryKey: ['kyc', id, admin.data?.id],
		queryFn: () =>
			getKYC({
				kycId: id,
				adminId: admin.data?.id as string
			}),
		enabled: !!admin.data?.id && !!id,
		staleTime: 0
	});

	console.log({ kycQuery: kycQuery.data, $kyc });

	const approveKYCMutation = useMutation({
		mutationFn: async () => {
			if (admin.data?.id) {
				const approved = await approveKYC({
					kycId: id,
					adminId: admin.data?.id
				});
				return approved;
			}
		},
		onSuccess: (response) => {
			if (response.ok) {
				kycQuery.refetch();
			}
		}
	});

	const rejectKYCMutation = useMutation({
		mutationFn: async () => {
			if (admin.data?.id) {
				const disputesList = await rejectKYC({
					kycId: id,
					adminId: admin.data?.id
				});
				return disputesList;
			}
		},
		onSuccess: (response) => {
			if (response.ok) {
				kycQuery.refetch();
			}
		}
	});

	useEffect(() => {
		if (kycQuery.data) {
			resetKYC();
			setKYC(kycQuery.data);
		}
	}, [kycQuery.data]);

	return {
		register,
		handleSubmit,
		approveKYCMutation,
		rejectKYCMutation,
		$kyc,
		kycsColumns
	};
};

export default useKYC;
