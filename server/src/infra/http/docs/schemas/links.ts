import {
  linkInput,
  linkOutput,
  linkParams,
  linkUpdateInput,
} from '@/models/link';
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
        issues: z.array(z.any()).describe('Validation issues'),
      })
      .describe('Bad request error'),
    409: z
      .object({
        message: z.string().describe('Error message'),
      })
      .describe('Created link output data'),
  },
};

export const updateLinkSchema: FastifySchema = {
  summary: 'Update a shortened link',
  description: 'Updates a shortened link by its id',
  tags: ['links'],
  params: linkParams.describe('Link ID parameter'),
  body: linkUpdateInput.describe('Link input data'),
  response: {
    200: z
      .object({
        data: linkOutput,
      })
      .describe('Updated link output data'),
    400: z
      .object({
        message: z.string().describe('Error message'),
        issues: z.array(z.any()).describe('Validation issues'),
      })
      .describe('Bad request error'),
    404: z
      .object({
        message: z.string().describe('Error message'),
      })
      .describe('Link not found error'),
    409: z
      .object({
        message: z.string().describe('Error message'),
      })
      .describe('Updated link output data'),
  },
};

export const deleteLinkSchema: FastifySchema = {
  summary: 'Delete a shortened link',
  description: 'Deletes a shortened link by its id',
  tags: ['links'],
  params: linkParams.describe('Link ID parameter'),
  response: {
    204: z.undefined().describe('No content'),
    400: z
      .object({
        message: z.string().describe('Error message'),
        issues: z.array(z.any()).describe('Validation issues'),
      })
      .describe('Bad request error'),
    404: z
      .object({
        message: z.string().describe('Error message'),
      })
      .describe('Link not found error'),
  },
};

export const docsLinkSchemas = {
  createLinkSchema,
  deleteLinkSchema,
};
