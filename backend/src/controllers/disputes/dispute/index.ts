import {
  DisputeAction,
  DisputeResolutionType,
  DisputeStatus,
  DisputeType,
  SystemMessageType,
  TradeStatus,
} from '@prisma/client';
import { Request, Response, response } from 'express';
import { cancelTrade, confirmTrade } from '@/services/blockchains/ethereum';

import ChatMessage from '@/models/ChatMessage';
import SystemMessage from '@/services/systemMessage';
import { UserManagementActions } from './data';
import { parseEther } from 'ethers';
import { prisma } from '@/services/db';

export async function getDisputeTypes(_req: Request, res: Response) {
  try {
    const disputeTypes = Object.keys(DisputeType).map((type) => type);
    res.status(200).json(disputeTypes);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function createDispute(req: Request, res: Response) {
  try {
    const body = req.body;

    const disputeTypes = Object.keys(DisputeType).map((type) => type);
    res.status(200).json(disputeTypes);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getDisputeAdmin(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const dispute = await prisma.tradeDispute.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        priority: true,
        severity: true,
        status: true,
        type: true,
        slaDueAt: true,
        evidences: {
          select: {
            fileUrl: true,
            submittedBy: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        raisedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
        traderStatement: true,
        vendorStatement: true,
        resolutionNote: true,
        resolvedAt: true,
        createdAt: true,
        updatedAt: true,
        moderator: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
            id: true,
          },
        },
        trade: {
          select: {
            id: true,
            fiatAmount: true,
            exchangeRate: true,
            startedAt: true,
            paidAt: true,
            endedAt: true,
            fundedAt: true,
            createdAt: true,
            expiredAt: true,
            disputedAt: true,
            escrowReleasedAt: true,
            paymentConfirmedAt: true,
            chat: {
              select: {
                id: true,
              },
            },
            paymentReceipt: {
              select: {
                createdAt: true,
              },
            },
            offer: {
              select: {
                offerType: true,
                paymentMethod: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            fiat: {
              select: {
                symbol: true,
              },
            },
            cryptocurrency: {
              select: {
                symbol: true,
              },
            },
            cryptocurrencyAmount: true,
            vendor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                profileColor: true,
              },
            },
            trader: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                profileColor: true,
              },
            },
          },
        },
        loser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
        winner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
      },
    });

    let query = ChatMessage.find(
      { chatId: dispute?.trade?.chat?.id, type: { $ne: 'info' } },
      'createdAt from message type to',
    );

    query = query.sort('desc');

    const chatMessages = await query.exec();

    res.status(200).json({
      ...dispute,
      trade: {
        ...dispute?.trade,
        chat: {
          ...dispute?.trade?.chat,
          messages: chatMessages,
        },
      },
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export const addDisputePartyNote = async (req: Request, res: Response) => {
  try {
    const { disputeId, userId, adminId, content } = req.body;

    const dispute = await prisma.tradeDispute.findUnique({
      where: {
        id: disputeId,
      },
      select: {
        id: true,
      },
    });

    if (!dispute) {
      res.status(404).json({
        error: 'Dispute not found',
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      res.status(404).json({
        error: 'User not found',
      });
      return;
    }

    const admin = await prisma.admin.findUnique({
      where: {
        id: adminId,
      },
      select: {
        id: true,
      },
    });

    if (!admin) {
      res.status(404).json({
        error: 'Admin not found',
      });
      return;
    }

    const newDisputePartyNote = await prisma.disputePartyNote.create({
      data: {
        content,
        addedById: admin.id,
        disputeId: dispute.id,
        targetUserId: user.id,
      },
    });

    res.status(200).json(newDisputePartyNote);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export const getPreviousDisputePartyNote = async (
  req: Request,
  res: Response,
) => {
  try {
    const traderId = req.query.traderId as string;
    const vendorId = req.query.vendorId as string;

    const disputePartyNoteTrader = await prisma.disputePartyNote.findFirst({
      where: {
        targetUserId: traderId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        dispute: {
          select: {
            id: true,
            tradeId: true,
            status: true,
          },
        },
        addedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
    const disputePartyNoteVendor = await prisma.disputePartyNote.findFirst({
      where: {
        targetUserId: vendorId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        dispute: {
          select: {
            id: true,
            tradeId: true,
            status: true,
          },
        },
        addedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    res
      .status(200)
      .json({ trader: disputePartyNoteTrader, vendor: disputePartyNoteVendor });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export async function getDisputeResolutionTypes(_req: Request, res: Response) {
  try {
    const disputeResolutionTypes = Object.keys(DisputeResolutionType).map(
      (type) => type,
    );
    res.status(200).json(disputeResolutionTypes);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function addResolutionDecision(req: Request, res: Response) {
  try {
    const {
      disputeId,
      resolutionType,
      resolutionNote,
      notifyBothUsers,
      logAdminAction,
    } = req.body;

    console.log(req.body);

    const dispute = await prisma.tradeDispute.findUnique({
      where: {
        id: disputeId,
      },
      select: {
        id: true,
        moderatorId: true,
        trade: {
          select: {
            id: true,
            vendor: {
              select: {
                id: true,
              },
            },
            trader: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    if (!dispute) {
      res.status(404).json({
        error: 'Dispute not found',
      });
      return;
    }

    const updatedTradeDispute = await prisma.tradeDispute.update({
      where: {
        id: disputeId,
      },
      data: {
        resolutionNote,
        resolutionType,
      },
    });

    if (logAdminAction) {
      console.log('logging admin activity');
      const disputeAuditLog = await prisma.disputeAuditLog.create({
        data: {
          action: 'DECISION_MADE',
          disputeId: disputeId,
          changedById: dispute.moderatorId,
        },
      });
    }

    if (notifyBothUsers) {
      const systemMessage = new SystemMessage();
      await systemMessage.tradeDisputeResolution(dispute.trade.id);
      console.log('notifying both users');
    }

    // const disputeResolutionTypes = Object.keys(DisputeResolutionType).map(
    //   (type) => type,
    // );
    res.status(200).json({
      ok: true,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getDisputeUserManagementActions(
  _req: Request,
  res: Response,
) {
  try {
    const disputeTypes = Object.keys(UserManagementActions).map((type) => type);
    res.status(200).json(disputeTypes);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function triggerAction(req: Request, res: Response) {
  try {
    const { actionForTrader, actionForVendor } = req.body;

    console.log({ actionForTrader, actionForVendor });

    switch (actionForTrader) {
      case UserManagementActions.NO_ACTION: {
      }
    }

    const disputeTypes = Object.values(UserManagementActions).map(
      (type) => type,
    );
    res.status(200).json(disputeTypes);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function resolveInTraderFavor(req: Request, res: Response) {
  try {
    const { disputeId } = req.body;

    // Fetch dispute with related trade
    const dispute = await prisma.tradeDispute.findUnique({
      where: { id: disputeId },
      include: {
        trade: true,
        moderator: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!dispute) {
      res.status(404).json({ errors: ['Dispute not found.'] });
      return;
    }

    const trade = dispute.trade;

    if (!trade || trade.status !== TradeStatus.DISPUTED) {
      res.status(400).json({ errors: ['Trade is not in a disputable state.'] });
      return;
    }

    // Update dispute: resolved in trader's favor
    await prisma.$transaction([
      prisma.tradeDispute.update({
        where: { id: disputeId },
        data: {
          status: DisputeStatus.RESOLVED,
          resolutionType: DisputeResolutionType.RELEASE_CRYPTO,
          winnerId: trade.traderId,
          loserId: trade.vendorId,
          resolvedAt: new Date(),
        },
      }),
      prisma.trade.update({
        where: { id: trade.id },
        data: {
          status: TradeStatus.COMPLETED,
          escrowReleasedAt: new Date(),
          endedAt: new Date(),
        },
      }),
      prisma.systemMessage.create({
        data: {
          type: SystemMessageType.TRADE_DISPUTE_RESOLVED,
          userId: dispute.trade.traderId,
          message: `The dispute for trade #${dispute.tradeId} has been resolved in the trader's favor.`,
          url: `/trades/${dispute.tradeId}`,
        },
      }),
      prisma.disputeAuditLog.create({
        data: {
          disputeId,
          changedById: dispute.moderator?.id,
          action: DisputeAction.DECISION_MADE,
          note: "Dispute resolved in trader's favor by admin.",
        },
      }),
    ]);

    if (dispute.trade?.blockchainTradeId?.toString()) {
      const confirmedTrade = await confirmTrade(
        dispute.trade.blockchainTradeId,
        parseEther(dispute.trade?.cryptocurrencyAmount.toString()),
      );
    }
    res.status(200).json({ message: "Dispute resolved in trader's favor." });
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function resolveInVendorFavor(req: Request, res: Response) {
  const { disputeId, moderatorId } = req.body;

  try {
    const dispute = await prisma.tradeDispute.findUnique({
      where: { id: disputeId },
      include: { trade: true },
    });

    if (!dispute) {
      res.status(404).json({ errors: ['Dispute not found'] });
      return;
    }

    if (
      dispute.status === DisputeStatus.RESOLVED ||
      dispute.status === DisputeStatus.CLOSED
    ) {
      res.status(400).json({ errors: ['Dispute already resolved'] });
      return;
    }

    const now = new Date();

    await prisma.$transaction([
      // Update the trade
      prisma.trade.update({
        where: { id: dispute.tradeId },
        data: {
          status: TradeStatus.COMPLETED,
          escrowReleasedAt: now,
        },
      }),

      // Update the dispute
      prisma.tradeDispute.update({
        where: { id: disputeId },
        data: {
          status: DisputeStatus.RESOLVED,
          resolutionType: DisputeResolutionType.RELEASE_CRYPTO,
          resolvedAt: now,
          moderatorId,
          winnerId: dispute.trade.vendorId,
          loserId: dispute.trade.traderId,
        },
      }),

      // System message to vendor (winner)
      prisma.systemMessage.create({
        data: {
          type: SystemMessageType.TRADE_DISPUTE_RESOLVED,
          userId: dispute.trade.vendorId,
          message: `The dispute for trade #${dispute.tradeId} has been resolved in your favor.`,
          url: `/trades/${dispute.tradeId}`,
        },
      }),

      // System message to trader (loser)
      prisma.systemMessage.create({
        data: {
          type: SystemMessageType.TRADE_DISPUTE_RESOLVED,
          userId: dispute.trade.traderId,
          message: `The dispute for trade #${dispute.tradeId} has been resolved in the vendor's favor.`,
          url: `/trades/${dispute.tradeId}`,
        },
      }),

      // Dispute audit log
      prisma.disputeAuditLog.create({
        data: {
          disputeId,
          changedById: moderatorId,
          action: DisputeAction.DECISION_MADE,
          note: `Moderator resolved the dispute in favor of the vendor.`,
        },
      }),
    ]);

    res.status(200).json({ message: "Dispute resolved in vendor's favor." });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({
      errors: [err.message || 'An error occurred while resolving the dispute.'],
    });
  }
}

export async function requestMoreEvidences(req: Request, res: Response) {
  try {
    const { actionForTrader, actionForVendor } = req.body;

    console.log({ actionForTrader, actionForVendor });

    switch (actionForTrader) {
      case UserManagementActions.NO_ACTION: {
      }
    }

    const disputeTypes = Object.values(UserManagementActions).map(
      (type) => type,
    );
    res.status(200).json(disputeTypes);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function escalateToSeniorAdmin(req: Request, res: Response) {
  try {
    const { actionForTrader, actionForVendor } = req.body;

    console.log({ actionForTrader, actionForVendor });

    switch (actionForTrader) {
      case UserManagementActions.NO_ACTION: {
      }
    }

    const disputeTypes = Object.values(UserManagementActions).map(
      (type) => type,
    );
    res.status(200).json(disputeTypes);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function contractBothUsers(req: Request, res: Response) {
  try {
    const { actionForTrader, actionForVendor } = req.body;

    console.log({ actionForTrader, actionForVendor });

    switch (actionForTrader) {
      case UserManagementActions.NO_ACTION: {
      }
    }

    const disputeTypes = Object.values(UserManagementActions).map(
      (type) => type,
    );
    res.status(200).json(disputeTypes);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function cancelTradeByModerator(req: Request, res: Response) {
  const { disputeId, adminId } = req.body;

  try {
    const dispute = await prisma.tradeDispute.findUnique({
      where: { id: disputeId },
      include: { trade: true },
    });

    if (!dispute) {
      res.status(404).json({ errors: ['Dispute not found'] });
      return;
    }

    if (
      dispute.status === DisputeStatus.RESOLVED ||
      dispute.status === DisputeStatus.CLOSED
    ) {
      res.status(400).json({ errors: ['Dispute already resolved'] });
      return;
    }

    const now = new Date();

    await prisma.$transaction([
      // Update the trade status
      prisma.trade.update({
        where: { id: dispute.tradeId },
        data: {
          status: TradeStatus.CANCELLED,
          endedAt: now,
        },
      }),

      // Update the dispute status
      prisma.tradeDispute.update({
        where: { id: disputeId },
        data: {
          status: DisputeStatus.RESOLVED,
          resolutionType: DisputeResolutionType.CANCEL_TRADE,
          resolvedAt: now,
          moderatorId: dispute.moderatorId,
        },
      }),

      // Send system message to trader
      prisma.systemMessage.create({
        data: {
          type: SystemMessageType.TRADE_DISPUTE_RESOLVED,
          userId: dispute.trade.traderId,
          message: `The dispute for trade #${dispute.tradeId} was resolved by canceling the trade.`,
          url: `/trades/${dispute.tradeId}`,
        },
      }),

      // Send system message to vendor
      prisma.systemMessage.create({
        data: {
          type: SystemMessageType.TRADE_DISPUTE_RESOLVED,
          userId: dispute.trade.vendorId,
          message: `The dispute for trade #${dispute.tradeId} was resolved by canceling the trade.`,
          url: `/trades/${dispute.tradeId}`,
        },
      }),

      // Audit log entry
      prisma.disputeAuditLog.create({
        data: {
          disputeId,
          changedById: dispute.moderatorId,
          action: DisputeAction.DECISION_MADE,
          note: `Moderator resolved the dispute by canceling the trade.`,
        },
      }),
    ]);

    if (dispute.trade?.blockchainTradeId?.toString()) {
      const canceledTrade = await cancelTrade(dispute.trade.blockchainTradeId);
    }

    res
      .status(200)
      .json({ message: 'Trade canceled successfully by moderator.' });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({
      errors: [err.message || 'An error occurred while canceling the trade.'],
    });
  }
}
