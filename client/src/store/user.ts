import { makeAutoObservable } from 'mobx';
import { UserDto, LoginData, SignUpData } from '../models/IUser.interface';
import { AuthService } from '../services/AuthService';
import { EmployeeService } from '../services/EmployeeService';
import { AxiosError } from 'axios';
import { isAxiosErrorCheck } from '../utils/isAxiosErrorCheck';
import { ErrorResponse } from '../models';
class UserStore {
  user = {} as UserDto;
  isAuth = false;
  errorMessages = '';
  isAdmin = false;
  myEmployees = [] as UserDto[];
  constructor() {
    makeAutoObservable(this);
  }

  setErrorMessages(message: string) {
    this.errorMessages = message;
  }
  setAuth(bool: boolean) {
    this.isAuth = bool;
  }
  setUser(user: UserDto) {
    this.user = user;
  }
  setIsAdmin(bool: boolean) {
    this.isAdmin = bool;
  }
  setMyEmployees(employees: UserDto[]) {
    this.myEmployees = employees;
  }

  async login(formData: LoginData) {
    this.setErrorMessages('');
    try {
      const { data } = await AuthService.login(formData);
      const { user, accessToken } = data;
      localStorage.setItem('token', accessToken);
      this.setAuth(true);
      this.setUser(user);
      if (!user.managerId) {
        this.getEmpoyees(user.id);
        this.setIsAdmin(true);
      }
    } catch (err) {
      if (isAxiosErrorCheck<ErrorResponse>(err)) {
        this.setErrorMessages((err as AxiosError).response?.data?.message || 'An error occurred');
      } else {
        this.setErrorMessages((err as Error).message);
      }
    }
  }
  async getEmpoyees(id: string) {
    try {
      const { data } = await EmployeeService.getMyAssigns(id);
      this.setMyEmployees(data);
    } catch (error) {
      console.log(error);
    }
  }

  async signup(formData: SignUpData, id?: string) {
    this.setErrorMessages('');
    try {
      const { data } = await AuthService.signup(formData, id);
      const { accessToken, user } = data;
      localStorage.setItem('token', accessToken);
      this.setAuth(true);
      this.setUser(user);
    } catch (err) {
      if (isAxiosErrorCheck<ErrorResponse>(err)) {
        this.setErrorMessages((err as AxiosError).response?.data?.message || 'An error occurred');
      } else {
        this.setErrorMessages((err as Error).message);
      }
    }
  }

  async logout() {
    this.setErrorMessages('');
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as UserDto);
    } catch (err) {
      if (isAxiosErrorCheck<ErrorResponse>(err)) {
        this.setErrorMessages((err as AxiosError).response?.data?.message || 'An error occurred');
      } else {
        this.setErrorMessages((err as Error).message);
      }
    }
  }
}

const userStore = new UserStore();

export { userStore };
