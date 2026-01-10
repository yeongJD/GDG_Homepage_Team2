import { apiClient } from './client';
import { ProfileGetResponse, ProfileUpdateRequest } from '@/types/profile.types';

export const profileApi = {
  // 프로필 조회
  getProfile: async (memberId: number): Promise<ProfileGetResponse> => {
    const response = await apiClient.get<ProfileGetResponse>(
      `/api/v1/me/profile/${memberId}`
    );
    return response.data;
  },

  // 프로필 수정
  updateProfile: async (data: ProfileUpdateRequest): Promise<ProfileGetResponse> => {
    const response = await apiClient.put<ProfileGetResponse>(
      '/api/v1/me/profile',
      data
    );
    return response.data;
  },
};