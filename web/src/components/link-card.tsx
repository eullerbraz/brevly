import { CopyIcon, TrashIcon } from '@phosphor-icons/react';
import type { ComponentProps } from 'react';
import { SecondaryButton } from './ui/secondary-button';

export type LinksCardProps = ComponentProps<'div'> & {
  link: {
    id: string;
    originalUrl: string;
    shortUrl: string;
    accessCount: number;
  };
};

export function LinkCard({ link }: LinksCardProps) {
  return (
    <div
      key={link.id}
      className='flex flex-row pt-4 justify-between border-t border-gray-200'
    >
      <div className='flex flex-col gap-1 items-start'>
        <a
          href={`https://${link.shortUrl}`}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-base text-md font-semibold cursor-pointer truncate'
        >
          {link.shortUrl}
        </a>
        <span className='text-gray-500 text-sm font-normal truncate'>
          {link.originalUrl}
        </span>
      </div>
      <div className='flex flex-row gap-5 items-center'>
        <span className='text-gray-500 text-sm font-normal'>
          {`${link.accessCount} ${
            link.accessCount === 1 ? 'acesso' : 'acessos'
          }`}
        </span>
        <div className='flex flex-row gap-1 items-center'>
          <SecondaryButton onClick={() => {}}>
            <CopyIcon className='size-4' strokeWidth={1.5} />
          </SecondaryButton>
          <SecondaryButton onClick={() => {}}>
            <TrashIcon className='size-4' strokeWidth={1.5} />
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
