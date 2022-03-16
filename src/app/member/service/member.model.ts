export type MemberStatus = 'ALUMNI' | 'ACTIVE_ALUMNI' | 'MEMBER' | 'MEMBER_CANDIDATE' | 'MEMBER_CANDIDATE_CANDIDATE';

export interface Member {
  id: string;
  url: string;
  name: string;
  description: string;
  imageUrl: string;
  joinedAt: string;
  role: string;
  status: MemberStatus;
  archived: boolean;
}

export interface CreateMember {
  url: string;
  name: string;
}

export interface UpdateMember {
  url: string;
  name: string;
  description: string;
  imageUrl: string;
  joinedAt: string;
  role: string;
  status: MemberStatus;
  archived: boolean;
}
