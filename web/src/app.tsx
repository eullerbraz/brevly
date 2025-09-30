import { Toaster } from 'sonner';
import { AppLogo } from './components/app-logo';
import { FormSection } from './components/form-section';
import { LinksSection } from './components/links-section';

export function App() {
  return (
    <>
      <main className='h-dvh bg-gray-200 md:px-16 lg:px-48 md:py-20 flex justify-center items-start px-3 py-8'>
        <div className='w-full flex flex-col justify-start md:items-start items-center gap-8 max-w-6xl'>
          <AppLogo />
          <div className='w-full flex md:flex-row md:gap-5 gap-3 items-start flex-col'>
            <FormSection className='flex-4' />
            <LinksSection className='flex-6' />
          </div>
        </div>
      </main>

      <Toaster position='bottom-right' richColors />
    </>
  );
}
