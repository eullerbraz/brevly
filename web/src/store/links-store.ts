import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { enableMapSet } from 'immer';
import type { LinkInput, LinkOutput } from '../models/link';

import * as LinksRepository from '../repositories/link-repository';

type LinksStore = {
  links: Map<string, LinkOutput>;
  isSaving: boolean;
  addLink: (linkInput: LinkInput) => Promise<'success' | 'error'>;
  deleteLink(shortUrl: string): Promise<void>;
};

type LinksActions = {
  addLink: (linkInput: LinkInput) => Promise<'success' | 'error'>;
  deleteLink(shortUrl: string): Promise<void>;
};

enableMapSet();

export const useLinks = create<LinksStore & LinksActions>()(
  immer((set, get) => {
    const init = async () => {
      const links = await LinksRepository.getAllLinks();

      set((state) => {
        state.links = new Map(links.map((link) => [link.shortUrl, link]));
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
      addLink,
      deleteLink,
    };
  })
);
