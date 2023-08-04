import { MemberStatus } from './member-status.model'

export class Member {
  constructor(
    public id: string,
    public url: string,
    public name: string,
    public nickname: string,
    public description: string,
    public joinedAt: string,
    public role: string,
    public status: MemberStatus,
    public archived: boolean,
  ) {}
}
