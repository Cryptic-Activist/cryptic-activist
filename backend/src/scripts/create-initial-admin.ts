import 'dotenv/config';

import bcrypt from 'bcryptjs';
import { prisma } from '../services/db';

const main = async () => {
  const result = await prisma.$transaction(async (tx) => {
    const adminCount = await tx.admin.count();
    if (adminCount > 0) {
      console.log('Admin already exists. Skipping.');
      process.exit(0);
    }

    const email = process.env.SUPER_ADMIN_EMAIL as string;
    const plainPassword = process.env.SUPER_ADMIN_PASSWORD as string;
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const exists = await tx.admin.findUnique({ where: { email } });
    if (exists) {
      console.log('Admin already exists');
      return;
    }

    const admin = await tx.admin.create({
      data: {
        firstName: 'Cryptic',
        lastName: 'Activist',
        username: 'cryptic-activist',
        email,
        password: hashedPassword,
        isVerified: true,
      },
    });

    const disputeManagerEmail = 'dispute@manager.com';
    const disputeManagerPlainPassword = 'dispute';
    const disputeManagerHashedPassword = await bcrypt.hash(
      disputeManagerPlainPassword,
      10,
    );

    const disputeManagerExists = await tx.admin.findUnique({
      where: { email: disputeManagerEmail },
    });
    if (disputeManagerExists) {
      console.log('Dispute Manager already exists');
      return;
    }

    const disputeManager = await tx.admin.create({
      data: {
        firstName: 'Dispute',
        lastName: 'Manager',
        username: 'dispute-manager',
        email: disputeManagerEmail,
        password: disputeManagerHashedPassword,
        isVerified: true,
      },
    });

    await tx.adminRoles.createMany({
      data: [
        {
          role: 'AUDITOR',
        },
        {
          role: 'DISPUTE_MANAGER',
        },
        {
          role: 'FINANCE_MANAGER',
        },
        {
          role: 'KYC_REVIEWER',
        },
        {
          role: 'MODERATOR',
        },
        {
          role: 'SENIOR_ADMIN',
        },
        {
          role: 'SUPER_ADMIN',
        },
        {
          role: 'SUPPORT_AGENT',
        },
      ],
    });

    const roles = await tx.adminRoles.findMany();

    const filteredDisputeManager = roles.find((role) => {
      return role.role === 'DISPUTE_MANAGER';
    });

    if (!filteredDisputeManager) {
      throw new Error('DISPUTE_MANAGER role not found in adminRoles');
    }

    await tx.adminAdminRole.createMany({
      data: roles.map((r) => ({
        adminId: admin.id,
        adminRolesId: r.id,
      })),
    });

    await tx.adminAdminRole.create({
      data: {
        adminId: disputeManager.id,
        adminRolesId: filteredDisputeManager.id,
      },
    });

    return { admin, disputeManager };
  });

  console.log('Admin created:', result?.admin);
  console.log('Dispute Manager:', result?.disputeManager);
  process.exit(0);
};

main().catch(console.error);
