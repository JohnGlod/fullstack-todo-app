interface Error {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export interface ErrorResponse {
  errors: Error[];
  message: string;
}
