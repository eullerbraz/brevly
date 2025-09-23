import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import type { LinkInput, LinkOutput } from '@/models/link';
import { makeRight, type Either } from '@/shared/either';
import type { CreateLinkError } from '../errors/create-link';

const create = async (
  linkInput: LinkInput
): Promise<Either<CreateLinkError, LinkOutput>> => {
  const [link] = await db.insert(schema.links).values(linkInput).returning();

  return makeRight(link);
};

export const linksRepository = {
  create,
};
