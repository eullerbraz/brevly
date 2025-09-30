import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { App } from './app.tsx';
import './index.css';
import { NotFound } from './not-found.tsx';
import { Redirect } from './redirect.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/url/not-found' element={<NotFound />} />
        <Route path='/:shortUrl' element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
