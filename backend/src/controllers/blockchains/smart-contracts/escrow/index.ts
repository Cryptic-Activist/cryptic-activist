import { Request, Response } from 'express';
import { deployEscrow, getEscrowContract } from '@/services/blockchains/escrow';

import { ethers } from 'ethers';
import { prisma } from '@/services/db';

export const deployEscrowSmartContract = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      defaultFeeRate,
      defaultProfitMargin,
      chainId,
      platformWallet,
      metadata,
    } = req.body;

    const transactions = await prisma.$transaction(async (tx) => {
      const chain = await tx.chain.findFirst({
        where: {
          id: chainId,
        },
        select: {
          rpcUrl: true,
        },
      });

      if (!chain) {
        throw new Error('Chain not found');
      }

      if (!chain.rpcUrl) {
        throw new Error('Chain RPC URL not found');
      }

      try {
        const deployed = await deployEscrow({
          defaultFeeRate,
          defaultProfitMargin,
          platformWallet,
          rpcUrl: chain.rpcUrl,
        });

        // TODO:
        // Implement upload Escrow ABI and return the ABI file url
        // Store the uploaded ABI file url tio smartContract abiUrl table

        const newDeployment = await prisma.smartContract.create({
          data: {
            abiUrl: deployed.abi,
          },
        });
      } catch (error) {
        return { error: 'Unable to process Escrow deployment' };
      }
    });

    res.status(200).json(deployed);
  } catch (error) {
    res.status(500).json({ error });
  }
};
