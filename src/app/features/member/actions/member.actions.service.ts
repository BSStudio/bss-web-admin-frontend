import { Injectable } from '@angular/core'
import { MemberService } from '../services/member.service'
import { NotificationService } from 'carbon-components-angular'
import { Member, UpdateMember } from '../models'
import { catchError, EMPTY, tap } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class MemberActionsService {
  constructor(private service: MemberService, private notification: NotificationService) {}

  deleteMember(member: Member) {
    return this.service.deleteMember(member.id).pipe(
      tap(() => this.deleteSuccessNotification(member)),
      catchError((err) => {
        this.deleteErrorToast(err, member)
        return EMPTY
      })
    )
  }

  updateMember(memberId: string, updateMember: UpdateMember) {
    return this.service.updateMember(memberId, updateMember).pipe(
      tap((member) => this.updateSuccessToast(member)),
      catchError((err) => {
        this.updateErrorToast(err)
        return EMPTY
      })
    )
  }

  private deleteSuccessNotification(member: Member) {
    this.notification.showNotification({
      type: 'success',
      title: $localize`Member removed`,
      message: member.name,
      smart: true,
    })
  }

  private deleteErrorToast(error: unknown, member: Member) {
    const caption = $localize`Member is associated with one or more videos. Try archiving or remove positions`
    this.notification.showToast({
      type: 'error',
      title: $localize`Error removing member`,
      subtitle: member.name,
      caption: caption,
      message: caption,
      smart: true,
    })
  }

  private updateSuccessToast(member: Member) {
    const caption = $localize`Changes were saved`
    this.notification.showToast({
      type: 'success',
      title: $localize`Profile updated`,
      subtitle: member.name,
      caption: caption,
      message: caption,
      smart: true,
    })
  }

  private updateErrorToast(err: unknown) {
    const caption = $localize`Check if member was assigned to a video`
    this.notification.showToast({
      type: 'error',
      title: $localize`Error`,
      caption: caption,
      message: caption,
      smart: true,
    })
  }
}
