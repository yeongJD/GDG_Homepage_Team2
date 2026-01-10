import { LoginResponse } from '@/types/auth.types';

const TOKEN_KEY = 'gdg_access_token';
const REFRESH_TOKEN_KEY = 'gdg_refresh_token';
const USER_KEY = 'gdg_user_info';

export const tokenUtils = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),

  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  
  setRefreshToken: (token: string) => localStorage.setItem(REFRESH_TOKEN_KEY, token),

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getUser: (): Omit<LoginResponse, 'accessToken' | 'refreshToken'> | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  setUser: (user: Omit<LoginResponse, 'accessToken' | 'refreshToken'>) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};
