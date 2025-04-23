import { Request, Response } from 'express';

import { ALTCHA_HMAC_SECRET_KEY } from '@/constants/env';
import crypto from 'crypto';

// Utility function to generate random salt
function generateSalt(length = 16) {
  return crypto.randomBytes(length).toString('hex');
}

// Utility function to generate random number
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const getAltchaChallenge = async (req: Request, res: Response) => {
  try {
    const maxnumber = 100000;
    const salt = generateSalt(10); // ≥10 characters
    const secretNumber = getRandomInt(maxnumber);
    const challengeInput = salt + secretNumber;

    // Create SHA-256 hash of salt + secret number
    const challenge = crypto
      .createHash('sha256')
      .update(challengeInput)
      .digest('hex');

    // Create HMAC-SHA-256 signature using the challenge
    const signature = crypto
      .createHmac('sha256', ALTCHA_HMAC_SECRET_KEY)
      .update(challenge)
      .digest('hex');

    // Send the challenge response
    res.json({
      algorithm: 'SHA-256',
      challenge,
      maxnumber,
      salt,
      signature,
    });
    return;
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
