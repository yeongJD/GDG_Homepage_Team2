import { apiClient } from './client';
import { GoogleLoginRequest, LoginResponse } from '@/types/auth.types';

export const authApi = {
  googleLogin: async (data: GoogleLoginRequest): Promise<LoginResponse> => {
    console.log('=== Auth API Request ===');
    console.log('Endpoint: POST /api/v1/member/login');
    console.log('Payload:', JSON.stringify(data, null, 2));
    console.log('Code length:', data.code.length);
    console.log('State:', data.state);

    try {
      const response = await apiClient.post<Omit<LoginResponse, 'accessToken'>>(
        '/api/v1/member/login',
        data
      );

      console.log('=== Auth API Response ===');
      console.log('Status:', response.status);
      console.log('Data:', response.data);
      console.log('Headers:', response.headers);

    // 응답 헤더에서 JWT 토큰 추출 (Bearer 포함)
    let accessToken = response.headers['authorization'] || response.headers['Authorization'];
    const refreshToken = response.headers['refresh-token'] || response.headers['Refresh-Token'];

    // 헤더에 없으면 바디에서 확인 (Fallback)
    if (!accessToken && (response.data as any).accessToken) {
      accessToken = (response.data as any).accessToken;
      // Bearer 접두사가 없으면 추가
      if (accessToken && !accessToken.startsWith('Bearer ')) {
        accessToken = `Bearer ${accessToken}`;
      }
    }

    console.log('Response Headers:', response.headers);
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);

    if (!accessToken) {
      throw new Error('응답 헤더 또는 바디에 Authorization 토큰이 없습니다.');
    }

      // Response Body + 헤더의 토큰 결합
      return {
        ...response.data,
        accessToken, // 'Bearer eyJ...' 형식 그대로 저장
        refreshToken: refreshToken || undefined,
      };
    } catch (error: any) {
      console.error('=== Auth API Error ===');
      console.error('Status:', error.response?.status);
      console.error('Status Text:', error.response?.statusText);
      console.error('Error Data:', error.response?.data);
      console.error('Error Message:', error.message);
      throw error;
    }
  },
};
