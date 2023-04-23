import {AxiosResponse} from 'axios';

import { IUser} from '../models/IUser.interface';

import api from '../http';

export class EmployeeService {
  static async getMyAssigns(id: string): Promise<AxiosResponse<IUser[]>> {
    return api.get<IUser[]>(`users/${id}`);
  }
}
