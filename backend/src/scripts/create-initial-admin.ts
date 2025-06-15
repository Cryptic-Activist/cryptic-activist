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
        create: [
          { role: 'AUDITOR' },
          { role: 'DISPUTE_MANAGER' },
          { role: 'FINANCE_MANAGER' },
          { role: 'KYC_REVIEWER' },
          { role: 'MODERATOR' },
          { role: 'SENIOR_ADMIN' },
          { role: 'SUPER_ADMIN' },
          { role: 'SUPPORT_AGENT' },
        ],
      },
    },
  });

  const disputeManagerEmail = 'dispute@manager.com';
  const disputeManagerPlainPassword = 'dispute';
  const disputeManagerHashedPassword = await bcrypt.hash(
    disputeManagerPlainPassword,
    10,
  );

  const disputeManagerExists = await prisma.admin.findUnique({
    where: { email: disputeManagerEmail },
  });
  if (disputeManagerExists) {
    console.log('Dispute Manager already exists');
    return;
  }

  const disputeManager = await prisma.admin.create({
    data: {
      firstName: 'Dispute',
      lastName: 'Manager',
      username: 'dispute-manager',
      email: disputeManagerEmail,
      password: disputeManagerHashedPassword,
      isVerified: true,
      roles: {
        create: [{ role: 'DISPUTE_MANAGER' }],
      },
    },
  });

  console.log('Admin created:', admin);
  console.log('Dispute Manager:', disputeManager);
  process.exit(0);
};

main().catch(console.error);
