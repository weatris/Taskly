import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './auth/AuthProvider';
import { NotificationProvider } from './notification/NotificationProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <NotificationProvider />
      <AuthProvider> {children}</AuthProvider>
    </Provider>
  );
};
