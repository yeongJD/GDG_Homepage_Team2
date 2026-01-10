export type MemberRole = 'LEAD' | 'CORE' | 'DEVREL' | 'MEMBER';

export interface ProfileData {
  memberId: number;
  name: string;
  email: string;
  major: string;
  bio: string;
  imageUrl: string;
  stacks: string[];
  memberRole: MemberRole;
}

export interface ProfileUpdateRequest {
  memberId: number;
  name: string;
  major: string;
  bio: string;
  imageUrl: string;
  stacks: string[];
  memberRole: MemberRole;
}

export interface ProfileGetResponse {
  name: string;
  email: string;
  major: string;
  bio: string;
  imageUrl: string;
  stacks: string[];
  memberRole: MemberRole;
}