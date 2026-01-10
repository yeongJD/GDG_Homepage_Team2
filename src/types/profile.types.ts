export type MemberRole = 'LEAD' | 'CORE' | 'DEVREL' | 'MEMBER';
export type MemberPart = 'FRONTEND' | 'BACKEND' | 'APP' | 'DESIGN';

export interface ProfileData {
  memberId: number;
  name: string;
  email: string;
  major: string;
  bio: string;
  imageUrl: string;
  stacks: string[];
  memberRole: MemberRole;
  part: MemberPart;
}

export interface ProfileUpdateRequest {
  memberId: number;
  name: string;
  major: string;
  bio: string;
  imageUrl: string;
  stacks: string[];
  memberRole: MemberRole;
  part: MemberPart;
}

export interface ProfileGetResponse {
  name: string;
  email: string;
  major: string;
  bio: string;
  imageUrl: string;
  stacks: string[];
  memberRole: MemberRole;
  part: MemberPart;
}