import { Authorization, AuthorizationArray } from './zod';

export const validateAuthorization = (authorization?: string) => {
  if (!authorization) {
    return { errors: ['Authorization is requested'] };
  }

  const validated = Authorization.safeParse(authorization);

  if (!validated.success) {
    return { errors: validated.error };
  }

  const authorizationArray = authorization.split(' ');

  const validatedArray = AuthorizationArray.safeParse(authorizationArray);

  if (!validatedArray.success) {
    return { errors: validatedArray.error };
  }

  if (authorizationArray[0] !== 'Bearer') {
    return { errors: ['Token format is invalid'] };
  }

  return { success: true, authorizationArray };
};
