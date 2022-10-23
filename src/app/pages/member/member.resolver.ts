import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { throwError } from 'rxjs';
import { MemberService } from '../../data/member/service/member.service';
import { Member } from '../../data/member/model/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberResolver implements Resolve<Member> {
  constructor(private service: MemberService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const memberId = route.paramMap.get('memberId');
    if (!memberId) return throwError(() => 'memberId is null');
    return this.service.getMember(memberId);
  }
}
