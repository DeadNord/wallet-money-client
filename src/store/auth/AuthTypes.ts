export interface User {
  id: string | null;
  name: string | null;
  email: string | null;
}

export interface AuthState {
  accessToken: string | null;
  user: User;
  isLoggedIn: boolean;
  error: string | null;
}

export interface SignInValues {
  email: string;
  password: string;
}

export interface SignUpValues {
  email: string;
  name: string;
  mobile: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}
