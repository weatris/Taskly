import axios from 'axios';
import { useEffect } from 'react';
import { useStateProvider } from './useStateProvider';

export const RequestInterceptor = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { token } = useStateProvider().state.auth;

  useEffect(() => {
    if (token) {
      axios.interceptors.request.use(async (config) => {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });
    }
  }, [token]);

  return <>{children}</>;
};
