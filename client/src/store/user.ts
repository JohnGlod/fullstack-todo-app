import { makeAutoObservable } from 'mobx';
import { UserDto, LoginData, SignUpData } from '../models/IUser.interface';
import { AuthService } from '../services/AuthService';
import { EmployeeService } from '../services/EmployeeService';
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
  setIsAdmin(bool: boolean){
    this.isAdmin = bool;
  }
  setMyEmployees(employees: UserDto[]) {
    this.myEmployees = employees;
  }

  async login(formData: LoginData) {
    this.setErrorMessages('')
    try {
      const { data } = await AuthService.login(formData);
      const { user, accessToken } = data;
      localStorage.setItem('token', accessToken);
      this.setAuth(true);
      this.setUser(user);
      console.log(!user.managerId, 'if user.man');
      if (!user.managerId) {
        this.getEmpoyees(user.id);
        this.setIsAdmin(true);
      }
      console.log(user, this.isAuth);
    } catch (error) {
      this.setErrorMessages((error as Error).message);
    }
  }
  async getEmpoyees(id: string) {
    try {
      const response = await EmployeeService.getMyAssigns(id);
      this.setMyEmployees(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async signup(formData: SignUpData, id ?: string) {
    try {
      const response = await AuthService.signup(formData, id);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  }
  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as UserDto);
    } catch (error) {
      console.log(error);
    }
  }
}

const userStore = new UserStore();

export { userStore };
