import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Subject, takeUntil, tap } from 'rxjs'
import { Member, MemberStatus } from '../../models'
import { flatpickrOptions } from '../../../../core/util/flatpickr-options'
import { MemberActionsService } from '../../actions/member.actions.service'

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
    joinedAt: this.fb.nonNullable.control<Date[]>([new Date()], [Validators.required]),
    role: this.fb.nonNullable.control(''),
    status: this.fb.nonNullable.control(MemberStatus.MEMBER_CANDIDATE_CANDIDATE, [Validators.required]),
    archived: this.fb.nonNullable.control(false, [Validators.required]),
  })

  constructor(private fb: FormBuilder, private service: MemberActionsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['member']) {
      const { id, joinedAt, ...modifiableValues } = this.member
      this.form.patchValue({ joinedAt: [new Date(joinedAt)], ...modifiableValues })
      this.form.markAsPristine()
    }
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      const { joinedAt, ...rest } = this.form.getRawValue()
      const formatDate = joinedAt[0].toISOString().split('T')[0]
      this.service
        .updateMember(this.member.id, { joinedAt: formatDate, ...rest })
        .pipe(
          tap((member) => this.update.emit(member)),
          takeUntil(this.destroy$)
        )
        .subscribe()
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
