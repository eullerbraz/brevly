import type { ComponentProps } from 'react';

type SecondaryButtonProps = ComponentProps<'button'>;

export function SecondaryButton({ className, ...props }: SecondaryButtonProps) {
  return (
    <button
      className='flex flex-row gap-2 bg-gray-200 text-gray-600 text-sm text-nowrap font-semibold p-2 rounded-sm  hover:outline hover:outline-blue-base cursor-pointer disabled:opacity-50 disabled:pointer-events-none'
      {...props}
    />
  );
}
