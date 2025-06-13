import { prisma } from '../db';

export const getRandomAdmin = async (basicInfo = false) => {
  const count = await prisma.admin.count();
  if (count === 0) return null;

  const randomIndex = Math.floor(Math.random() * count);
  const [randomAdmin] = await prisma.admin.findMany({
    take: 1,
    skip: randomIndex,
    orderBy: { id: 'asc' },
    ...(basicInfo && {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
      },
    }),
  });

  return randomAdmin;
};
