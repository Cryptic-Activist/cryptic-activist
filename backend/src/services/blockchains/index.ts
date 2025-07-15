import semver, { ReleaseType } from 'semver';

import { prisma } from '../db';

export const getNextSmartContractVersion = async (
  type: 'Escrow' | 'Premium',
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
