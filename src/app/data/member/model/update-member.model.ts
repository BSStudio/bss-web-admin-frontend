import { MemberStatus } from './member-status.model';

export class UpdateMember {
  constructor(
    public url: string,
    public name: string,
    public description: string,
    public imageUrl: string,
    public joinedAt: string,
    public role: string,
    public status: MemberStatus,
    public archived: boolean
  ) {}
}
