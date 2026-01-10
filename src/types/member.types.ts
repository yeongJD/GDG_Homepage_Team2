export interface MemberBlog {
  velog?: string;
  naver?: string;
  tistory?: string;
  github?: string;
  notefolio?: string;
  behance?: string;
  devdojo?: string;
  notion?: string;
}

export interface Member {
  id: string;
  name: string;
  author_name: string;
  role: 'lead' | 'core' | 'devrel' | 'member';
  email: string;
  github?: string;
  description: string;
  introduce: string;
  blogs?: MemberBlog;
  imageUrl?: string; // API에서 받아온 이미지 URL
  major?: string;    // 전공
  stacks?: string[]; // 소셜 링크 (5기)
}

export interface ApiMember {
  name: string;
  major: string;
  bio: string; // introduce
  imageUrl: string;
  stacks: string[];
  memberRole: 'LEAD' | 'CORE' | 'DEVREL' | 'MEMBER';
  part: 'FRONTEND' | 'BACKEND' | 'APP' | 'DESIGN';
}

export interface GenerationData {
  generation: number;
  members: Member[];
}
