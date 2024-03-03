export interface User {
  fristName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}