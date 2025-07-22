import { Request, Response } from 'express';
import {
  deployEscrow as deployEscrowERC20,
  getEscrowDetails as getEscrowDetailsERC20,
} from '@/services/blockchains/escrow/erc20';
import {
  deployEscrow as deployEscrowNativeToken,
  getEscrowDetails as getEscrowDetailsNativeToken,
} from '@/services/blockchains/escrow/native';
import { formatBigInt, parseSafeResponse } from '@/utils/number';
import { prisma, redisClient } from '@/services/db';

import { ContractDetails } from '@/services/blockchains/escrow/types';
import { Readable } from 'node:stream';
import { getNextSmartContractVersion } from '@/services/blockchains';
import { parseDurationToSeconds } from '@/utils/date';
import { uploadFiles } from '@/services/upload';

const convertArtifactToFile = (artifact: any) => {
  const artifactJson = JSON.stringify(artifact, null, 2);
  const artifactBuffer = Buffer.from(artifactJson);

  const multerFile: Express.Multer.File = {
    fieldname: 'abi',
    originalname: 'EscrowABI.json',
    mimetype: 'application/json',
    buffer: artifactBuffer,
    size: artifactBuffer.length,
    // other properties you can stub or mock if needed:
    encoding: '7bit',
    destination: '',
    filename: 'EscrowABI.json',
    path: '',
    stream: Readable.from(artifactBuffer),
  };

  return multerFile;
};

export const getEscrowERC20Details = async (_req: Request, res: Response) => {
  try {
    const details = await getEscrowDetailsERC20();

    res.status(200).json(details);
  } catch (error) {
    console.log({ error });
    res.status(400).json(error);
  }
};

export const getEscrowNativeTokenDetails = async (
  _req: Request,
  res: Response,
) => {
  try {
    const details = await getEscrowDetailsNativeToken();

    res.status(200).json(details);
  } catch (error) {
    console.log({ error });
    res.status(400).json(error);
  }
};

export const deployEscrowERC20SmartContract = async (
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

    let details: ContractDetails = { abi: null, address: null };

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
        const deployed = await deployEscrowERC20({
          defaultFeeRate,
          defaultProfitMargin,
          platformWallet,
          rpcUrl: chain.rpcUrl,
        });

        const file = convertArtifactToFile(deployed.artifact);
        const uploadedFiles = await uploadFiles('smart-contracts/escrow/', [
          file,
        ]);

        if (!uploadedFiles.files || uploadedFiles.files.length === 0) {
          throw new Error('Unable to upload ABI');
        }

        await tx.smartContract.updateMany({
          where: {
            chainId,
            isActive: true,
            metadata: {
              path: ['type'],
              equals: 'Escrow:ERC20',
            },
          },
          data: {
            isActive: false,
          },
        });

        const artifact = uploadedFiles.files[0];
        const deploymentBlockHeight = deployed.deploymentBlockHeight
          ? BigInt(deployed.deploymentBlockHeight)
          : null;
        const newVersion = await getNextSmartContractVersion(
          'Escrow:ERC20',
          chain.id,
          'patch',
        );

        const newDeployment = await tx.smartContract.create({
          data: {
            artifactUrl: artifact.key,
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
              type: 'Escrow:ERC20',
              parameters: {
                feeRate: defaultFeeRate,
                profitMargin: defaultProfitMargin,
              },
            },
          },
        });

        details = {
          abi: deployed.artifact.abi,
          address: deployed.contractAddress,
        };

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

    const cacheKey = 'smartContracts:escrow:erc20';
    await redisClient.del(cacheKey);
    const expiry = parseDurationToSeconds('1w');
    await redisClient.setEx(cacheKey, expiry, JSON.stringify(details));

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

export const deployEscrowNativeTokenSmartContract = async (
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

    let details: ContractDetails = { abi: null, address: null };

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
        const deployed = await deployEscrowNativeToken({
          defaultFeeRate,
          defaultProfitMargin,
          platformWallet,
          rpcUrl: chain.rpcUrl,
        });

        const file = convertArtifactToFile(deployed.artifact);
        const uploadedFiles = await uploadFiles('smart-contracts/escrow/', [
          file,
        ]);

        if (!uploadedFiles.files || uploadedFiles.files.length === 0) {
          throw new Error('Unable to upload ABI');
        }

        await tx.smartContract.updateMany({
          where: {
            chainId,
            isActive: true,
            metadata: {
              path: ['type'],
              equals: 'Escrow:NativeToken',
            },
          },
          data: {
            isActive: false,
          },
        });

        const artifact = uploadedFiles.files[0];
        const deploymentBlockHeight = deployed.deploymentBlockHeight
          ? BigInt(deployed.deploymentBlockHeight)
          : null;
        const newVersion = await getNextSmartContractVersion(
          'Escrow:NativeToken',
          chain.id,
          'patch',
        );

        const newDeployment = await tx.smartContract.create({
          data: {
            artifactUrl: artifact.key,
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
              type: 'Escrow:NativeToken',
              parameters: {
                feeRate: defaultFeeRate,
                profitMargin: defaultProfitMargin,
              },
            },
          },
        });

        details = {
          abi: deployed.artifact.abi,
          address: deployed.contractAddress,
        };

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

    const cacheKey = 'smartContracts:escrow:native';
    await redisClient.del(cacheKey);
    const expiry = parseDurationToSeconds('1w');
    await redisClient.setEx(cacheKey, expiry, JSON.stringify(details));

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
