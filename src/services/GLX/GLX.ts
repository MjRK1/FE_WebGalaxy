import axios from 'axios';
import { GLX_URL } from '../../utils/services';
import { IAuth } from './IGLX';

export class GLX {
  static getMe(token: string | null): Promise<any> {
    return axios.get(`${GLX_URL}users/getMe`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static registration(params: IAuth | undefined): Promise<any> {
    return axios.post(`${GLX_URL}auth/registration`, { ...params });
  }

  static login(params: IAuth | undefined): Promise<any> {
    return axios.post(`${GLX_URL}auth/login`, { ...params });
  }
}
