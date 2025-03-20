import { AuthorizeUser } from './type';
import { decodeToken } from '../../generators';
import { getUser } from 'base-ca';
import { validateAuthorization } from '../../validators';

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

  const tokenizedUser = await getUser({ where: { id: decoded.userId } });

  if (!tokenizedUser) {
    return { errors: ['Invalid token or user was not found.'] };
  }

  return { success: true, decoded, user: tokenizedUser };
};
