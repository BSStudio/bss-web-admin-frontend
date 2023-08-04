import { SimpleMember } from '../../member/models/simple-member.model'

export class CrewMember {
  constructor(
    public position: string,
    public videoId: string,
    public member: SimpleMember,
  ) {}
}
