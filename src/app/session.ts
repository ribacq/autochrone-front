import { User } from './user';

export interface Session {
  tokenString: string;
  user: User;
}
