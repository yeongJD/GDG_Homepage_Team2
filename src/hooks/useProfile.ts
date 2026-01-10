import { useState, useEffect } from 'react';
import { profileApi } from '@/api/profile.api';
import { ProfileData, ProfileUpdateRequest } from '@/types/profile.types';
import { useAuth } from './useAuth';

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 프로필 조회
  const fetchProfile = async () => {
    if (!user?.memberId) return;

    setLoading(true);
    setError(null);
    try {
      const data = await profileApi.getProfile();
      setProfile({
        memberId: user.memberId,
        ...data,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || '프로필 조회 실패');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 프로필 수정
  const updateProfile = async (data: ProfileUpdateRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await profileApi.updateProfile(data);
      setProfile({
        memberId: data.memberId,
        ...updated,
      });
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || '프로필 수정 실패';
      setError(message);
      console.error('Profile update error:', err);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user?.memberId]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile,
  };
};