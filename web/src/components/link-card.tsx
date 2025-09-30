import { CopyIcon, TrashIcon } from '@phosphor-icons/react';
import type { ComponentProps } from 'react';
import { toast } from 'sonner';
import { env } from '../env';
import type { LinkOutput } from '../models/link';
import { SecondaryButton } from './ui/secondary-button';

export type LinksCardProps = ComponentProps<'div'> & {
  link: LinkOutput;
};

function copyLink(link: string) {
  navigator.clipboard.writeText(link);

  toast.info(
    <>
      <span className='font-semibold'>Link copiado com sucesso</span>
      <div className='text-sm'>
        O link {link} foi copiado para a área de transferência.
      </div>
    </>
  );
}

export function LinkCard({ link }: LinksCardProps) {
  // const shortUrl = `${window.location.origin}/${link.shortUrl}`;
  const shortUrl = `${env.VITE_FRONTEND_URL}/${link.shortUrl}`;

  const hostname = new URL(shortUrl).hostname;

  return (
    <div
      key={link.id}
      className='flex flex-row w-full md:gap-4 md:pt-4 justify-between border-t border-gray-200 pt-3 gap-3'
    >
      <div className='flex flex-col gap-1 items-stretch w-0 grow truncate'>
        <a
          href={shortUrl}
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
          <SecondaryButton
            onClick={() => {
              copyLink(link.shortUrl);
            }}
          >
            <CopyIcon className='size-4 text-gray-600' strokeWidth={1.5} />
          </SecondaryButton>
          <SecondaryButton onClick={() => {}}>
            <TrashIcon className='size-4 text-gray-600' strokeWidth={1.5} />
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
