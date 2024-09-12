import { useEffect, useState } from 'react';
import { useStateProvider } from '../useStateProvider';
import { Login } from '../../content/LoginPage/Login';
import { Spinner } from '../../components/Spinner';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { state, actions } = useStateProvider();
  const [isLoading, setIsLoading] = useState(true);
  const { setAuthData } = actions;
  const { token } = state.auth;

  const loadAuthDataFromStorage = () => {
    const savedAuthData = localStorage.getItem('authData');
    try {
      if (savedAuthData) {
        const parsedData = JSON.parse(savedAuthData);
        setAuthData(parsedData);
      }
    } catch {}
  };

  useEffect(() => {
    if (!token) {
      loadAuthDataFromStorage();
      setIsLoading(false);
    }
  }, [token]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!token) {
    return <Login />;
  }

  return <>{children}</>;
};
