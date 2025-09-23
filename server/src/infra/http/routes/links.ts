import { linkInput, linkParams, linkUpdateInput } from '@/models/link';
import { isLeft, unwrapEither } from '@/shared/either';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import {
  createLinkSchema,
  deleteLinkSchema,
  getByIdLinkSchema,
  incrementLinkSchema,
  updateLinkSchema,
} from '../docs/schemas/links';
import { CreateLinkError } from '../errors/create-link';
import { RemoveLinkError } from '../errors/remove-link';
import { UpdateLinkError } from '../errors/update-link';
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

  server.get(
    '/:id',
    {
      schema: getByIdLinkSchema,
    },
    async (req, res) => {
      const { id } = linkParams.parse(req.params);

      const result = await linksRepository.getById(id);

      if (isLeft(result)) {
        const error = unwrapEither(result);

        throw new UpdateLinkError(error.message, 404);
      }

      const link = unwrapEither(result);

      return res.status(200).send({ data: link });
    }
  );

  server.post(
    '/:id/access',
    {
      schema: incrementLinkSchema,
    },
    async (req, res) => {
      const { id } = linkParams.parse(req.params);

      const result = await linksRepository.incrementAccessCount(id);

      if (isLeft(result)) {
        const error = unwrapEither(result);

        throw new UpdateLinkError(error.message, 404);
      }

      const link = unwrapEither(result);

      return res.status(200).send({ data: link });
    }
  );

  server.patch(
    '/:id',
    {
      schema: updateLinkSchema,
    },
    async (req, res) => {
      const { id } = linkParams.parse(req.params);

      const { originalUrl, shortUrl, accessCount } = linkUpdateInput.parse(
        req.body
      );

      const result = await linksRepository.update(id, {
        originalUrl,
        shortUrl,
        accessCount,
      });

      if (isLeft(result)) {
        const error = unwrapEither(result);

        const status =
          error.message === 'Short URL already exists.' ? 409 : 404;

        throw new UpdateLinkError(error.message, status);
      }

      const link = unwrapEither(result);

      return res.status(200).send({ data: link });
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
