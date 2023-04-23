import { makeAutoObservable } from 'mobx';
import { UserDto, LoginData, SignUpData } from '../models/IUser.interface';
import { AuthService } from '../services/AuthService';

class Store {
  user = {} as UserDto;
  isAuth = false;
  errorMessages = '';
  
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }
  setUser(user: UserDto) {
    this.user = user;
  }

  async login(formData: LoginData) {
    try {
      const response = await AuthService.login(formData);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user); 
      console.log(response.data.user, this.isAuth);
    } catch (error) {
      console.log(error);
    }
  }

  async signup(formData: SignUpData) {
    try {
      const response = await AuthService.signup(formData);
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

const userStore = new Store();

export { userStore };
