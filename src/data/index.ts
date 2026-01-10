import { Member } from '@/types/member.types';
import { generation1Members } from './generation1';
import { generation2Members } from './generation2';
import { generation3Members } from './generation3';
import { generation4Members } from './generation4';
import { generation5Members } from './generation5';

export interface GenerationData {
  generation: number;
  label: string;
  members: Member[];
}

export const allGenerations: GenerationData[] = [
  {
    generation: 5,
    label: '5기',
    members: generation5Members
  },
  {
    generation: 4,
    label: '4기',
    members: generation4Members
  },
  {
    generation: 3,
    label: '3기',
    members: generation3Members
  },
  {
    generation: 2,
    label: '2기',
    members: generation2Members
  },
  {
    generation: 1,
    label: '1기',
    members: generation1Members
  }
];

export const getGenerationMembers = (generation: number): Member[] => {
  const gen = allGenerations.find(g => g.generation === generation);
  return gen?.members || [];
};

export const getMembersByRole = (members: Member[], role: 'lead' | 'core' | 'devrel' | 'member'): Member[] => {
  return members.filter(m => m.role === role);
};
