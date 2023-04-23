import {AxiosResponse} from 'axios';

import { LoginData, SignUpData } from '../models/IUser.interface';
import { AuthResponse } from '../models/response/AuthResponse.model';

import api from '../http';

export class AuthService {
  static async login(userInfo: LoginData): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('login', userInfo);
  }
  static async signup(userInfo: SignUpData, id ?: string): Promise<AxiosResponse<AuthResponse>> {
    const path = id ? `registration/${id}` : 'registration';
    return api.post<AuthResponse>(path, userInfo);
  }
  static async logout(): Promise<void> {
    return api.post('logout');
  }
}
