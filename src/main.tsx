import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { IEHRClient } from '@iehr/core';
import { IEHRProvider } from '@iehr/react';
import '@iehr/react/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';

const iehr = new IEHRClient({
  onUnauthenticated: () => (window.location.href = '/'),
  baseUrl: 'http://localhost:8103/', //Uncomment this to run against the server on your localhost; also change `googleClientId` in `./pages/SignInPage.tsx`
});

const theme = createTheme({
  headings: {
    sizes: {
      h1: {
        fontSize: '1.125rem',
        fontWeight: '500',
        lineHeight: '2.0',
      },
    },
  },
  fontSizes: {
    xs: '0.6875rem',
    sm: '0.875rem',
    md: '0.875rem',
    lg: '1.0rem',
    xl: '1.125rem',
  },
});

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);
root.render(
  <StrictMode>
    <BrowserRouter>
      <IEHRProvider iehr={iehr}>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </IEHRProvider>
    </BrowserRouter>
  </StrictMode>
);
