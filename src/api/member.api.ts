import { apiClient } from './client';
import { ApiMember } from '@/types/member.types';

export const memberApi = {
  // 5기 멤버 전체 조회
  getGeneration5Members: async (): Promise<ApiMember[]> => {
    const response = await apiClient.get<ApiMember[]>('/api/v1/members/generation/5');
    return response.data;
  },
};
