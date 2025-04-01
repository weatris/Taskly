import { useEffect, useState } from 'react';
import { useStateProvider } from '../useStateProvider';
import { Spinner } from '../../components/basic/Spinner';
import { UserControl } from '../../content/UserControl/UserControl';
import { useApiMutation } from '../../api/useApiMutation';
import { useEffectOnce } from 'react-use';
import { Routes, Route } from 'react-router-dom';
import { ChangePassword } from '../../content/UserControl/ChangePassword';
import { RecoverPassword } from '../../content/UserControl/RecoverPassword';
import { RestoreAccount } from '../../content/UserControl/RestoreAccount';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { state, actions } = useStateProvider();
  const [isDataLoading, setIsLoading] = useState(true);
  const { setAuthData } = actions;
  const { token, expirationDate: expireDate } = state.auth;
  const expirationDate = expireDate ? new Date(expireDate) : '';

  const { mutate, isLoading } = useApiMutation('refreshToken', {
    onError: (error) => {
      console.log('Token refresh error:', error);
      localStorage.removeItem('authData');
      setAuthData(undefined);
    },
    onSuccess: (data) => {
      localStorage.setItem('authData', JSON.stringify(data));
      if (data.expirationDate)
        setAuthData({
          ...data,
          expirationDate: new Date(data.expirationDate).toISOString(),
        });
    },
    retry: () => false,
  });

  const { mutate: validateToken, isLoading: isValidating } = useApiMutation(
    'validateToken',
    {
      onError: (error) => {
        console.log('Token validate error:', error);
        localStorage.removeItem('authData');
        setAuthData(undefined);
      },
      onSuccess: () => {
        const savedAuthData = localStorage.getItem('authData');
        const parsedData = JSON.parse(savedAuthData || '');
        setAuthData({
          ...parsedData,
          expirationDate: new Date(parsedData.expirationDate).toISOString(),
        });
      },
      retry: () => false,
    },
  );

  useEffectOnce(() => {
    const loadAuthDataFromStorage = () => {
      const savedAuthData = localStorage.getItem('authData');
      if (savedAuthData) {
        try {
          const parsedData = JSON.parse(savedAuthData);
          const parsedToken = parsedData.token;
          if (parsedToken)
            validateToken(parsedToken, {
              onSuccess: () => {
                setAuthData({
                  ...parsedData,
                  expirationDate: new Date(
                    parsedData.expirationDate,
                  ).toISOString(),
                });
              },
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
  }, [expirationDate]);

  if (isDataLoading || isLoading || isValidating) {
    return <Spinner />;
  }

  if (!token) {
    return (
      <Routes>
        <Route path="*" element={<UserControl />} />
        <Route path="/recover" element={<RecoverPassword />} />
        <Route path="/recover/:id" element={<ChangePassword />} />
        <Route path="/restore_account" element={<RestoreAccount />} />
        <Route path="/restore_account/:id" element={<RestoreAccount />} />
      </Routes>
    );
  }

  return <>{children}</>;
};
