'use client';

import { getEscrowDetails as getEscrowDetailsERC20 } from '@/services/ethers/escrow/erc20';
import { getEscrowDetails as getEscrowDetailsNative } from '@/services/ethers/escrow/native';
import { getPremiumABI } from '@/services/ethers/premium';
import { useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useRootStore } from '@/store';
import useUser from '../useUser';

const useContracts = (enabled = true) => {
  const { contracts } = useRootStore();
  const { user } = useUser();

  const [escrowNativeDetails, escrowERC20Details, premiumAbi] = useQueries({
    queries: [
      {
        queryKey: ['escrowNativeDetails'],
        queryFn: getEscrowDetailsNative,
        enabled: !!user.id && enabled,
      },
      {
        queryKey: ['escrowERC20Details'],
        queryFn: getEscrowDetailsERC20,
        enabled: !!user.id && enabled,
      },
      {
        queryKey: ['premiumAbi'],
        queryFn: getPremiumABI,
        enabled: !!user.id && enabled,
      },
    ],
  });

  useEffect(() => {
    if (escrowNativeDetails.data) {
      console.log({ escrowNativeDetails });
      contracts.setEscrowNativeContract(escrowNativeDetails.data);
    }
  }, [escrowNativeDetails.data]);

  useEffect(() => {
    if (escrowERC20Details.data) {
      contracts.setEscrowERC20Contract(escrowERC20Details.data);
    }
  }, [escrowERC20Details.data]);

  useEffect(() => {
    if (premiumAbi.data) {
      contracts.setPremiumContract(premiumAbi.data);
    }
  }, [premiumAbi.data]);

  return { contracts };
};

export default useContracts;
