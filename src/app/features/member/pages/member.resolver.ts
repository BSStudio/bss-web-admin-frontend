import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { throwError } from 'rxjs'
import { MemberService } from '../services/member.service'

@Injectable({ providedIn: 'root' })
export class MemberResolver {
  constructor(private service: MemberService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const memberId = route.paramMap.get('memberId')
    if (!memberId) return throwError(() => 'memberId is null')
    return this.service.getMember(memberId)
  }
}
