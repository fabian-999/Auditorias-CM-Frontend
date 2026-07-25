export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar_url?: string;
}

export interface LoginDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}
