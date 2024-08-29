export interface Users {
  user: User;
}

export interface User {
  uid: string;
  isLogged: boolean;
  email: string;
  history?: Request[];
}

interface Request {
  request: string;
}
