export type GenerateToken = (
  userId: string,
  expiresIn: `${number}${'s' | 'm' | 'h' | 'd' | 'w'}`,
) => Promise<any>;
