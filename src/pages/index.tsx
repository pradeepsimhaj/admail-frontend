// pages/index.tsx

import { useAuth } from '@/context/AuthContext';
import Dashboard from '@/components/Dashboard';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  const { loggedIn, isHydrated } = useAuth();

  if (!isHydrated) return <div>Loading...</div>;

  return loggedIn ? <Dashboard /> : <LandingPage />;
}

