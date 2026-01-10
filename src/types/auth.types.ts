export interface GoogleLoginRequest {
  code: string;
  state: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  username: string;
  memberRole: 'ROLE_MEMBER' | 'ROLE_ADMIN';
  imageUrl: string;
  memberId: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: Omit<LoginResponse, 'accessToken' | 'refreshToken'> | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthContextType extends AuthState {
  login: (accessToken: string, refreshToken: string | undefined, user: Omit<LoginResponse, 'accessToken' | 'refreshToken'>) => void;
  logout: () => void;
}
