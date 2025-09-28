import { useId, useState, type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function FormSection({
  className,
  children,
  ...props
}: ComponentProps<'section'>) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  return (
    <section
      className={twMerge(
        'flex flex-col gap-6 w-full p-8 bg-white rounded-lg',
        className
      )}
      {...props}
    >
      <h2 className='text-lg text-gray-600 font-bold'>Novo link</h2>

      <form className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4'>
          <Input
            id={useId()}
            labelText='LINK ORIGINAL'
            placeholder='www.exemplo.com.br'
            status='default'
            errorMessage='Informe uma url válida.'
            onChange={(e) => setOriginalUrl(e.target.value)}
            value={originalUrl}
          />
          <Input
            id={useId()}
            labelText='LINK ENCURTADO'
            type='fixedPlaceholder'
            fixedPrefix='brev.ly/'
            status='error'
            errorMessage='Informe uma url minúscula e sem espaço/caracter especial.'
            onChange={(e) => setShortUrl(e.target.value)}
            value={shortUrl}
          />
        </div>

        <Button disabled>Salvar</Button>
      </form>
    </section>
  );
}
