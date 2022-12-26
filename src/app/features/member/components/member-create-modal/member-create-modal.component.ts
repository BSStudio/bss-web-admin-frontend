import { Component, OnDestroy, OnInit } from '@angular/core'
import { BaseModal, NotificationService } from 'carbon-components-angular'
import { FormBuilder, Validators } from '@angular/forms'
import { CreateMember } from '../../models/create-member.model'
import { MemberService } from '../../services/member.service'
import { filter, map, Subject, takeUntil, tap } from 'rxjs'
import { Member } from '../../models/member.model'

@Component({
  selector: 'app-member-create-modal',
  templateUrl: './member-create-modal.component.html',
})
export class MemberCreateModalComponent extends BaseModal implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>()
  public readonly form = this.fb.nonNullable.group({
    name: this.fb.nonNullable.control('', [Validators.required]),
    url: this.fb.nonNullable.control('', [Validators.required, Validators.pattern(/^[a-z]+$/)]),
  })

  constructor(
    private service: MemberService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    super()
  }

  ngOnInit(): void {
    this.initAutomaticUrlGenerator()
  }

  private initAutomaticUrlGenerator() {
    this.form.controls.name.valueChanges
      .pipe(
        map((name) => name.toLowerCase().split(' ')),
        // wait for family and given name to be present && given name length to be more than 1
        filter((nameParts) => nameParts.length > 1 && nameParts[nameParts.length - 1].length > 0),
        tap(([familyName, ...givenNameParts]) => {
          const givenNameFirstChar = givenNameParts[givenNameParts.length - 1][0]
          this.form.controls.url.setValue(`${givenNameFirstChar}${familyName}`)
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  get nameInvalidText(): string {
    const { name } = this.form.controls
    if (name.touched && name.errors) {
      if (name.errors['required']) {
        return $localize`Field required`
      }
      return JSON.stringify(name.errors)
    } else return ''
  }

  get urlInvalidText(): string {
    const { url } = this.form.controls
    if (url.touched && url.errors) {
      if (url.errors['required']) {
        return $localize`Field required`
      }
      if (url.errors['pattern']) {
        return $localize`Does not match url pattern: ${url.errors['pattern'].requiredPattern}`
      }
      return JSON.stringify(url.errors)
    } else return ''
  }

  get urlHelperText(): string {
    const { url } = this.form.getRawValue()
    const renderedUrl = url ? url : $localize`jdoe`
    return $localize`The member will have the following url: https://bsstudio/member/${renderedUrl}`
  }

  onSubmit() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      this.createMember(this.form.getRawValue())
    }
  }

  private createMember(createMember: CreateMember) {
    this.service
      .createMember(createMember)
      .pipe(
        tap({
          next: (member) => {
            this.successNotification(member)
            this.close.emit(true)
          },
          error: () => window.alert($localize`Server error: name and url must be unique`),
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  private successNotification(member: Member) {
    this.notificationService.showToast({ type: 'success', title: member.name })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
