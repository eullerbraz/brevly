import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
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

export function LinksSection({
  className,
  links,
  ...props
}: LinksSectionProps) {
  const hasLinks = links.length > 0;

  return (
    <section
      className={twMerge(
        'flex flex-col md:gap-5 w-full md:p-8 md:pr-4 bg-white rounded-lg gap-4 p-6 pr-3',
        className
      )}
      {...props}
    >
      <div className='flex flex-row items-center justify-between md:pr-4 pr-3'>
        <h2 className='text-lg text-gray-600 font-bold truncate'>Meus links</h2>

        <SecondaryButton>
          <DownloadSimpleIcon className='size-4' strokeWidth={1.5} />
          <span>Baixar CSV</span>
        </SecondaryButton>
      </div>

      <ScrollArea.Root className='overflow-hidden'>
        <ScrollArea.Viewport className='md:max-h-[calc(100dvh-20.75rem)] md:pr-4 flex flex-col gap-4 pr-3 max-h-[calc(100dvh-35rem)]'>
          {!hasLinks ? (
            <div className='flex flex-col gap-3 py-8 items-center justify-center border-t border-gray-200'>
              <LinkIcon className='size-8 text-gray-400' strokeWidth={1.5} />
              <span className='text-xs text-gray-400 font-semibold text-center'>
                AINDA NÃO EXISTEM LINKS CADASTRADOS
              </span>
            </div>
          ) : (
            <div className='flex flex-col gap-4'>
              {links.map((link) => (
                <LinkCard key={link.id} link={link} />
              ))}
            </div>
          )}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className='flex touch-none select-none bg-white p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col'
          orientation='vertical'
        >
          <ScrollArea.Thumb className='relative flex-1 rounded-[10px] bg-blue-base before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2' />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </section>
  );
}
