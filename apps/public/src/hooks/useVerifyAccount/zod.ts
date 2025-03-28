import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { ZodPrivateKey, ZodUsername } from '../../layouts/modals/zod';

const VerifyAccountUsername = z.object({
  username: ZodUsername,
});

const VerifyAccountPrivateKeys = z.object({
  privateKey1: ZodPrivateKey,
  privateKey2: ZodPrivateKey,
  privateKey3: ZodPrivateKey,
  privateKey4: ZodPrivateKey,
  privateKey5: ZodPrivateKey,
  privateKey6: ZodPrivateKey,
  privateKey7: ZodPrivateKey,
  privateKey8: ZodPrivateKey,
  privateKey9: ZodPrivateKey,
  privateKey10: ZodPrivateKey,
  privateKey11: ZodPrivateKey,
  privateKey12: ZodPrivateKey,
});

export const verifyAccountUsernameResolver = zodResolver(VerifyAccountUsername);

export const verifyAccountPrivateKeysResolver = zodResolver(
  VerifyAccountPrivateKeys
);
