import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CreateMember, Member, UpdateMember } from '../models'

@Injectable({ providedIn: 'root' })
export class MemberService {
  constructor(private http: HttpClient) {}

  getMember(memberId: string) {
    return this.http.get<Member>(`/api/v1/member/${memberId}`)
  }

  getMembers() {
    return this.http.get<Member[]>('/api/v1/member')
  }

  createMember(createMember: CreateMember) {
    return this.http.post<Member>('/api/v1/member', createMember)
  }

  updateMember(memberId: string, updateMember: UpdateMember) {
    return this.http.put<Member>(`/api/v1/member/${memberId}`, updateMember)
  }

  deleteMember(memberId: string) {
    return this.http.delete<void>(`/api/v1/member/${memberId}`)
  }
}
