import { Request, Response } from 'express';
import {
  deployPremium,
  getContractBalance,
} from '@/services/blockchains/premium';
import { prisma, redisClient } from '@/services/db';

import { ContractDetails } from '@/services/blockchains/escrow/types';
import { Readable } from 'node:stream';
import { ethers } from 'ethers';
import { formatBigInt } from '@/utils/number';
import { getNextSmartContractVersion } from '@/services/blockchains';
import { getPremiumDetails as getPremiumDetailsERC20 } from '@/services/blockchains/premium';
import { getSetting } from '@/utils/settings';
import { parseDurationToSeconds } from '@/utils/date';
import { uploadFiles } from '@/services/upload';

export const convertArtifactToFile = (artifact: any) => {
  const artifactJson = JSON.stringify(artifact, null, 2);
  const artifactBuffer = Buffer.from(artifactJson);

  const multerFile: Express.Multer.File = {
    fieldname: 'abi',
    originalname: 'PremiumABI.json',
    mimetype: 'application/json',
    buffer: artifactBuffer,
    size: artifactBuffer.length,
    // other properties you can stub or mock if needed:
    encoding: '7bit',
    destination: '',
    filename: 'PremiumABI.json',
    path: '',
    stream: Readable.from(artifactBuffer),
  };

  return multerFile;
};

export const getPremiumDetails = async (req: Request, res: Response) => {
  try {
    const details = await getPremiumDetailsERC20();

    res.status(200).json(details);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deployPremiumSmartContract = async (
  req: Request,
  res: Response,
) => {
  try {
    const { monthlyPrice, yearlyPrice, chainId, platformWalletId, adminId } =
      req.body;

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

      const platformWallet = await tx.adminWallet.findFirst({
        where: { walletId: platformWalletId, adminId: admin.id },
        select: {
          wallet: true,
          id: true,
        },
      });

      if (!platformWallet) {
        throw new Error('Unable to find platform wallet');
      }

      try {
        const deployed = await deployPremium({
          monthlyPrice,
          yearlyPrice,
          platformWallet: platformWallet.wallet.address,
          chain: {
            id: chain.id,
            rpcUrl: chain.rpcUrl,
          },
        });

        const file = convertArtifactToFile(deployed.artifact);
        const uploadedFiles = await uploadFiles('smart-contracts/premium', [
          file,
        ]);

        if (!uploadedFiles.files || uploadedFiles.files.length === 0) {
          throw new Error('Unable to upload ABI');
        }

        let newWallet = await tx.wallet.findFirst({
          where: {
            address: deployed.deployerAddress,
          },
        });

        if (!newWallet) {
          newWallet = await tx.wallet.create({
            data: {
              address: deployed.deployerAddress,
            },
          });
        }

        let deployerWallet = await tx.adminWallet.findFirst({
          where: {
            adminId: admin.id,
            walletId: newWallet.id,
          },
        });

        if (!deployerWallet) {
          deployerWallet = await tx.adminWallet.create({
            data: {
              adminId: admin.id,
              walletId: newWallet.id,
            },
          });
        }

        await tx.smartContract.updateMany({
          where: {
            chainId,
            isActive: true,
            metadata: {
              path: ['type'],
              equals: 'Premium',
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
          'Premium',
          chain.id,
          'patch',
        );

        const newDeployment = await tx.smartContract.create({
          data: {
            artifactUrl: artifact.key,
            address: deployed.contractAddress,
            deployerWalletId: deployerWallet.id,
            platformWalletId: platformWallet.id,
            deploymentBlockHeight: deploymentBlockHeight,
            deploymentHash: deployed.deploymentHash,
            chainId: chain.id,
            deployedById: admin.id,
            version: newVersion,
            gasUsed: deployed.gasUsed,
            gasPrice: deployed.gasPrice,
            metadata: {
              type: 'Premium',
              parameters: {
                monthlyPrice: monthlyPrice,
                yearlyPrice: yearlyPrice,
              },
            },
          },
        });

        details = {
          abi: deployed.artifact.abi,
          address: deployed.contractAddress,
        };

        await tx.platformSetting.update({
          where: {
            key: 'premiumPriceMonthly',
          },
          data: {
            value: monthlyPrice.toString(),
          },
        });

        await tx.platformSetting.update({
          where: {
            key: 'premiumPriceYearly',
          },
          data: {
            value: yearlyPrice.toString(),
          },
        });

        return { deployed: newDeployment };
      } catch (error) {
        return { error: 'Unable to process Premium deployment' };
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

    const cacheKey = 'smartContracts:premium';
    await redisClient.del(cacheKey);
    const expiry = parseDurationToSeconds('1d');
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
    res.status(500).json({ error });
  }
};

export const getPremiumSmartContractBalance = async (
  _req: Request,
  res: Response,
) => {
  try {
    const balance = await getContractBalance();

    res.status(200).json(balance);
  } catch (error) {
    res.status(400).json(error);
  }
};
