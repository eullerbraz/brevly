import { zodResolver } from '@hookform/resolvers/zod';
import { useId, type ComponentProps } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { linkInput, type LinkInput } from '../models/link';
import { useLinks } from '../store/links-store';
import { ErrorToast } from './toasts/error-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';

function errorToast() {
  toast.error(<ErrorToast />);
}

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
    reset,
  } = useForm<LinkInput>({
    resolver: zodResolver(linkInput),
    defaultValues: {
      originalUrl: '',
      shortUrl: '',
    },
  });

  const { originalUrl, shortUrl } = watch();

  const addLink = useLinks((state) => state.addLink);
  const isSaving = useLinks((state) => state.isSaving);

  const onSubmit: SubmitHandler<LinkInput> = async (data) => {
    const formStatus = await addLink(data);

    if (formStatus === 'success') {
      reset();
    } else if (formStatus === 'error') {
      errorToast();
    }
  };

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

        <Button disabled={!isButtonEnabled}>
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
      </form>
    </section>
  );
}
