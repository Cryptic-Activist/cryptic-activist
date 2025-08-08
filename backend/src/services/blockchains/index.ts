import semver, { ReleaseType } from 'semver';

import { prisma } from '../db';

export const getNextSmartContractVersion = async (
  type: 'Escrow:NativeToken' | 'Escrow:ERC20' | 'Premium',
  chainId: string,
  releaseType: ReleaseType,
) => {
  const latest = await prisma.smartContract.findFirst({
    where: {
      chainId,
      metadata: {
        path: ['type'],
        equals: type,
      },
    },
    orderBy: {
      deployedAt: 'desc',
    },
    select: {
      version: true,
    },
  });

  if (!latest?.version) {
    return 'v1.0.0';
  }

  const cleanVersion = latest.version.replace(/^v/, '');
  const next = semver.inc(cleanVersion, releaseType);

  if (!next) {
    throw new Error(`Unable to bump version from ${latest.version}`);
  }

  return `v${next}`;
};

export const isERC20Trade = async (tradeId: string) => {
  const trade = await prisma.trade.findUnique({
    where: {
      id: tradeId,
    },
    select: {
      cryptocurrency: {
        select: {
          chains: {
            select: {
              abi: {
                select: {
                  key: true,
                },
              },
              contractAddress: true,
            },
          },
        },
      },
    },
  });

  if (
    trade &&
    !trade?.cryptocurrency.chains[0].abi?.key &&
    trade.cryptocurrency.chains[0].contractAddress === null
  ) {
    return false;
  }

  return true;
};
