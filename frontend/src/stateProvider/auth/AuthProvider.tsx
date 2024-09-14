import { useEffect, useState } from 'react';
import { useStateProvider } from '../useStateProvider';
import { Spinner } from '../../components/Spinner';
import { UserControl } from '../../content/UserControl/UserControl';
import { useApiMutation } from '../../api/useApiMutation';
import { useEffectOnce } from 'react-use';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { state, actions } = useStateProvider();
  const [isLoading, setIsLoading] = useState(true);
  const { setAuthData } = actions;
  const { token, expirationDate } = state.auth;

  const { mutate, isPending } = useApiMutation('refreshToken', {
    onError: (error) => {
      console.error('Token refresh error:', error);
      setAuthData(undefined);
    },
    onSuccess: (data) => {
      localStorage.setItem('authData', JSON.stringify(data));
      if (data.expirationDate)
        setAuthData({
          ...data,
          expirationDate: new Date(data.expirationDate),
        });
    },
  });

  useEffectOnce(() => {
    const loadAuthDataFromStorage = () => {
      const savedAuthData = localStorage.getItem('authData');
      if (savedAuthData) {
        try {
          const parsedData = JSON.parse(savedAuthData);
          setAuthData({
            ...parsedData,
            expirationDate: new Date(parsedData.expirationDate),
          });
        } catch (error) {
          console.error('Error parsing auth data:', error);
          setAuthData(undefined);
        }
      } else {
        setAuthData(undefined);
      }
      setIsLoading(false);
    };

    loadAuthDataFromStorage();
  });

  useEffect(() => {
    if (expirationDate) {
      const timeBeforeExpire = 60 * 1000; // 60 seconds
      const now = new Date();
      const timeUntilExpiration = expirationDate.getTime() - now.getTime();
      const timeUntilRefresh = timeUntilExpiration - timeBeforeExpire;

      if (timeUntilExpiration <= 0 || timeUntilRefresh <= 0) {
        mutate({});
      } else {
        const timerId = setTimeout(() => {
          mutate({});
        }, timeUntilRefresh);

        return () => {
          clearTimeout(timerId);
        };
      }
    }
  }, [expirationDate, mutate]);

  if (isLoading || isPending) {
    return <Spinner />;
  }

  if (!token) {
    return <UserControl />;
  }

  return <>{children}</>;
};
