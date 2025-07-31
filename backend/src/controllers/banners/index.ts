import { Request, Response } from 'express';

import { BannerSchema } from '@/dtos/banners';
import { prisma } from '@/services/db';

export const createBanner = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const banner = await prisma.banner.create({
      data: req.body,
    });
    res.status(201).json(banner);
  } catch (error: any) {
    console.log({ error });
    res.status(500).json({ error: error.message });
  }
};

export const getBanners = async (_req: Request, res: Response) => {
  try {
    const banners = await prisma.banner.findMany();
    res.status(200).json(banners);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBannerById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const banner = await prisma.banner.findUnique({ where: { id } });

    if (banner) {
      res.status(200).json(banner);
    } else {
      res.status(404).json({ message: 'Banner not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBanner = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = BannerSchema.parse(req.body);

    const banner = await prisma.banner.update({ where: { id }, data });
    res.status(200).json(banner);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBanner = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await prisma.banner.delete({ where: { id } });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getDisplayBanners = async (req: Request, res: Response) => {
  try {
    const { targetWebsite, currentPage } = req.query;

    const now = new Date();
    const banners = await prisma.banner.findMany({
      where: {
        targetWebsite: targetWebsite as string,
        isActive: true,
        startDate: {
          lte: now,
        },
        endDate: {
          gte: now,
        },
        pages: {
          has: currentPage as string,
        },
      },
    });

    res.status(200).json(banners);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
