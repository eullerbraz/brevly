import { z } from 'zod';

export const linkInput = z.object({
  originalUrl: z.url().nonempty(),
  shortUrl: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/)
    .nonempty(),
});

export type LinkInput = z.input<typeof linkInput>;

export const linkOutput = z.object({
  id: z.uuid(),
  originalUrl: z.url().nonempty(),
  shortUrl: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/)
    .nonempty(),
  accessCount: z.number().int(),
  createdAt: z.date(),
});

export type LinkOutput = z.infer<typeof linkOutput>;

export const linkParams = z.object({
  id: z.uuid(),
});

export const linkShortUrlParams = z.object({
  shortUrl: z.string(),
});

export const linkUpdateInput = z.object({
  originalUrl: z.url().optional(),
  shortUrl: z.string().optional(),
  accessCount: z.number().int().optional(),
});

export type LinkUpdateInput = z.input<typeof linkUpdateInput>;

export type LinkResponse = {
  data: LinkOutput;
};

export type LinksResponse = {
  data: LinkOutput[];
};
