import { db, pg } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage';
import type { LinkInput, LinkOutput, LinkUpdateInput } from '@/models/link';
import { makeLeft, makeRight, type Either } from '@/shared/either';
import { stringify } from 'csv-stringify';
import { asc, DrizzleQueryError, eq } from 'drizzle-orm';
import { PassThrough, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

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

const exportLinks = async (): Promise<Either<Error, string>> => {
  try {
    const { sql, params } = db
      .select({
        id: schema.links.id,
        originalUrl: schema.links.originalUrl,
        shortUrl: schema.links.shortUrl,
        accessCount: schema.links.accessCount,
        createdAt: schema.links.createdAt,
      })
      .from(schema.links)
      .toSQL();

    const cursor = pg.unsafe(sql, params as string[]).cursor(2);

    const csvTransform = stringify({
      delimiter: ',',
      header: true,
      columns: [
        { key: 'id', header: 'ID' },
        { key: 'original_url', header: 'Original URL' },
        { key: 'short_url', header: 'Short URL' },
        { key: 'access_count', header: 'Access Count' },
        { key: 'created_at', header: 'Created At' },
      ],
    });

    const partialTransform = new Transform({
      objectMode: true,
      transform(chunks: unknown[], _encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk);
        }

        callback();
      },
    });

    const uploadToStorageStream = new PassThrough();

    const convertToCsvPipeline = pipeline(
      cursor,
      partialTransform,
      csvTransform,
      uploadToStorageStream
    );

    const uploadToStorage = uploadFileToStorage({
      contentType: 'text/csv',
      folder: 'downloads',
      fileName: `${new Date().toISOString()}-links.csv`,
      contentStream: uploadToStorageStream,
    });

    const [{ url }] = await Promise.all([
      uploadToStorage,
      convertToCsvPipeline,
    ]);

    return makeRight(url);
  } catch (error) {
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

const getAll = async (): Promise<Either<Error, LinkOutput[]>> => {
  try {
    const links = await db
      .select()
      .from(schema.links)
      .orderBy(asc(schema.links.createdAt))
      .limit(100);

    return makeRight(links);
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
  exportLinks,
  getById,
  getByShortUrl,
  getAll,
  incrementAccessCount,
  update,
  remove,
};
