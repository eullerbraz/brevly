import { WarningIcon } from '@phosphor-icons/react';
import { useEffect, useRef, useState, type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { tv, type VariantProps } from 'tailwind-variants';

const inputVariants = tv({
  base: 'w-full rounded-lg border p-4 text-md text-gray-600 placeholder:text-gray-400 focus:outline-none focus:border-transparent focus:ring-[1.5px] caret-blue-base focus:ring-blue-base',
  variants: {
    status: {
      default: 'border-gray-300',
      error: 'border-danger',
    },
  },
  defaultVariants: {
    status: 'default',
  },
});

type InputProps = ComponentProps<'input'> &
  VariantProps<typeof inputVariants> & {
    labelText: string;
    id: string;
    fixedPrefix?: string;
    errorMessage?: string;
  };

export function Input({
  className,
  placeholder,
  id,
  labelText,
  fixedPrefix,
  errorMessage,
  status = 'default',
  onChange,
  value,
  ...props
}: InputProps) {
  const prefixRef = useRef<HTMLSpanElement>(null);
  const [prefixWidth, setPrefixWidth] = useState(0);

  useEffect(() => {
    if (fixedPrefix && prefixRef.current) {
      setPrefixWidth(prefixRef.current.offsetWidth);
    } else {
      setPrefixWidth(0);
    }
  }, [fixedPrefix]);

  return (
    <div
      className={twMerge(
        'w-full flex flex-col gap-2 text-xs font-semibold focus-within:text-blue-base',
        status === 'error' ? 'text-danger' : 'text-gray-500',
        className
      )}
    >
      <label htmlFor={id} className=''>
        {labelText}
      </label>

      <div className='relative w-full font-normal'>
        {fixedPrefix && (
          <span
            ref={prefixRef}
            className='absolute left-4 top-1/2 -translate-y-1/2 text-md text-gray-400 pointer-events-none select-none'
          >
            {fixedPrefix}
          </span>
        )}
        <input
          id={id}
          className={inputVariants({ status, className })}
          style={fixedPrefix ? { paddingLeft: `${prefixWidth + 15}px` } : {}}
          type='text'
          placeholder={!fixedPrefix ? placeholder : ''}
          onChange={onChange}
          value={value}
          {...props}
        />
      </div>

      {status === 'error' && (
        <div className='flex items-center gap-2 text-sm font-normal text-gray-500'>
          <WarningIcon className='text-danger' size={16} />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
