import { cancelTrade as cancelTradeERC20 } from '../blockchains/escrow/erc20';
import { cancelTrade as cancelTradeNative } from '../blockchains/escrow/native';
import { getRandomSeniorSuperAdmin } from '../admin';
import { prisma } from '../db';

export const closeAllOverdueDispute = async () => {
  const now = new Date();
  const admin = await getRandomSeniorSuperAdmin();

  // Step 1: Find overdue disputes that are not already closed or resolved
  const overdueDisputes = await prisma.tradeDispute.findMany({
    where: {
      slaDueAt: { lt: now },
      status: {
        in: ['OPEN', 'PENDING_EVIDENCE', 'INVESTIGATING', 'ESCALATED'],
      },
    },
    select: {
      id: true,
      trade: {
        select: {
          id: true,
          blockchainTradeId: true,
          cryptocurrency: {
            select: {
              chains: {
                select: {
                  abiUrl: true,
                  contractAddress: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (overdueDisputes.length === 0)
    return { message: 'No overdue disputes found' };

  // Step 2: Create transaction steps for each dispute
  const tx = overdueDisputes.flatMap(({ id, trade }) => [
    prisma.trade.update({
      where: { id: trade.id },
      data: {
        status: 'CANCELLED',
      },
    }),
    prisma.tradeDispute.update({
      where: { id },
      data: {
        status: 'CLOSED',
        resolutionNote: 'Automatically closed due to SLA expiration.',
        resolutionType: 'NO_ACTION_TAKEN',
        resolvedAt: now,
      },
    }),
    prisma.disputeAuditLog.create({
      data: {
        action: 'STATUS_CHANGED',
        changedById: admin?.id,
        disputeId: id,
        note: 'Auto-closed past due dispute and related trade.',
      },
    }),
  ]);

  // Step 3: Run all updates in a single transaction
  const results = await prisma.$transaction(tx);

  const promises = overdueDisputes.map(async ({ trade }) => {
    if (trade.blockchainTradeId) {
      let isERC20TokenTrade = true;

      if (
        trade.cryptocurrency.chains[0]?.abiUrl === null &&
        trade.cryptocurrency.chains[0]?.contractAddress === null
      ) {
        isERC20TokenTrade = false;
      }

      let cancelled;

      if (isERC20TokenTrade) {
        cancelled = await cancelTradeERC20(trade.blockchainTradeId);
      } else {
        cancelled = await cancelTradeNative(trade.blockchainTradeId);
      }

      return cancelled;
    }
  });

  const cancelledBlockchainTrades = await Promise.all(promises);

  return {
    message: `${overdueDisputes.length} disputes and related trades were closed.`,
    affected: overdueDisputes.length,
    results,
    cancelledBlockchainTrades,
  };
};
