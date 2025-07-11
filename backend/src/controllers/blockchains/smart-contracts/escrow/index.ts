import { Request, Response } from 'express';
import {
  deployEscrow,
  getNextEscrowVersion,
} from '@/services/blockchains/escrow';
import { formatBigInt, parseSafeResponse } from '@/utils/number';

import { Readable } from 'node:stream';
import { prisma } from '@/services/db';
import { uploadFiles } from '@/services/upload';

const convertABIToFile = (abi: any) => {
  const abiJson = JSON.stringify(abi, null, 2);
  const abiBuffer = Buffer.from(abiJson);

  const multerFile: Express.Multer.File = {
    fieldname: 'abi',
    originalname: 'EscrowABI.json',
    mimetype: 'application/json',
    buffer: abiBuffer,
    size: abiBuffer.length,
    // other properties you can stub or mock if needed:
    encoding: '7bit',
    destination: '',
    filename: 'EscrowABI.json',
    path: '',
    stream: Readable.from(abiBuffer),
  };

  return multerFile;
};

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
      adminId,
    } = req.body;

    const transactions = await prisma.$transaction(async (tx) => {
      const admin = await tx.admin.findUnique({
        where: {
          id: adminId,
        },
        select: {
          id: true,
        },
      });

      if (!admin) {
        throw new Error('Admin not found');
      }

      const chain = await tx.chain.findFirst({
        where: {
          id: chainId,
        },
        select: {
          rpcUrl: true,
          id: true,
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

        const file = convertABIToFile(deployed.abi);
        const uploadedFiles = await uploadFiles('smart-contracts/escrow/', [
          file,
        ]);

        if (!uploadedFiles.files || uploadedFiles.files.length === 0) {
          throw new Error('Unable to upload ABI');
        }
        const disabledDeployments = await tx.smartContract.updateMany({
          where: {
            chainId,
            isActive: true,
            metadata: {
              path: ['type'],
              equals: 'Escrow',
            },
          },
          data: {
            isActive: false,
          },
        });

        const abi = uploadedFiles.files[0];
        const deploymentBlockHeight = deployed.deploymentBlockHeight
          ? BigInt(deployed.deploymentBlockHeight)
          : null;
        const newVersion = await getNextEscrowVersion(chain.id, 'patch');

        const newDeployment = await tx.smartContract.create({
          data: {
            abiUrl: abi.key,
            address: deployed.contractAddress,
            deployerAddress: deployed.deployerAddress,
            deploymentBlockHeight: deploymentBlockHeight,
            deploymentHash: deployed.deploymentHash,
            chainId: chain.id,
            deployedById: admin.id,
            version: newVersion,
            gasUsed: deployed.gasUsed,
            gasPrice: deployed.gasPrice,
            metadata: {
              type: 'Escrow',
              parameters: {
                feeRate: defaultFeeRate,
                profitMargin: defaultProfitMargin,
              },
            },
          },
        });

        return { deployed: newDeployment };
      } catch (error) {
        return { error: 'Unable to process Escrow deployment' };
      }
    });

    if (transactions.error || !transactions.deployed) {
      res.status(400).json({
        error: transactions.error,
      });
      return;
    }

    const { gasPrice, gasUsed, deploymentBlockHeight, ...rest } =
      transactions.deployed;

    const convertedGasPrice = formatBigInt(gasPrice);
    const convertedGasUsed = formatBigInt(gasUsed);
    const convertedDeploymentBlockHeight = formatBigInt(deploymentBlockHeight);

    res.status(200).json({
      deployed: {
        gasPrice: convertedGasPrice,
        gasUsed: convertedGasUsed,
        deploymentBlockHeight: convertedDeploymentBlockHeight,
        ...rest,
      },
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};
