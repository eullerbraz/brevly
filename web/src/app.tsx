import { AppLogo } from './components/app-logo';
import { FormSection } from './components/form-section';
import { LinksSection } from './components/links-section';

export function App() {
  return (
    <main className='h-dvh bg-gray-200 px-48 py-20 flex flex-row justify-center items-start'>
      <div className='w-full flex flex-col justify-start items-start gap-8 max-w-6xl'>
        <AppLogo />
        <div className='w-full flex flex-row gap-5 items-start'>
          <FormSection className='flex-4' />
          <LinksSection
            className='flex-6'
            links={[
              {
                id: '1',
                originalUrl: 'https://www.google.com',
                shortUrl: 'google',
                accessCount: 0,
              },
              {
                id: '2',
                originalUrl: 'https://www.google.com',
                shortUrl: 'google2',
                accessCount: 1,
              },
              {
                id: '3',
                originalUrl: 'https://www.google.com',
                shortUrl: 'google3',
                accessCount: 300,
              },
              {
                id: '4',
                originalUrl: 'https://www.google.com',
                shortUrl: 'google4',
                accessCount: 30,
              },
              {
                id: '5',
                originalUrl: 'https://www.google.com',
                shortUrl: 'google5',
                accessCount: 30,
              },
              {
                id: '6',
                originalUrl: 'https://www.google.com',
                shortUrl: 'google6',
                accessCount: 30,
              },
              {
                id: '7',
                originalUrl: 'https://www.google.com',
                shortUrl: 'google7',
                accessCount: 30,
              },
              {
                id: '8',
                originalUrl: 'https://www.google.com',
                shortUrl: 'google8',
                accessCount: 30,
              },
              {
                id: '9',
                originalUrl: 'https://www.google.com',
                shortUrl: 'google9',
                accessCount: 30,
              },
              {
                id: '10',
                originalUrl: 'https://www.google.com',
                shortUrl: 'google10',
                accessCount: 30,
              },
              {
                id: '11',
                originalUrl: 'https://www.google.com',
                shortUrl: 'google11',
                accessCount: 30,
              },
              {
                id: '12',
                originalUrl: 'https://www.google.com',
                shortUrl: 'google12',
                accessCount: 30,
              },
              {
                id: '13',
                originalUrl: 'https://www.google.com',
                shortUrl: 'google13',
                accessCount: 30,
              },
              {
                id: '14',
                originalUrl: 'https://www.google.com',
                shortUrl: 'google14',
                accessCount: 30,
              },
              {
                id: '15',
                originalUrl: 'https://www.google.com',
                shortUrl: 'google15',
                accessCount: 30,
              },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
