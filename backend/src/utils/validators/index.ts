import { getAdmin, getUser } from 'base-ca';

export function validateInputRegistration(
  names: { firstName: string; lastName: string },
  username: string,
  password: string,
  password2: string,
): { errors: string[]; valid: boolean } {
  const errors: string[] = [];

  if (!names.firstName) {
    errors.push('First name is required.');
  } else if (names.firstName.length === 0) {
    errors.push('First name must be valid.');
  }

  if (!names.lastName) {
    errors.push('Last name is required.');
  } else if (names.lastName.length === 0) {
    errors.push('Last name must be valid.');
  }

  if (!username) {
    errors.push('Username is required.');
  } else if (username.length === 0) {
    errors.push('Username must be valid.');
  }

  if (!password) {
    errors.push('Password is required.');
  } else if (password.length === 0) {
    errors.push('Password must be valid.');
  }

  if (!password2) {
    errors.push('Password is required.');
  } else if (password2.length === 0) {
    errors.push('Password must be valid.');
  }

  if (password !== password2) {
    errors.push('Passwords must match');
  }

  if (errors.length > 0) {
    return {
      errors,
      valid: false,
    };
  }
  return {
    errors: [],
    valid: true,
  };
}

export function validateInputLogin(
  username: string,
  password: string,
): { errors: string[]; valid: boolean } {
  const errors: string[] = [];

  if (!username) {
    errors.push('Username is required.');
  } else if (username.length === 0) {
    errors.push('Username must be valid.');
  }

  if (!password) {
    errors.push('Password is required.');
  } else if (password.length === 0) {
    errors.push('Password must be valid.');
  }

  if (errors.length > 0) {
    return {
      errors,
      valid: false,
    };
  }

  return {
    errors: [],
    valid: true,
  };
}

export async function validateUsername(
  username: string,
): Promise<{ errors: string[]; valid: boolean }> {
  try {
    const errors: string[] = [];

    const user = await getUser({ username }, {});

    if (user) {
      errors.push('Username is already in use');
    }

    if (errors.length > 0) {
      return {
        errors,
        valid: false,
      };
    }

    return {
      errors: [],
      valid: true,
    };
  } catch (err) {
    return {
      errors: [err.message],
      valid: false,
    };
  }
}

export async function validateAdminUsername(
  username: string,
): Promise<{ errors: string[]; valid: boolean }> {
  try {
    const errors: string[] = [];

    const admin = await getAdmin({ username });

    if (admin) {
      errors.push('Username is already in use');
    }

    if (errors.length > 0) {
      return {
        errors,
        valid: false,
      };
    }

    return {
      errors: [],
      valid: true,
    };
  } catch (err) {
    return {
      errors: [err.message],
      valid: false,
    };
  }
}
