import { AxiosError, isAxiosError } from 'axios';

export function isAxiosErrorCheck<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error);
}
