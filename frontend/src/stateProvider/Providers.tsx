import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './auth/AuthProvider';
import { NotificationProvider } from './notification/NotificationProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RequestInterceptor } from './RequestInterceptor';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Route, Routes } from 'react-router-dom';
import { RecoverPassword } from '../content/UserControl/RecoverPassword';
import { ChangePassword } from '../content/UserControl/ChangePassword';

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NotificationProvider />
        <RequestInterceptor>
          <AuthProvider>
            <DndProvider backend={HTML5Backend}>{children}</DndProvider>
          </AuthProvider>
        </RequestInterceptor>
      </Provider>
    </QueryClientProvider>
  );
};
