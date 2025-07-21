import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  loggedIn: boolean;
  isHydrated: boolean;
  login: () => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
  isHydrated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLoggedIn = localStorage.getItem('loggedIn') === 'true';
      console.log('AuthContext: Initial sync with localStorage, loggedIn =', storedLoggedIn);
      setLoggedIn(storedLoggedIn);
      setIsHydrated(true);
    }
  }, []);

  const login = () => {
    console.log('AuthContext: Logging in, setting loggedIn to true');
    setLoggedIn(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('loggedIn', 'true');
    }
  };

  const logout = () => {
    console.log('AuthContext: Logging out, setting loggedIn to false');
    setLoggedIn(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('loggedIn', 'false');
    }
  };

  return (
    <AuthContext.Provider value={{ loggedIn, isHydrated, login, logout }}>
      {isHydrated ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};