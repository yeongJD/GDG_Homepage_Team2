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
}

export interface GenerationData {
  generation: number;
  members: Member[];
}
