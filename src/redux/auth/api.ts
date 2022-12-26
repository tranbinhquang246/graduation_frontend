import axios from 'axios';
import { LoginPayload } from './type';

export const login = (data: LoginPayload) => {
  return axios.post('/api/login', data);
};
