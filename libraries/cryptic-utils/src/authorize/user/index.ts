import { getUser } from 'base-ca';

import { decodeToken } from '../../generators';
import { validateAuthorization } from '../../validators';
import { AuthorizeUser } from './type';

export const authorizeUser = async (
  secret: string,
  authorization?: string,
): AuthorizeUser => {
  const validated = validateAuthorization(authorization);

  if (!validated.success) {
    return { errors: validated.errors };
  }

  const decoded = decodeToken(validated.authorizationArray[1], secret);

  if (!decoded) {
    return { errors: decoded };
  }

  const tokenizedUser = await getUser({ id: decoded.userId }, {});

  if (!tokenizedUser) {
    return { errors: ['Invalid token or user was not found.'] };
  }

  return { success: true, decoded, user: tokenizedUser };
};
