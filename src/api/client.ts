import axios from 'axios';
import { tokenUtils } from '@/utils/token.utils';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 디버깅: baseURL 확인
console.log('🔧 API Client baseURL:', import.meta.env.VITE_API_BASE_URL);

// Request 인터셉터: 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    // 로그인 요청에는 토큰을 추가하지 않음
    if (!config.url?.includes('/login')) {
      const token = tokenUtils.getToken();
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response 인터셉터: 401 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 로그인 요청에서 발생한 401은 리다이렉트 하지 않음 (컴포넌트에서 처리)
    if (error.response?.status === 401 && !error.config.url.includes('/login')) {
      console.warn('Unauthorized access detected. Redirecting to home...');
      tokenUtils.removeToken();
      // /login 라우트가 없으므로 홈으로 리다이렉트 (모달이 자동으로 열림)
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
