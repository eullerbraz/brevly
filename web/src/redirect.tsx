import { useParams } from 'react-router';
import LogoIcon from '../assets/logo-icon.svg';

export function Redirect() {
  const { shortUrl } = useParams();

  console.log(shortUrl);

  return (
    <div className='h-dvh bg-gray-200 flex items-center px-3 md:justify-center'>
      <div className='flex flex-col md:w-fit items-stretch gap-6 bg-gray-100 md:py-16 md:px-12 py-12 px-5 rounded-lg shadow w-full md:max-w-xl'>
        <img
          src={LogoIcon}
          alt='Logo de redirecionamento'
          className='w-12 self-center'
        />

        <h1 className='text-xl font-bold text-gray-600 text-center truncate'>
          Redirecionando…
        </h1>

        <div className='flex flex-col gap-1 items-stretch md:px-12'>
          <span className='text-md text-gray-500 text-center font-semibold'>
            O link será aberto automaticamente em alguns instantes.
          </span>

          <div className='flex flex-row flex-wrap justify-center items-center'>
            <span className='text-md text-gray-500 text-center font-semibold truncate'>
              Não foi redirecionado?{' '}
            </span>
            <a
              href='/'
              className='text-md text-blue-base text-center font-semibold underline hover:text-dark transition truncate'
            >
              Acesse aqui
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
