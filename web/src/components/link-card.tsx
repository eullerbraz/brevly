import { CopyIcon, TrashIcon } from '@phosphor-icons/react';
import type { ComponentProps } from 'react';
import { toast } from 'sonner';
import { env } from '../env';
import type { LinkOutput } from '../models/link';
import { useLinks } from '../store/links-store';
import { CopyToast } from './toasts/copy-toast';
import { SecondaryButton } from './ui/secondary-button';

export type LinksCardProps = ComponentProps<'div'> & {
  link: LinkOutput;
};

export function LinkCard({ link }: LinksCardProps) {
  const deleteLink = useLinks((state) => state.deleteLink);

  // const fullUrl = `${window.location.origin}/${link.shortUrl}`;
  const fullUrl = `${env.VITE_FRONTEND_URL}/${link.shortUrl}`;

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Você realmente quer apagar o link ${link.shortUrl}?`
    );

    if (confirmDelete) {
      deleteLink(link.shortUrl);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);

    toast.info(<CopyToast link={link.shortUrl} />);
  };

  const hostname = new URL(fullUrl).hostname;

  return (
    <div
      key={link.shortUrl}
      className='flex flex-row w-full md:gap-4 md:pt-4 justify-between border-t border-gray-200 pt-3 gap-3'
    >
      <div className='flex flex-col gap-1 items-stretch w-0 grow truncate'>
        <a
          href={`/${link.shortUrl}`}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-base text-md font-semibold cursor-pointer truncate'
        >
          {`${hostname}/${link.shortUrl}`}
        </a>
        <span className='text-gray-500 text-sm font-normal truncate'>
          {link.originalUrl}
        </span>
      </div>
      <div className='flex flex-row gap-5 items-center shrink-0'>
        <span className='text-gray-500 text-sm font-normal text-nowrap'>
          {`${link.accessCount} ${
            link.accessCount === 1 ? 'acesso' : 'acessos'
          }`}
        </span>
        <div className='flex flex-row gap-1 items-center text-pink-400'>
          <SecondaryButton onClick={handleCopy}>
            <CopyIcon className='size-4 text-gray-600' strokeWidth={1.5} />
          </SecondaryButton>
          <SecondaryButton onClick={handleDelete}>
            <TrashIcon className='size-4 text-gray-600' strokeWidth={1.5} />
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
