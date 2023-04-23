import {AxiosResponse} from 'axios';

import { LoginData, SignUpData } from '../models/IUser.interface';
import { AuthResponse } from '../models/response/AuthResponse.model';

import api from '../http';

export class AuthService {
  static async login(userInfo: LoginData): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('login', userInfo);
  }
  static async signup(userInfo: SignUpData): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('registration', userInfo);
  }
  static async logout(): Promise<void> {
    return api.post('logout');
  }
}
