import { zodResolver } from '@hookform/resolvers/zod';
import { useId, type ComponentProps } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { linkInput, type LinkInput } from '../models/link';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function FormSection({
  className,
  children,
  ...props
}: ComponentProps<'section'>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LinkInput>({
    resolver: zodResolver(linkInput),
    defaultValues: {
      originalUrl: '',
      shortUrl: '',
    },
  });

  const { originalUrl, shortUrl } = watch();

  const onSubmit: SubmitHandler<LinkInput> = (data) => console.log(data);

  const isButtonEnabled = originalUrl.length > 0 && shortUrl.length > 0;

  return (
    <section
      className={twMerge(
        'flex flex-col md:gap-6 w-full md:p-8 bg-white rounded-lg gap-4 p-6',
        className
      )}
      {...props}
    >
      <h2 className='text-lg text-gray-600 font-bold'>Novo link</h2>

      <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
          <Input
            id={useId()}
            labelText='LINK ORIGINAL'
            placeholder='https://www.exemplo.com.br'
            status={isButtonEnabled && errors.originalUrl ? 'error' : 'default'}
            errorMessage='Informe uma url válida.'
            {...register('originalUrl')}
          />
          <Input
            id={useId()}
            labelText='LINK ENCURTADO'
            type='fixedPlaceholder'
            fixedPrefix='brev.ly/'
            status={isButtonEnabled && errors.shortUrl ? 'error' : 'default'}
            errorMessage='Informe uma url minúscula e sem espaço/caracter especial.'
            {...register('shortUrl')}
          />
        </div>

        <Button disabled={!isButtonEnabled}>Salvar</Button>
      </form>
    </section>
  );
}
