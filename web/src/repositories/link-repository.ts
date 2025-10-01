import axios from 'axios';
import { env } from '../env';
import type {
  LinkInput,
  LinkOutput,
  LinkResponse,
  LinksExportResponse,
  LinksResponse,
} from '../models/link';

export const createLink = async (linkInput: LinkInput): Promise<LinkOutput> => {
  const {
    data: { data },
  } = await axios.post<LinkResponse>(
    `${env.VITE_BACKEND_URL}/links`,
    linkInput,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return data;
};

export const getAllLinks = async (): Promise<LinkOutput[]> => {
  const {
    data: { data },
  } = await axios.get<LinksResponse>(`${env.VITE_BACKEND_URL}/links`);

  return data;
};

export const getLinkByShortUrl = async (
  shortUrl: string
): Promise<LinkOutput> => {
  const {
    data: { data },
  } = await axios.get<LinkResponse>(
    `${env.VITE_BACKEND_URL}/links/shortUrl/${shortUrl}`
  );

  return data;
};

export const incrementAccesCountLinkById = async (
  id: string
): Promise<LinkOutput> => {
  const {
    data: { data },
  } = await axios.post<LinkResponse>(
    `${env.VITE_BACKEND_URL}/links/${id}/access`
  );

  return data;
};

export const deleteLinkById = async (id: string): Promise<LinkOutput> => {
  const {
    data: { data },
  } = await axios.delete<LinkResponse>(`${env.VITE_BACKEND_URL}/links/${id}`);

  return data;
};

export const exportLinks = async (): Promise<string> => {
  const {
    data: { data },
  } = await axios.post<LinksExportResponse>(
    `${env.VITE_BACKEND_URL}/links/export`
  );

  return data;
};
