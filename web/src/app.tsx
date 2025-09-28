import { AppLogo } from './components/app-logo';
import { FormSection } from './components/form-section';

export function App() {
  return (
    <main className='h-dvh flex flex-col items-start justify-start gap-8 bg-gray-200 px-48 py-20'>
      <AppLogo />
      <div className='w-full flex flex-row gap-5'>
        <FormSection />
      </div>
    </main>
  );
}
