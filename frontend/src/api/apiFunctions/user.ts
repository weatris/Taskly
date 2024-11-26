import axios from 'axios';
import { BACKEND_URL } from './apiFunctions';
import { AuthState } from '../../stateProvider/auth/auth';

type LoginResponse = AuthState;

export const userFunctions = {
  createUser: ({
    params,
  }: {
    params: { name: string; email: string; password: string };
  }) => axios.post<LoginResponse>(BACKEND_URL + '/users', params),

  login: ({ params }: { params: { email: string; password: string } }) =>
    axios.post<LoginResponse>(BACKEND_URL + '/users/login', params),

  refreshToken: () => axios.get<LoginResponse>(BACKEND_URL + '/users/refresh'),

  validateToken: (token: string) =>
    axios.post<LoginResponse>(BACKEND_URL + '/users/validate', { token }),

  sendRecoverPasswordForm: ({ email }: { email: string }) =>
    axios.post(BACKEND_URL + '/users/recover', { email }),

  validateRecoverPasswordForm: ({ id }: { id: string }) =>
    axios.post<string>(BACKEND_URL + '/users/recover/validate', { id }),

  changePassword: ({ email, password }: { email: string; password: string }) =>
    axios.post(BACKEND_URL + '/users/change_password', { email, password }),
};
