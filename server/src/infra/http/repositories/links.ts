import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import type { LinkInput, LinkOutput } from '@/models/link';

const create = async (linkInput: LinkInput): Promise<LinkOutput> => {
  const [link] = await db.insert(schema.links).values(linkInput).returning();

  return link;
};

export const linksRepository = {
  create,
};
