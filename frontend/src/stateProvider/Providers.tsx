import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './auth/AuthProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider> {children}</AuthProvider>
    </Provider>
  );
};
