import { Request, Response } from 'express';

import { Readable } from 'node:stream';
import { deployPremium } from '@/services/blockchains/premium';
import { ethers } from 'ethers';
import { formatBigInt } from '@/utils/number';
import { getNextSmartContractVersion } from '@/services/blockchains';
import { prisma } from '@/services/db';
import { uploadFiles } from '@/services/upload';

const convertABIToFile = (abi: any) => {
  const abiJson = JSON.stringify(abi, null, 2);
  const abiBuffer = Buffer.from(abiJson);

  const multerFile: Express.Multer.File = {
    fieldname: 'abi',
    originalname: 'PremiumABI.json',
    mimetype: 'application/json',
    buffer: abiBuffer,
    size: abiBuffer.length,
    // other properties you can stub or mock if needed:
    encoding: '7bit',
    destination: '',
    filename: 'PremiumABI.json',
    path: '',
    stream: Readable.from(abiBuffer),
  };

  return multerFile;
};

export const deployPremiumSmartContract = async (
  req: Request,
  res: Response,
) => {
  try {
    const { monthlyPrice, yearlyPrice, chainId, platformWallet, adminId } =
      req.body;

    res.status(200).json({ message: 'Implementation is not ready yet' });
    return;

    // const transactions = await prisma.$transaction(async (tx) => {
    //   const admin = await tx.admin.findUnique({
    //     where: {
    //       id: adminId,
    //     },
    //     select: {
    //       id: true,
    //     },
    //   });

    //   if (!admin) {
    //     throw new Error('Admin not found');
    //   }

    //   const chain = await tx.chain.findFirst({
    //     where: {
    //       id: chainId,
    //     },
    //     select: {
    //       rpcUrl: true,
    //       id: true,
    //     },
    //   });

    //   if (!chain) {
    //     throw new Error('Chain not found');
    //   }
    //   if (!chain.rpcUrl) {
    //     throw new Error('Chain RPC URL not found');
    //   }

    //   try {
    //     const deployed = await deployPremium({
    //       monthlyPrice,
    //       yearlyPrice,
    //       platformWallet,
    //       rpcUrl: chain.rpcUrl,
    //     });

    //     const file = convertABIToFile(deployed);
    //     const uploadedFiles = await uploadFiles('smart-contracts/escrow/', [
    //       file,
    //     ]);

    //     if (!uploadedFiles.files || uploadedFiles.files.length === 0) {
    //       throw new Error('Unable to upload ABI');
    //     }

    //     await tx.smartContract.updateMany({
    //       where: {
    //         chainId,
    //         isActive: true,
    //         metadata: {
    //           path: ['type'],
    //           equals: 'Premium',
    //         },
    //       },
    //       data: {
    //         isActive: false,
    //       },
    //     });

    //     const abi = uploadedFiles.files[0];
    //     const deploymentBlockHeight = deployed.deploymentBlockHeight
    //       ? BigInt(deployed.deploymentBlockHeight)
    //       : null;
    //     const newVersion = await getNextSmartContractVersion(
    //       'Premium',
    //       chain.id,
    //       'patch',
    //     );

    //     const newDeployment = await tx.smartContract.create({
    //       data: {
    //         artifactUrl: abi.key,
    //         address: deployed.contractAddress,
    //         deployerAddress: deployed.deployerAddress,
    //         deploymentBlockHeight: deploymentBlockHeight,
    //         deploymentHash: deployed.deploymentHash,
    //         chainId: chain.id,
    //         deployedById: admin.id,
    //         version: newVersion,
    //         gasUsed: deployed.gasUsed,
    //         gasPrice: deployed.gasPrice,
    //         metadata: {
    //           type: 'Premium',
    //           parameters: {
    //             monthlyPrice: monthlyPrice,
    //             yearlyPrice: yearlyPrice,
    //           },
    //         },
    //       },
    //     });

    //     return { deployed: newDeployment };
    //   } catch (error) {
    //     return { error: 'Unable to process Premium deployment' };
    //   }
    // });

    // if (transactions.error || !transactions.deployed) {
    //   res.status(400).json({
    //     error: transactions.error,
    //   });
    //   return;
    // }

    // const { gasPrice, gasUsed, deploymentBlockHeight, ...rest } =
    //   transactions.deployed;

    // const convertedGasPrice = formatBigInt(gasPrice);
    // const convertedGasUsed = formatBigInt(gasUsed);
    // const convertedDeploymentBlockHeight = formatBigInt(deploymentBlockHeight);

    // res.status(200).json({
    //   deployed: {
    //     gasPrice: convertedGasPrice,
    //     gasUsed: convertedGasUsed,
    //     deploymentBlockHeight: convertedDeploymentBlockHeight,
    //     ...rest,
    //   },
    // });
  } catch (error) {
    res.status(500).json({ error });
  }
};
