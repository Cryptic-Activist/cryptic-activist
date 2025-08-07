import {
  DisputeAction,
  DisputeResolutionType,
  DisputeStatus,
  DisputeType,
  SystemMessageType,
  TradeStatus,
} from '@prisma/client';
import { Request, Response, response } from 'express';
import {
  cancelTrade as cancelTradeERC20,
  executeTrade as executeTradeERC20,
} from '@/services/blockchains/escrow/erc20';
import {
  cancelTrade as cancelTradeNative,
  executeTrade as executeTradeNative,
} from '@/services/blockchains/escrow/native';
import {
  createAccountReview,
  escalateDispute,
  getSuspensionDuration,
  requestMoreEvidence,
  sendTradeDisputeUserWarning,
  suspendUser,
} from '@/services/moderation';

import ChatMessage from '@/models/ChatMessage';
import SystemMessage from '@/services/systemMessage';
import { UserManagementActions } from './data';
import { getFutureDate } from '@/utils/date';
import { getPresignedUrl } from '@/services/upload';
import { isERC20Trade } from '@/services/blockchains';
import { parseEther } from 'ethers';
import { prisma } from '@/services/db';
import { retrieveChatMessageWithAttachments } from '@/services/chat';

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
            file: true,
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
        disputeEvidenceRequest: {
          select: {
            requestedFromId: true,
          },
        },
        vendorStatement: true,
        resolutionNote: true,
        resolutionType: true,
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
                kyc: {
                  where: {
                    status: 'VERIFIED',
                  },
                  select: {
                    status: true,
                  },
                },
              },
            },
            trader: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                profileColor: true,
                kyc: {
                  where: {
                    status: 'VERIFIED',
                  },
                  select: {
                    status: true,
                  },
                },
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

    if (!dispute) {
      res.status(404).json({
        errors: ['Dispute not found'],
      });
      return;
    }

    const mappedEvidences = dispute.evidences.map(async (evidence) => {
      if (!evidence.file || !evidence.file.key) {
        return evidence;
      }

      const evidencePresigned = await getPresignedUrl(evidence.file.key);
      return {
        ...evidence,
        file: {
          ...evidence.file,
          key: evidencePresigned.url,
        },
      };
    });

    const promisedEvidences = await Promise.all(mappedEvidences);

    let query = ChatMessage.find(
      { chatId: dispute.trade?.chat?.id, type: { $ne: 'info' } },
      'createdAt from message type to attachment',
    );

    query = query.sort('desc');

    const chatMessages = await query.exec();
    const chatMessagesWithAttachments =
      await retrieveChatMessageWithAttachments(chatMessages);

    res.status(200).json({
      ...dispute,
      evidences: promisedEvidences,
      trade: {
        ...dispute.trade,
        chat: {
          ...dispute.trade?.chat,
          messages: chatMessagesWithAttachments,
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
    }

    // const disputeResolutionTypes = Object.keys(DisputeResolutionType).map(
    //   (type) => type,
    // );
    res.status(200).json({
      resolutionNote,
      resolutionType,
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
    const { disputeId, actionForTrader, actionForVendor, moderatorId } =
      req.body;

    const dispute = await prisma.tradeDispute.findUnique({
      where: {
        id: disputeId,
      },
      select: {
        id: true,
        severity: true,
        trade: {
          select: {
            trader: {
              select: {
                id: true,
              },
            },
            vendor: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    if (!dispute?.trade?.trader?.id) {
      res.status(400).json({
        error: 'Trader is not found',
      });
      return;
    }

    if (!dispute?.trade?.vendor?.id) {
      res.status(400).json({
        error: 'Vendor is not found',
      });
      return;
    }

    switch (actionForTrader) {
      case UserManagementActions.NO_ACTION: {
        break;
      }
      case UserManagementActions.TEMPORARY_SUSPENSION: {
        const userSuspension = await prisma.user.findUnique({
          where: {
            id: dispute.trade.trader.id,
          },
          select: {
            isSuspended: true,
          },
        });

        const isUserAlreadySuspended = userSuspension?.isSuspended;
        if (!isUserAlreadySuspended) {
          const suspensionInDays = await getSuspensionDuration(
            dispute.severity,
            dispute.trade.trader.id,
          );
          const suspendedUntil = getFutureDate({
            days: suspensionInDays,
          });
          await suspendUser({
            moderatorId,
            reason: 'Disciplinary suspension after dispute resolution',
            userId: dispute?.trade?.trader?.id,
            disputeId: dispute?.id,
            suspendedUntil,
          });
        }
        break;
      }
      case UserManagementActions.SEND_WARNING: {
        await sendTradeDisputeUserWarning({
          message:
            'Disciplinary warning after dispute resolution. Repeated warnings will lead to temporary and permanent account suspension.',
          userId: dispute?.trade?.trader?.id,
          issuedByAdminId: moderatorId,
          relatedDisputeId: dispute.id,
        });
        break;
      }
      case UserManagementActions.ACCOUNT_REVIEW: {
        await createAccountReview({
          userId: dispute.trade.trader.id,
          reason: 'Flagged for manual account review after dispute resolution',
          relatedDisputeId: dispute.id,
          reviewerId: moderatorId,
        });
        break;
      }
    }

    switch (actionForVendor) {
      case UserManagementActions.NO_ACTION: {
        break;
      }
      case UserManagementActions.TEMPORARY_SUSPENSION: {
        const userSuspension = await prisma.user.findUnique({
          where: {
            id: dispute.trade.vendor.id,
          },
          select: {
            isSuspended: true,
          },
        });

        const isUserAlreadySuspended = userSuspension?.isSuspended;
        if (!isUserAlreadySuspended) {
          const suspensionInDays = await getSuspensionDuration(
            dispute.severity,
            dispute.trade.vendor.id,
          );
          const suspendedUntil = getFutureDate({
            days: suspensionInDays,
          });
          await suspendUser({
            moderatorId,
            reason: 'Disciplinary suspension after dispute resolution',
            userId: dispute?.trade?.vendor?.id,
            disputeId: dispute?.id,
            suspendedUntil,
          });
        }
        break;
      }
      case UserManagementActions.SEND_WARNING: {
        await sendTradeDisputeUserWarning({
          message:
            'Disciplinary warning after dispute resolution. Repeated warnings will lead to temporary and permanent account suspension.',
          userId: dispute?.trade?.vendor?.id,
          issuedByAdminId: moderatorId,
          relatedDisputeId: dispute.id,
        });
        break;
      }
      case UserManagementActions.ACCOUNT_REVIEW: {
        await createAccountReview({
          userId: dispute.trade.vendor.id,
          reason: 'Flagged for manual account review after dispute resolution',
          relatedDisputeId: dispute.id,
          reviewerId: moderatorId,
        });
        break;
      }
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.log({ err });
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
      select: {
        tradeId: true,
        trade: {
          select: {
            id: true,
            status: true,
            traderId: true,
            vendorId: true,
            blockchainTradeId: true,
            cryptocurrency: {
              select: {
                chains: {
                  select: {
                    abi: {
                      select: {
                        key: true,
                      },
                    },
                  },
                },
              },
            },
            fiatAmount: true,
            vendor: {
              select: {
                id: true,
                tradeVolume: true,
              },
            },
            trader: {
              select: {
                id: true,
                tradeVolume: true,
              },
            },
          },
        },
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

    const now = new Date();
    // Update dispute: resolved in trader's favor
    const transaction = await prisma.$transaction([
      prisma.tradeDispute.update({
        where: { id: disputeId },
        data: {
          status: DisputeStatus.RESOLVED,
          resolutionType: DisputeResolutionType.RELEASE_CRYPTO,
          winnerId: trade.traderId,
          loserId: trade.vendorId,
          resolvedAt: now,
        },
      }),
      prisma.trade.update({
        where: { id: trade.id },
        data: {
          status: TradeStatus.COMPLETED,
          escrowReleasedAt: now,
          endedAt: now,
        },
      }),
      prisma.user.update({
        where: {
          id: trade.vendor.id,
        },
        data: {
          tradeVolume: trade.vendor.tradeVolume?.add(trade.fiatAmount),
        },
      }),
      prisma.user.update({
        where: {
          id: trade.trader.id,
        },
        data: {
          tradeVolume: trade.vendor.tradeVolume?.add(trade.fiatAmount),
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
      const isERC20TokenTrade = await isERC20Trade(dispute.tradeId);

      let executedTrade;

      if (isERC20TokenTrade) {
        executedTrade = await executeTradeERC20(
          dispute.trade.blockchainTradeId,
        );
      } else {
        executedTrade = await executeTradeNative(
          dispute.trade.blockchainTradeId,
        );
      }
    }

    res.status(200).json({
      resolvedAt: now,
    });
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
      select: {
        tradeId: true,
        status: true,
        trade: {
          select: {
            blockchainTradeId: true,
            vendorId: true,
            traderId: true,
            cryptocurrency: {
              select: {
                chains: true,
              },
            },
          },
        },
      },
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
          status: TradeStatus.CANCELLED,
          escrowReleasedAt: now,
        },
      }),
      // Update the dispute
      prisma.tradeDispute.update({
        where: { id: disputeId },
        data: {
          status: DisputeStatus.RESOLVED,
          resolutionType: DisputeResolutionType.CANCEL_TRADE,
          resolvedAt: now,
          moderatorId,
          winnerId: dispute.trade.vendorId,
          loserId: dispute.trade.traderId,
        },
      }),
      // System message to vendor (winner)
      prisma.systemMessage.create({
        data: {
          type: SystemMessageType.TRADE_CANCELLED_BY_MODERATOR,
          userId: dispute.trade.vendorId,
          message: `The dispute for trade #${dispute.tradeId} has been resolved in your favor.`,
          url: `/trade/${dispute.tradeId}/details`,
        },
      }),
      // System message to trader (loser)
      prisma.systemMessage.create({
        data: {
          type: SystemMessageType.TRADE_CANCELLED_BY_MODERATOR,
          userId: dispute.trade.traderId,
          message: `The dispute for trade #${dispute.tradeId} has been resolved in the vendor's favor.`,
          url: `/trade/${dispute.tradeId}/details`,
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

    if (dispute.trade?.blockchainTradeId?.toString()) {
      const isERC20TokenTrade = await isERC20Trade(dispute?.trade.traderId);

      let canceledTrade;

      if (isERC20TokenTrade) {
        canceledTrade = await cancelTradeERC20(
          dispute.trade.blockchainTradeId,
          true,
        );
      } else {
        canceledTrade = await cancelTradeNative(
          dispute.trade.blockchainTradeId,
          true,
        );
      }
    }

    res.status(200).json({
      resolvedAt: now,
    });

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
    const { disputeId, requestedFrom } = req.body;

    const dispute = await prisma.tradeDispute.findUnique({
      where: { id: disputeId },
      select: {
        id: true,
        moderatorId: true,
        trade: {
          select: {
            traderId: true,
            vendorId: true,
          },
        },
      },
    });

    if (!dispute) {
      res.status(404).json({ errors: ['Dispute not found'] });
      return;
    }

    if (!dispute.moderatorId) {
      res.status(404).json({ errors: ['Dispute moderator not found'] });
      return;
    }

    let requestedFromId = '';

    if (requestedFrom === 'vendor') {
      requestedFromId = dispute.trade.vendorId;
    } else if (requestedFrom === 'trader') {
      requestedFromId = dispute.trade.traderId;
    }

    const evidencesRequestedCount = await prisma.disputeEvidenceRequest.count({
      where: {
        disputeId: dispute.id,
        requestedFromId,
      },
    });

    if (evidencesRequestedCount > 0) {
      res.status(400).json({
        error:
          'Can not request more than once on dispute and this specific user',
      });
      return;
    }

    const message = 'More evidences were requested by the moderator.';

    const requested = await requestMoreEvidence({
      requestedFromId,
      description: message,
      disputeId: dispute.id,
      moderatorId: dispute.moderatorId,
    });

    if (requested) {
      const user = await prisma.user.findUnique({
        where: {
          id: requestedFromId,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      });
      const systemMessage = new SystemMessage();

      systemMessage.sendRequestMoreEvidences({
        message,
        trade: dispute.trade,
        user: user!,
      });
    }

    res.status(200).json(requested);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function addMoreEvidences(req: Request, res: Response) {
  try {
    const { disputeId, evidences, userId } = req.body;

    const dispute = await prisma.tradeDispute.findUnique({
      where: { id: disputeId },
      select: {
        id: true,
        moderatorId: true,
        disputeEvidenceRequest: true,
        trade: {
          select: {
            traderId: true,
            vendorId: true,
          },
        },
      },
    });

    if (!dispute) {
      res.status(404).json({ errors: ['Dispute not found'] });
      return;
    }

    if (!dispute.moderatorId) {
      res.status(404).json({ errors: ['Dispute moderator not found'] });
      return;
    }

    const promises = dispute.disputeEvidenceRequest
      .filter((request) => request.requestedFromId === userId)
      .map((request) => {
        return prisma.$transaction(async (tx) => {
          // 1. Create UploadedFiles
          const uploadedFiles = await Promise.all(
            evidences.map((evidence: any) =>
              tx.uploadedFile.create({
                data: {
                  key: evidence.key,
                  mimeType: evidence.mimeType,
                  size: evidence.size,
                },
              }),
            ),
          );

          // 2. Create DisputeEvidences linking the uploadedFiles
          await Promise.all(
            uploadedFiles.map((file) =>
              tx.disputeEvidence.create({
                data: {
                  type: 'BANK_STATEMENT', // or use evidence.type if available
                  disputeId: request.disputeId,
                  submittedById: request.requestedFromId,
                  fileId: file.id,
                  disputeEvidenceRequest: {
                    connect: { id: request.id },
                  },
                },
              }),
            ),
          );

          // 3. Mark the request as submitted
          await tx.disputeEvidenceRequest.update({
            where: {
              id: request.id,
              disputeId: request.disputeId,
              requestedFromId: request.requestedFromId,
            },
            data: {
              submittedAt: new Date(),
              status: 'SUBMITTED',
            },
          });
        });
      });

    const fulfilled = await Promise.all(promises);

    res.status(200).json(fulfilled);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function escalateToSeniorAdmin(req: Request, res: Response) {
  try {
    const { disputeId } = req.body;

    const dispute = await prisma.tradeDispute.findUnique({
      where: {
        id: disputeId,
      },
      select: {
        id: true,
        moderator: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!dispute?.id) {
      res.status(400).json({ error: 'Dispute not found' });
      return;
    }

    if (!dispute.moderator?.id) {
      res.status(400).json({ error: 'Moderator not found' });
      return;
    }

    const escalated = await escalateDispute({
      disputeId: dispute.id,
      escalatedByAdminId: dispute?.moderator?.id,
      reason: `Escalated by ${dispute?.moderator?.username} via Dispute Quick Actions menu`,
    });

    if (!escalated) {
      res.status(400).json({ error: 'Unable to escalate dispute' });
      return;
    }

    res.status(200).json(escalated);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function contactBothUsers(req: Request, res: Response) {
  try {
    const { actionForTrader, actionForVendor } = req.body;

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
      select: {
        status: true,
        tradeId: true,
        moderatorId: true,
        trade: {
          select: {
            traderId: true,
            vendorId: true,
            blockchainTradeId: true,
            cryptocurrency: {
              select: {
                chains: true,
              },
            },
          },
        },
      },
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
          type: SystemMessageType.TRADE_CANCELLED_BY_MODERATOR,
          userId: dispute.trade.traderId,
          message: `The dispute for trade #${dispute.tradeId} was resolved by canceling the trade.`,
          url: `/trades/${dispute.tradeId}`,
        },
      }),

      // Send system message to vendor
      prisma.systemMessage.create({
        data: {
          type: SystemMessageType.TRADE_CANCELLED_BY_MODERATOR,
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
      const isERC20TokenTrade = await isERC20Trade(dispute?.tradeId);

      let canceledTrade;

      if (isERC20TokenTrade) {
        canceledTrade = await cancelTradeERC20(
          dispute.trade.blockchainTradeId,
          true,
        );
      } else {
        canceledTrade = await cancelTradeNative(
          dispute.trade.blockchainTradeId,
          true,
        );
      }
    }

    res.status(200).json({
      resolvedAt: now,
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({
      errors: [err.message || 'An error occurred while canceling the trade.'],
    });
  }
}
