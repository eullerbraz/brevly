import { z } from 'zod';

export const linkInput = z.object({
  originalUrl: z.url(),
  shortUrl: z.string(),
});

export type LinkInput = z.input<typeof linkInput>;

export const linkOutput = z.object({
  id: z.uuid(),
  originalUrl: z.url(),
  shortUrl: z.string(),
  accessCount: z.number().int(),
  createdAt: z.date(),
});

export const linkParams = z.object({
  id: z.uuid(),
});

export type LinkOutput = z.infer<typeof linkOutput>;
