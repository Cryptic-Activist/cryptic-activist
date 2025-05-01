import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const LeaveAFeedback = z
  .object({
    tradeId: z.string().min(2),
    type: z.string().min(2),
    message: z.string().min(5),
  })
  .superRefine(({ type }, ctx) => {
    if (type !== 'NEGATIVE' && type !== 'NEUTRAL' && type !== 'POSITIVE') {
      ctx.addIssue({
        code: 'custom',
        message: 'Must be Negative, Neutral or Positive',
        path: ['type'],
      });
    }
  });

export const leaveAFeedbackResolver = zodResolver(LeaveAFeedback);
