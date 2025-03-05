import { z } from 'zod';

export const GetUser = z.object({
  id: z.string().optional(),
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  username: z.string().min(5).optional(),
  associations: z.string().optional(),
});

export const IndexLanguagesByUser = z.string();

export const AssociateLanguageToUser = z.object({
  userId: z.string(),
  languageName: z.string(),
});

export const RemoveLangaugeFromUser = AssociateLanguageToUser;
