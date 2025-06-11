import { DisputeResolutionType, DisputeType } from '@prisma/client';
import { Request, Response, response } from 'express';

import ChatMessage from '@/models/ChatMessage';
import { UserManagementActions } from './data';
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

export async function getDisputeUserManagementActions(
  _req: Request,
  res: Response,
) {
  try {
    console.log({ UserManagementActions });
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

export async function resolveInVendorFavor(req: Request, res: Response) {
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

export async function cancelTrade(req: Request, res: Response) {
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
