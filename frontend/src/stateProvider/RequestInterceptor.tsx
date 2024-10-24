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
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          window.location.reload();
        } else {
          console.log('Axios error:', error);
        }
        return Promise.reject(error);
      },
    );
  }, [token]);

  return <>{children}</>;
};
