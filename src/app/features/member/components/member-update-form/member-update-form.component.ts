import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Subject, takeUntil, tap } from 'rxjs'
import { NotificationService } from 'carbon-components-angular'
import { Member, MemberStatus } from '../../models'
import { MemberService } from '../../services/member.service'
import { flatpickrOptions } from '../../../../core/util/flatpickr-options'

@Component({
  selector: 'app-member-update-form[member]',
  templateUrl: './member-update-form.component.html',
  styleUrls: ['./member-update-form.component.scss'],
})
export class MemberUpdateFormComponent implements OnChanges, OnDestroy {
  @Input() public member!: Member
  @Output() public update = new EventEmitter<Member>()
  private readonly destroy$ = new Subject<void>()
  public readonly statuses: MemberStatus[] = Object.values(MemberStatus)
  public readonly flatpickrOptions = flatpickrOptions
  public readonly form = this.fb.nonNullable.group({
    url: this.fb.nonNullable.control('', [Validators.required]),
    name: this.fb.nonNullable.control('', [Validators.required]),
    nickname: this.fb.nonNullable.control(''),
    description: this.fb.nonNullable.control(''),
    joinedAt: this.fb.nonNullable.control('', [Validators.required]),
    role: this.fb.nonNullable.control(''),
    status: this.fb.nonNullable.control(MemberStatus.MEMBER_CANDIDATE_CANDIDATE, [Validators.required]),
    archived: this.fb.nonNullable.control(false, [Validators.required]),
  })

  constructor(
    private fb: FormBuilder,
    private service: MemberService,
    private notificationService: NotificationService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['member']) {
      const { id, ...modifiableValues } = this.member
      this.form.patchValue(modifiableValues)
      this.form.markAsPristine()
    }
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      this.service
        .updateMember(this.member.id, this.form.getRawValue())
        .pipe(
          tap({
            next: (member) => {
              this.update.emit(member)
              this.onSuccessToast(member)
            },
            error: (err) => this.onErrorToast(err),
          }),
          takeUntil(this.destroy$)
        )
        .subscribe()
    }
  }

  onSuccessToast(member: Member) {
    this.notificationService.showToast({
      type: 'success',
      title: $localize`Profile updated`,
      subtitle: member.name,
      caption: $localize`Changes were saved`,
      duration: 3000,
    })
  }

  private onErrorToast(err: unknown) {
    this.notificationService.showToast({ type: 'error', title: '' })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
