import { linkInput } from '@/models/link';
import { unwrapEither } from '@/shared/either';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { createLinkSchema } from '../docs/schemas/links';
import { linksRepository } from '../repositories/links';

export const linksRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/',
    {
      schema: createLinkSchema,
    },
    async (req, res) => {
      const { originalUrl, shortUrl } = linkInput.parse(req.body);

      const result = await linksRepository.create({ originalUrl, shortUrl });

      const link = unwrapEither(result);

      return res.status(201).send({ data: link });
    }
  );
};
