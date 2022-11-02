import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MemberStatus } from '../../models/member-status.model';
import { Member } from '../../models/member.model';
import { UpdateMember } from '../../models/update-member.model';
import { Subject, takeUntil, tap } from 'rxjs';
import { MemberService } from '../../services/member.service';
import { NotificationService } from 'carbon-components-angular';

type MemberFormGroup = FormGroup<{
  url: FormControl<string>;
  name: FormControl<string>;
  description: FormControl<string>;
  joinedAt: FormControl<string>;
  role: FormControl<string>;
  status: FormControl<MemberStatus>;
  archived: FormControl<boolean>;
}>;

@Component({
  selector: 'app-member-update-form[member]',
  templateUrl: './member-update-form.component.html',
})
export class MemberUpdateFormComponent implements OnChanges, OnDestroy {
  @Input() public member!: Member;
  @Output() public update = new EventEmitter<Member>();
  public readonly form: MemberFormGroup;
  public readonly statuses: MemberStatus[] = Object.values(MemberStatus);
  private readonly destroy$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private service: MemberService,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.nonNullable.group<UpdateMember>({
      url: '',
      name: '',
      description: '',
      joinedAt: '',
      role: '',
      status: MemberStatus.MEMBER_CANDIDATE_CANDIDATE,
      archived: false,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['member']) {
      const { id, ...modifiableValues } = this.member;
      this.form.patchValue(modifiableValues);
    }
  }

  submit() {
    if (this.form.valid) {
      this.service
        .updateMember(this.member.id, this.form.getRawValue())
        .pipe(
          tap((member) => this.update.emit(member)),
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
