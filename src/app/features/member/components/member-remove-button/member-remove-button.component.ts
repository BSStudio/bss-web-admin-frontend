import { Component, Input, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { AlertModalType, ModalButtonType, ModalService } from 'carbon-components-angular'
import { Subject, takeUntil, tap } from 'rxjs'
import { Member } from '../../models'
import { MemberActionsService } from '../../actions/member.actions.service'

@Component({
  selector: 'app-member-remove-button[member]',
  template: `
    <button ibmButton="danger--tertiary" size="field" (click)="showRemoveModal()">
      <span i18n>Remove</span>
      <svg ibmIcon="delete" size="16" class="bx--btn__icon"></svg>
    </button>
  `,
})
export class MemberRemoveButtonComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>()
  @Input() member!: Member

  constructor(
    private service: MemberActionsService,
    private router: Router,
    private modalService: ModalService,
  ) {}

  showRemoveModal() {
    this.modalService.show({
      type: AlertModalType.danger,
      label: this.member.name,
      title: $localize`Remove member`,
      size: 'xs',
      content: $localize`Are you sure you want to remove this member?`,
      buttons: [
        { type: ModalButtonType.secondary, text: $localize`Close` },
        { type: ModalButtonType.danger, text: $localize`Remove`, click: () => this.removeMember() },
      ],
    })
  }

  removeMember() {
    this.service
      .deleteMember(this.member)
      .pipe(
        tap(async () => await this.router.navigate(['member'])),
        takeUntil(this.destroy$),
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
