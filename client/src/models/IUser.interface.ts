export interface IUser {
  id: string;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  managerId: string | null;
  fullName: string;
}

export type SignUpData = Omit<IUser, 'id' | 'managerId' | 'fullName'>;
export type LoginData = Pick<IUser, 'login' | 'password'| 'fullName'>;
export type UserDto = Omit<IUser, 'password'>;
