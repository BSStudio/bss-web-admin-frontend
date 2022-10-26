import { HttpClient } from '@angular/common/http';
import { Member } from '../models/member.model';
import { CreateMember } from '../models/create-member.model';
import { UpdateMember } from '../models/update-member.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private http: HttpClient) {}

  getMember(memberId: string) {
    return this.http.get<Member>(`/api/member/${memberId}`);
  }

  getMembers() {
    return this.http.get<Member[]>('/api/member');
  }

  createMember(createMember: CreateMember) {
    return this.http.post<Member>('/api/member', createMember);
  }

  updateMember(memberId: string, updateMember: UpdateMember) {
    return this.http.put<Member>(`/api/member/${memberId}`, updateMember);
  }

  deleteMember(memberId: string) {
    return this.http.delete(`/api/member/${memberId}`);
  }
}
