import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import type { LinkInput, LinkOutput } from '@/models/link';
import { makeLeft, makeRight, type Either } from '@/shared/either';
import { DrizzleQueryError } from 'drizzle-orm';

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

export const linksRepository = {
  create,
};
