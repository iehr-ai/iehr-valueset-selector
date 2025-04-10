import { AppShell, ErrorBoundary, Loading, Logo, useIEHR, useIEHRProfile } from '@iehr/react';
import { IconVariablePlus } from '@tabler/icons-react';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ResourcePage } from './pages/ResourcePage';
import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';

export function App(): JSX.Element | null {
  const iehr = useIEHR();
  const profile = useIEHRProfile();

  if (iehr.isLoading()) {
    return null;
  }

  return (
    <AppShell
      logo={<Logo size={24} />}
      menus={[
        {
          title: 'My Links',
          links: [{ icon: <IconVariablePlus />, label: 'ValueSet Selector', href: '/' }],
        },
      ]}
    >
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={profile ? <HomePage /> : <LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/:resourceType/:id" element={<ResourcePage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </AppShell>
  );
}
