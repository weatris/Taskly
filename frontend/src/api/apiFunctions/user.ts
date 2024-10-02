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
};
