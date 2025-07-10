import { Request, Response } from 'express';
import { deployEscrow, getEscrowContract } from '@/services/blockchains/escrow';

import { Readable } from 'node:stream';
import { ethers } from 'ethers';
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

      console.log({ chain });

      try {
        const deployed = await deployEscrow({
          defaultFeeRate,
          defaultProfitMargin,
          platformWallet,
          rpcUrl: chain.rpcUrl,
        });

        deployed.abi;
        const file = convertABIToFile(deployed.abi);

        console.log({ file });

        // const uploadedFiles = await uploadFiles('smart-contracts/escrow/');

        // TODO:
        // Implement upload Escrow ABI and return the ABI file url
        // Store the uploaded ABI file url tio smartContract abiUrl table

        // const newDeployment = await prisma.smartContract.create({
        //   data: {
        //     abiUrl: deployed.abi,
        //   },
        // });
      } catch (error) {
        return { error: 'Unable to process Escrow deployment' };
      }
    });

    // res.status(200).json(deployed);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};
