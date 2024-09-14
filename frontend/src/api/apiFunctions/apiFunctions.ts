import { userFunctions } from './user';

export const BACKEND_URL =
  process.env.REACT_BACKEND_URL || 'http://localhost:5000';

export const apiFunctions = {
  ...userFunctions,
};
