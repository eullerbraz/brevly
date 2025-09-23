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
    400: z
      .object({
        message: z.string().describe('Error message'),
        issues: z
          .array(
            z.object({
              keyword: z.string(),
              instancePath: z.string(),
              schemaPath: z.string(),
              message: z.string(),
              params: z.object({
                format: z.string().describe('Expected format'),
              }),
            })
          )
          .describe('Validation issues'),
      })
      .describe('Bad request error'),
    409: z
      .object({
        message: z.string().describe('Error message'),
      })
      .describe('Created link output data'),
  },
};

export const docsLinkSchemas = {
  createLinkSchema,
};
