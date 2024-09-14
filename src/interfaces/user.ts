import { Variable } from './client';

export interface Users {
  user: User;
}

export interface User {
  uid: string;
  isLogged: boolean;
  email: string;
  history?: UserRequest[];
}

export interface UserRequest {
  client: string;
  request: {
    date: string;
    method: string;
    url: string;
    SDL?: string;
    header: Variable[];
    body: string;
    response: {};
    variables?: Variable[];
    Documentation?: string;
    status: string;
  };
}
