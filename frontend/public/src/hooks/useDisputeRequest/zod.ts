import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const DisputeRequest = z.object({
  type: z.string().min(2),
  reason: z.string().min(2),
});

export const disputeRequestResolver = zodResolver(DisputeRequest);
