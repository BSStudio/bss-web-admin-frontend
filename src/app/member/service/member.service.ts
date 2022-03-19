import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateMember, Member, UpdateMember } from './member.model';

export class MemberService {
  constructor(private http: HttpClient) {}

  private static readonly defaultConfig = {
    headers: {
      'application-secret': 'appSecret',
    },
  };

  getMember(memberId: string) {
    return this.http.get<Member>(`/api/member/${memberId}`, MemberService.defaultConfig);
  }

  getMembers() {
    return this.http.get<Member[]>('/api/member', MemberService.defaultConfig);
  }

  createMember(createMember: CreateMember) {
    return this.http.post<Member>('/api/member', createMember, MemberService.defaultConfig);
  }

  updateMember(memberId: string, updateMember: UpdateMember) {
    return this.http.put<Member>(`/api/member/${memberId}`, updateMember, MemberService.defaultConfig);
  }

  deleteMember(memberId: string) {
    return this.http.delete(`/api/member/${memberId}`, MemberService.defaultConfig);
  }
}
