import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { BaseModal, NotificationService } from 'carbon-components-angular'
import { EventService } from '../../services/event.service'
import { CreateEvent, Event } from '../../models'
import { catchError, EMPTY, map, Subject, takeUntil, tap } from 'rxjs'
import { removeTildes } from '../../../../core/util/remove-tildes'

@Component({
  selector: 'app-event-create-modal',
  templateUrl: './event-create-modal.component.html',
  styleUrls: ['./event-create-modal.component.scss'],
})
export class EventCreateModalComponent extends BaseModal implements OnInit, OnDestroy {
  @ViewChild('toastContent', { static: true }) public toastContent!: TemplateRef<any>
  private readonly destroy$ = new Subject<void>()
  public readonly form = this.fb.group({
    title: this.fb.nonNullable.control('', [Validators.required]),
    url: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^[\p{L}\p{N}]+(-[\p{L}\p{N}]+)*$/u),
    ]),
  })

  constructor(
    private service: EventService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
  ) {
    super()
  }

  ngOnInit(): void {
    this.initAutomaticUrlGenerator()
  }

  private initAutomaticUrlGenerator(): void {
    this.form.controls.title.valueChanges
      .pipe(
        map(removeTildes),
        tap((title) => {
          const url = title
            .toLowerCase()
            .split(/[\p{P}\p{Z}\p{S}]+/u)
            .join('-')
          this.form.controls.url.setValue(url)
        }),
        takeUntil(this.destroy$),
      )
      .subscribe()
  }

  get titleInvalidText(): string {
    const { title } = this.form.controls
    if (title.touched && title.errors) {
      if (title.errors['required']) {
        return $localize`Field required`
      }
      return JSON.stringify(title.errors)
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
    const renderedUrl = url ? url : $localize`simonyi-conference-2022`
    return $localize`The event will have the following url: https://bsstudio/event/${renderedUrl}`
  }

  onSubmit() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      this.createEvent(this.form.getRawValue())
    }
  }

  private createEvent(createEvent: CreateEvent) {
    this.service
      .createEvent(createEvent)
      .pipe(
        tap((event) => {
          this.onSuccessNotification(event)
          this.close.emit(true)
        }),
        catchError(() => {
          window.alert($localize`Server error: title and url must be unique`)
          return EMPTY
        }),
        takeUntil(this.destroy$),
      )
      .subscribe()
  }

  private onSuccessNotification(event: Event) {
    const message = $localize`Add videos to the event, update the details and publish it`
    this.notificationService.showToast({
      type: 'success',
      title: $localize`Event created`,
      links: [{ text: event.title, href: `/event/${event.id}` }],
      caption: message,
      message,
      smart: true,
      template: this.toastContent,
    })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
