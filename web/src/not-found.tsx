import NotFoundLogo from '../assets/404.svg';

export function NotFound() {
  return (
    <div className='h-dvh bg-gray-200 flex items-center px-3 md:justify-center'>
      <div className='flex flex-col md:w-fit items-stretch gap-6 bg-gray-100 md:py-16 md:px-12 py-12 px-5 rounded-lg shadow w-full md:max-w-xl'>
        <img src={NotFoundLogo} alt='Logo 404' className='w-48 self-center' />

        <h1 className='text-xl font-bold text-gray-600 text-center truncate'>
          Link não encontrado{' '}
        </h1>

        <span className='text-md text-gray-500 text-center font-semibold'>
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em{' '}
          <a
            href='/'
            className='text-md text-blue-base text-center font-semibold underline hover:text-dark transition truncate'
          >
            brev.ly
          </a>
        </span>
      </div>
    </div>
  );
}
