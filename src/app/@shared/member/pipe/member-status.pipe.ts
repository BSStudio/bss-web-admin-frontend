import { Pipe, PipeTransform } from '@angular/core';
import { MemberStatus } from '../../../data/member/model/member-status.model';

@Pipe({
  name: 'memberStatus',
})
export class MemberStatusPipe implements PipeTransform {
  private static readonly MAP: { [status in MemberStatus]: string } = {
    MEMBER: $localize`Member`,
    ACTIVE_ALUMNI: $localize`Active alumni`,
    MEMBER_CANDIDATE: $localize`Member candidate`,
    ALUMNI: $localize`Alumni`,
    MEMBER_CANDIDATE_CANDIDATE: $localize`Member candidate candidate`,
  };

  transform(value: MemberStatus): string {
    return MemberStatusPipe.MAP[value];
  }
}
