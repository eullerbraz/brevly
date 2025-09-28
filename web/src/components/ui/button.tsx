import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'>;

export function Button(props: ButtonProps) {
  return (
    <button
      className='bg-blue-base text-white font-semibold p-4 rounded-lg hover:bg-blue-dark cursor-pointer disabled:opacity-50 disabled:pointer-events-none'
      {...props}
    />
  );
}
