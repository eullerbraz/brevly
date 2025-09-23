import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import type { LinkInput, LinkOutput, LinkUpdateInput } from '@/models/link';
import { makeLeft, makeRight, type Either } from '@/shared/either';
import { DrizzleQueryError, eq } from 'drizzle-orm';

const create = async (
  linkInput: LinkInput
): Promise<Either<Error, LinkOutput>> => {
  try {
    const [link] = await db.insert(schema.links).values(linkInput).returning();

    return makeRight(link);
  } catch (error) {
    if (error instanceof DrizzleQueryError) {
      if (error.cause?.message.includes('unique constraint')) {
        return makeLeft(new Error('Short URL already exists.'));
      }

      return makeLeft(error);
    }

    return makeLeft(new Error(String(error)));
  }
};

const getById = async (id: string): Promise<Either<Error, LinkOutput>> => {
  try {
    const [link] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, id))
      .limit(1);

    if (!link) {
      return makeLeft(new Error('Link not found.'));
    }

    return makeRight(link);
  } catch (error) {
    return makeLeft(new Error(String(error)));
  }
};

const getByShortUrl = async (
  shortUrl: string
): Promise<Either<Error, LinkOutput>> => {
  try {
    const [link] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortUrl, shortUrl))
      .limit(1);

    if (!link) {
      return makeLeft(new Error('Link not found.'));
    }

    return makeRight(link);
  } catch (error) {
    return makeLeft(new Error(String(error)));
  }
};

const incrementAccessCount = async (
  id: string
): Promise<Either<Error, LinkOutput>> => {
  try {
    const [link] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, id))
      .limit(1);

    if (!link) {
      return makeLeft(new Error('Link not found.'));
    }

    const [linkUpdated] = await db
      .update(schema.links)
      .set({ accessCount: link.accessCount + 1 })
      .where(eq(schema.links.id, id))
      .returning();

    return makeRight(linkUpdated);
  } catch (error) {
    if (error instanceof DrizzleQueryError) {
      if (error.cause?.message.includes('unique constraint')) {
        return makeLeft(new Error('Short URL already exists.'));
      }

      return makeLeft(error);
    }

    return makeLeft(new Error(String(error)));
  }
};

const update = async (
  id: string,
  linkUpdateInput: LinkUpdateInput
): Promise<Either<Error, LinkOutput>> => {
  try {
    const [link] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, id))
      .limit(1);

    if (!link) {
      return makeLeft(new Error('Link not found.'));
    }

    const [linkUpdated] = await db
      .update(schema.links)
      .set(linkUpdateInput)
      .where(eq(schema.links.id, id))
      .returning();

    return makeRight(linkUpdated);
  } catch (error) {
    if (error instanceof DrizzleQueryError) {
      if (error.cause?.message.includes('unique constraint')) {
        return makeLeft(new Error('Short URL already exists.'));
      }

      return makeLeft(error);
    }

    return makeLeft(new Error(String(error)));
  }
};

const remove = async (id: string): Promise<Either<Error, undefined>> => {
  try {
    const [link] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, id))
      .limit(1);

    if (!link) {
      return makeLeft(new Error('Link not found.'));
    }

    await db.delete(schema.links).where(eq(schema.links.id, id));

    return makeRight(undefined);
  } catch (error) {
    return makeLeft(new Error(String(error)));
  }
};

export const linksRepository = {
  create,
  getById,
  getByShortUrl,
  incrementAccessCount,
  update,
  remove,
};
