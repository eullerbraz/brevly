import { linkInput, linkOutput } from '@/models/link';
import type { FastifySchema } from 'fastify';
import { z } from 'zod';

export const createLinkSchema: FastifySchema = {
  summary: 'Create a shortened link',
  description: 'Creates a new shortened link from the original URL',
  tags: ['links'],
  body: linkInput.describe('Link input data'),
  response: {
    201: z
      .object({
        data: linkOutput,
      })
      .describe('Created link output data'),
  },
};

export const docsLinkSchemas = {
  createLinkSchema,
};
