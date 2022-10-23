import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../../data/member/model/member.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertModalType, ModalButtonType, ModalService, NotificationService } from 'carbon-components-angular';
import { UpdateMember } from '../../../data/member/model/update-member.model';
import { MemberStatus } from '../../../data/member/model/member-status.model';
import { MemberService } from '../../../data/member/service/member.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-video-id',
  templateUrl: './member-id.component.html',
  styleUrls: ['./member-id.component.scss'],
})
export class MemberIdComponent implements OnDestroy {
  public member: Member;
  public readonly form: FormGroup;
  public readonly statuses = Object.values(MemberStatus);
  private readonly destroy$ = new Subject<boolean>();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MemberService,
    private fb: FormBuilder,
    private modalService: ModalService,
    private notificationService: NotificationService
  ) {
    this.member = <Member>this.route.snapshot.data['member'];
    const { id, ...modifiableValues } = this.member;
    this.form = this.fb.nonNullable.group<UpdateMember>(modifiableValues);
  }

  submit() {
    if (this.form.valid) {
      this.service
        .updateMember(this.member.id, this.form.value)
        .pipe(
          tap((member) => this.onSuccessToast(member)),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }

  onSuccessToast(member: Member) {
    this.notificationService.showToast({
      type: 'success',
      title: $localize`Profile updated`,
      subtitle: member.name,
      caption: $localize`Changes were saved`,
      duration: 3000,
    });
  }

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
    });
  }

  removeMember() {
    this.service
      .deleteMember(this.member.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.router.navigate(['member']),
        error: (error) =>
          this.notificationService.showNotification({
            type: 'error',
            title: $localize`Error removing member ${this.member.name}`,
            caption: error.toString(),
          }),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
