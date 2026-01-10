import { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, AuthState, LoginResponse } from '@/types/auth.types';
import { tokenUtils } from '@/utils/token.utils';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
  });

  // 초기화: localStorage에서 토큰 복원
  useEffect(() => {
    const token = tokenUtils.getToken();
    const refreshToken = tokenUtils.getRefreshToken();
    const user = tokenUtils.getUser();

    console.log('AuthContext: Initializing...', { token: !!token, refreshToken: !!refreshToken, user });

    if (token && user) {
      setAuthState({
        isAuthenticated: true,
        user,
        accessToken: token,
        refreshToken: refreshToken || null,
      });
    }
  }, []);

  const login = (accessToken: string, refreshToken: string | undefined, user: Omit<LoginResponse, 'accessToken' | 'refreshToken'>) => {
    console.log('AuthContext: login called', { user });
    tokenUtils.setToken(accessToken);
    if (refreshToken) {
      tokenUtils.setRefreshToken(refreshToken);
    }
    tokenUtils.setUser(user);
    setAuthState({
      isAuthenticated: true,
      user,
      accessToken,
      refreshToken: refreshToken || null,
    });
  };

  const logout = () => {
    console.log('AuthContext: logout called');
    tokenUtils.removeToken();
    setAuthState({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
