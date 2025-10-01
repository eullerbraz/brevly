import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { enableMapSet } from 'immer';
import type { LinkInput, LinkOutput } from '../models/link';

import * as LinksRepository from '../repositories/link-repository';

type LinksStore = {
  links: Map<string, LinkOutput>;
  isSaving: boolean;
  isLoading: boolean;
  init: () => Promise<void>;
  addLink: (linkInput: LinkInput) => Promise<'success' | 'error'>;
  getLink(shortUrl?: string): Promise<LinkOutput | null>;
  incremetAccessCountLink(shortUrl?: string): Promise<LinkOutput | null>;
  deleteLink(shortUrl: string): Promise<void>;
};

type LinksActions = {
  init: () => Promise<void>;
  addLink: (linkInput: LinkInput) => Promise<'success' | 'error'>;
  getLink(shortUrl?: string): Promise<LinkOutput | null>;
  incremetAccessCountLink(shortUrl?: string): Promise<LinkOutput | null>;
  deleteLink(shortUrl?: string): Promise<void>;
};

enableMapSet();

export const useLinks = create<LinksStore & LinksActions>()(
  immer((set, get) => {
    const init = async () => {
      const links = await LinksRepository.getAllLinks();

      set((state) => {
        state.links = new Map(links.map((link) => [link.shortUrl, link]));
        state.isLoading = false;
      });
    };

    const addLink = async (linkInput: LinkInput) => {
      try {
        const linkFound = get().links.get(linkInput.shortUrl);

        if (linkFound) {
          return 'error';
        }

        set((state) => {
          state.isSaving = true;
        });

        const link = await LinksRepository.createLink(linkInput);

        set((state) => {
          state.links.set(link.shortUrl, link);
          state.isSaving = false;
        });

        return 'success';
      } catch (_e) {
        set((state) => {
          state.isSaving = false;
        });

        return 'error';
      }
    };

    const getLink = async (shortUrl?: string) => {
      try {
        if (!shortUrl) return null;

        const linkFound = get().links.get(shortUrl);

        if (linkFound) return linkFound;

        const link = await LinksRepository.getLinkByShortUrl(shortUrl);

        set((state) => {
          state.links.set(link.shortUrl, link);
        });

        return link;
      } catch (_e) {
        return null;
      }
    };

    const incremetAccessCountLink = async (shortUrl: string) => {
      if (!shortUrl) return null;

      const linkFound = get().links.get(shortUrl);

      if (!linkFound) return null;

      const link = await LinksRepository.incrementAccesCountLinkById(
        linkFound.id
      );

      set((state) => {
        state.links.set(link.shortUrl, { ...linkFound, ...link });
      });

      return link;
    };

    const deleteLink = async (shortUrl: string) => {
      const linkFound = get().links.get(shortUrl);

      if (!linkFound) {
        return;
      }

      await LinksRepository.deleteLinkById(linkFound.id);

      set((state) => {
        state.links.delete(shortUrl);
      });
    };

    init();

    return {
      links: new Map(),
      formStatus: 'progress',
      isSaving: false,
      isLoading: true,
      init,
      addLink,
      getLink,
      incremetAccessCountLink,
      deleteLink,
    };
  })
);
