import { AppLogo } from './components/app-logo';
import { FormSection } from './components/form-section';
import { LinksSection } from './components/links-section';

export function App() {
  return (
    <main className='h-dvh flex flex-col justify-start gap-8 bg-gray-200 px-48 py-20'>
      <AppLogo />
      <div className='w-full flex flex-row gap-5 items-start'>
        <FormSection className='flex-4' />
        <LinksSection className='flex-6' />
      </div>
    </main>
  );
}
