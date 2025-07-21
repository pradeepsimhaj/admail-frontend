// import { useAuth } from '@/context/AuthContext';
// import { useRouter } from 'next/router';
// import { useEffect, ReactNode } from 'react';

// export default function ProtectedRoute({ children }: { children: ReactNode }) {
//   const { loggedIn } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loggedIn) router.push('/login');
//   }, [loggedIn, router]);

//   return loggedIn ? <>{children}</> : null;
// }



import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loggedIn, isHydrated } = useAuth();
  const router = useRouter();

  const publicRoutes = ['/login', '/signup', '/landingpage'];
  const protectedRoutes = ['/dashboard', '/upload', '/domain', '/campaign'];

  useEffect(() => {
    if (!isHydrated) {
      console.log('ProtectedRoute: Waiting for hydration, skipping redirect logic');
      return;
    }

    console.log('ProtectedRoute: ', { loggedIn, currentPath: router.pathname, isHydrated });
    if (loggedIn) {
      if (router.pathname === '/login' || router.pathname === '/signup' || !protectedRoutes.includes(router.pathname)) {
        console.log('ProtectedRoute: Logged in, redirecting to /frame1 from', router.pathname);
        router.push('/');
      }
    } else {
      if (!publicRoutes.includes(router.pathname)) {
        console.log('ProtectedRoute: Not logged in, redirecting to /login from', router.pathname);
        router.push('/login');
      }
    }
  }, [loggedIn, isHydrated, router, router.pathname]);

  if (!isHydrated) {
    console.log('ProtectedRoute: Rendering loading state, not hydrated yet');
    return <div>Loading...</div>;
  }

  if (loggedIn && protectedRoutes.includes(router.pathname)) {
    console.log('ProtectedRoute: Rendering protected route', router.pathname);
    return <>{children}</>;
  } else if (!loggedIn && publicRoutes.includes(router.pathname)) {
    console.log('ProtectedRoute: Rendering public route', router.pathname);
    return <>{children}</>;
  }

  console.log('ProtectedRoute: Rendering loading state for', router.pathname);
  return <div>Loading...</div>;
}