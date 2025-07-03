import { prisma, redisClient } from '@/services/db';

import { SETTINGS_CACHE_TTL_SECONDS } from '@/constants/env';

export const getSetting = async <T = any>(key: string): Promise<T | null> => {
  const cacheKey = `setting:${key}`;

  // 1. Try from cache
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached) as T;
  }

  // 2. Fallback to DB
  const setting = await prisma.platformSetting.findUnique({ where: { key } });
  if (!setting) return null;

  const parsedValue = parseSetting(setting.value, setting.type);
  await redisClient.setEx(
    cacheKey,
    SETTINGS_CACHE_TTL_SECONDS,
    JSON.stringify(parsedValue),
  );

  return parsedValue;
};

export const setSetting = async (
  key: string,
  value: string,
  type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON' = 'STRING',
  isPrivate: boolean | null = null,
) => {
  const existing = await prisma.platformSetting.findUnique({ where: { key } });

  const updated = await prisma.platformSetting.upsert({
    where: { key },
    update: {
      value,
      type,
      ...(isPrivate !== null ? { isPrivate } : {}),
    },
    create: {
      key,
      value,
      type,
      isPrivate: isPrivate ?? true,
    },
  });

  await redisClient.del(`setting:${key}`);

  // Invalidate public cache if setting is public or was previously public
  if (updated.isPrivate === false || existing?.isPrivate === false) {
    await redisClient.del('settings:public');
  }

  return updated;
};

export const clearSettingCache = async (key: string) => {
  await redisClient.del(`setting:${key}`);
};

// Helper to parse types
function parseSetting(value: string, type: string): any {
  switch (type) {
    case 'NUMBER':
      return parseFloat(value);
    case 'BOOLEAN':
      return value === 'true';
    case 'JSON':
      return JSON.parse(value);
    default:
      return value;
  }
}

export const getPublicSettings = async (): Promise<Record<string, any>> => {
  const cacheKey = 'settings:public';

  // 1. Try cache
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // 2. Load from DB
  const settings = await prisma.platformSetting.findMany({
    where: { isPrivate: false },
  });

  const parsed: Record<string, any> = {};
  for (const s of settings) {
    parsed[s.key] = parseSetting(s.value, s.type);
  }

  // 3. Cache it
  await redisClient.setEx(
    cacheKey,
    SETTINGS_CACHE_TTL_SECONDS,
    JSON.stringify(parsed),
  );

  return parsed;
};

export const getPrivateSettings = async (): Promise<Record<string, any>> => {
  const cacheKey = 'settings:private';

  // 1. Try cache
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // 2. Load from DB
  const settings = await prisma.platformSetting.findMany({
    where: { isPrivate: true },
  });

  const parsed: Record<string, any> = {};
  for (const s of settings) {
    parsed[s.key] = parseSetting(s.value, s.type);
  }

  // 3. Cache it
  await redisClient.setEx(
    cacheKey,
    SETTINGS_CACHE_TTL_SECONDS,
    JSON.stringify(parsed),
  );

  return parsed;
};
