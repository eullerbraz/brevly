import { linkInput, linkParams } from '@/models/link';
import { isLeft, unwrapEither } from '@/shared/either';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { createLinkSchema, deleteLinkSchema } from '../docs/schemas/links';
import { CreateLinkError } from '../errors/create-link';
import { RemoveLinkError } from '../errors/remove-link';
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

      if (isLeft(result)) {
        const error = unwrapEither(result);

        throw new CreateLinkError(error.message, 409);
      }

      const link = unwrapEither(result);

      return res.status(201).send({ data: link });
    }
  );

  server.delete(
    '/:id',
    {
      schema: deleteLinkSchema,
    },
    async (req, res) => {
      const { id } = linkParams.parse(req.params);

      const result = await linksRepository.remove(id);

      if (isLeft(result)) {
        const error = unwrapEither(result);

        throw new RemoveLinkError(error.message, 404);
      }

      return res.status(204).send();
    }
  );
};
