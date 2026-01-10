import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authApi } from '@/api/auth.api';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const processedRef = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      console.log('=== GoogleCallback Debug ===');
      console.log('Code present:', !!code);
      console.log('Processed ref:', processedRef.current);

      if (!code) {
        setError('인증 코드가 없습니다.');
        setTimeout(() => navigate(ROUTES.HOME), 2000);
        return;
      }

      // 이미 처리된 code인지 확인 (localStorage 사용)
      const processedCode = sessionStorage.getItem('processed_google_code');
      if (processedCode === code) {
        console.log('Code already processed, skipping...');
        return;
      }

      // 중복 실행 방지
      if (processedRef.current) {
        console.log('Already processing, skipping...');
        return;
      }
      processedRef.current = true;

      // code를 sessionStorage에 저장
      sessionStorage.setItem('processed_google_code', code);

      try {
        const requestData = {
          code,
          state: state || 'state_placeholder',
        };
        console.log('Sending to backend:', JSON.stringify(requestData));

        const response = await authApi.googleLogin(requestData);

        console.log('Login successful, updating context...');
        const { accessToken, refreshToken, ...user } = response;
        login(accessToken, refreshToken, user);

        // 성공 후 sessionStorage 정리
        sessionStorage.removeItem('processed_google_code');

        console.log('Navigating to HOME...');
        navigate(ROUTES.HOME, { replace: true });
      } catch (err: any) {
        console.error('=== Login Error Details ===');
        console.error('Error object:', err);
        console.error('Response status:', err.response?.status);
        console.error('Response data:', err.response?.data);
        console.error('Response headers:', err.response?.headers);
        console.error('Request config:', err.config);
        console.error('Request data:', err.config?.data);

        // 실패 시 sessionStorage 정리 (재시도 가능하도록)
        sessionStorage.removeItem('processed_google_code');

        const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message;
        setError(`로그인 실패: ${errorMsg}`);
        setTimeout(() => navigate(ROUTES.HOME, { replace: true }), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, login]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        {error ? (
          <>
            <p className="text-xl text-red-r3 mb-4">{error}</p>
            <p className="text-grey-7">잠시 후 홈으로 이동합니다...</p>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grey-10 mx-auto mb-4"></div>
            <p className="text-xl text-grey-10">로그인 처리 중...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleCallback;
