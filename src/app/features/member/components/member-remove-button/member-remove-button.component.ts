import { Component, Input, OnDestroy } from '@angular/core'
import { AlertModalType, ModalButtonType, ModalService, NotificationService } from 'carbon-components-angular'
import { catchError, EMPTY, Subject, takeUntil, tap } from 'rxjs'
import { Member } from '../../models/member.model'
import { MemberService } from '../../services/member.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-member-remove-button[member]',
  template: `
    <button ibmButton="danger" size="field" (click)="showRemoveModal()">
      <span i18n>Remove</span>
      <svg ibmIcon="delete" size="16" class="bx--btn__icon"></svg>
    </button>
  `,
})
export class MemberRemoveButtonComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>()
  @Input() member!: Member

  constructor(
    private service: MemberService,
    private router: Router,
    private modalService: ModalService,
    private notificationService: NotificationService
  ) {}

  showRemoveModal() {
    this.modalService.show({
      type: AlertModalType.danger,
      label: this.member.name,
      title: $localize`Remove member`,
      size: 'xs',
      content: $localize`Are you sure you want to remove this member?`,
      buttons: [
        { type: ModalButtonType.secondary, text: 'Close' },
        { type: ModalButtonType.danger, text: 'Remove', click: () => this.removeMember() },
      ],
    })
  }

  removeMember() {
    this.service
      .deleteMember(this.member.id)
      .pipe(
        tap(async () => {
          this.successNotification()
          await this.router.navigate(['member'])
        }),
        catchError((error) => {
          this.errorNotification(error)
          return EMPTY
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  private successNotification() {
    this.notificationService.showNotification({
      type: 'success',
      title: $localize``,
    })
  }

  private errorNotification(error: unknown) {
    this.notificationService.showNotification({
      type: 'error',
      title: $localize`Error removing member ${this.member.name}`,
      caption: JSON.stringify(error),
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
