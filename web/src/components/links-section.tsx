import { DownloadSimpleIcon } from '@phosphor-icons/react';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { LinkCard } from './link-card';
import { SecondaryButton } from './ui/secondary-button';

export type LinksSectionProps = ComponentProps<'section'> & {
  links: {
    id: string;
    originalUrl: string;
    shortUrl: string;
    accessCount: number;
  }[];
};

export function LinksSection({ className, ...props }: LinksSectionProps) {
  return (
    <section
      className={twMerge(
        'flex flex-col gap-5 w-full p-8 bg-white rounded-lg',
        className
      )}
      {...props}
    >
      <div className='flex flex-row items-center justify-between'>
        <h2 className='text-lg text-gray-600 font-bold'>Meus links</h2>

        <SecondaryButton>
          <DownloadSimpleIcon className='size-4' strokeWidth={1.5} />
          <span>Baixar CSV</span>
        </SecondaryButton>
      </div>

      <div className='flex flex-col gap-4'>
        {props.links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
    </section>
  );
}
