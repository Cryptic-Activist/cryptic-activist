import 'dotenv/config';

import bcrypt from 'bcryptjs';
import { prisma } from '../services/db';

const main = async () => {
  const adminCount = await prisma.admin.count();
  if (adminCount > 0) {
    console.log('Admin already exists. Skipping.');
    process.exit(0);
  }

  const email = process.env.SUPER_ADMIN_EMAIL as string;
  const plainPassword = process.env.SUPER_ADMIN_PASSWORD as string;
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const exists = await prisma.admin.findUnique({ where: { email } });
  if (exists) {
    console.log('Admin already exists');
    return;
  }

  const admin = await prisma.admin.create({
    data: {
      firstName: 'Cryptic',
      lastName: 'Activist',
      username: 'cryptic-activist',
      email,
      password: hashedPassword,
      isVerified: true,
      roles: {
        create: [{ role: 'SUPER_ADMIN' }, { role: 'AUDITOR' }],
      },
    },
  });

  console.log('Admin created:', admin);
  process.exit(0);
};

main().catch(console.error);
