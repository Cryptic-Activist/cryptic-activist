import { fetchGet, fetchPost } from '../axios';

import { BACKEND } from '@/constants';
import { DeploySmartContractParams } from './types';
import { getBearerToken } from '@/utils';
import { getLocalStorage } from '@/utils/browser/storage';

export const getDeploymentStats = async (chainId: string) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(
		`${BACKEND}/blockchains/smart-contracts/stats/${chainId}/deployment`,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const deployEscrowERC20SmartContract = async (
	params: DeploySmartContractParams
) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchPost(
		`${BACKEND}/blockchains/smart-contracts/escrow/erc20/deploy`,
		params,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const deployEscrowNativeTokenSmartContract = async (
	params: DeploySmartContractParams
) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchPost(
		`${BACKEND}/blockchains/smart-contracts/escrow/native/deploy`,
		params,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const deployPremiumSmartContract = async (
	params: DeploySmartContractParams
) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchPost(
		`${BACKEND}/blockchains/smart-contracts/premium/deploy`,
		params,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};
