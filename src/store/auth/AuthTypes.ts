export interface User {
  id: string | null;
  name: string | null;
  email: string | null;
}

export interface AuthState {
  accessToken: string | null;
  user: User;
  isLoggedIn: boolean;
}
