export interface IUser {
  id: string;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  managerId: string | null;
}

export type SignUpData = Omit<IUser, 'id' | 'managerId'>;
export type LoginData = Pick<IUser, 'login' | 'password'>;
export type UserDto = Omit<IUser, 'password'>;
