import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export function LinksSection({
  className,
  ...props
}: ComponentProps<'section'>) {
  return (
    <section
      className={twMerge(
        'flex flex-col gap-4 w-full p-8 bg-white rounded-lg',
        className
      )}
      {...props}
    >
      {/* <Input labelText='LINK ORIGINAL' placeholder='Placeholder' />
      <Input
        labelText='LINK ENCURTADO'
        placeholder='Placeholder'
        type='fixedPlaceholder'
      /> */}
    </section>
  );
}
