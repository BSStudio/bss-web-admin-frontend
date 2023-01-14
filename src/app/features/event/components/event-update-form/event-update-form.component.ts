import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core'
import { DetailedEvent, Event, UpdateEvent } from '../../models'
import { FormBuilder, Validators } from '@angular/forms'
import { Subject, takeUntil, tap } from 'rxjs'
import { EventService } from '../../services/event.service'
import { NotificationService } from 'carbon-components-angular'
import { flatpickrOptions } from 'src/app/core/util/flatpickr-options'

@Component({
  selector: 'app-event-update-form[event]',
  templateUrl: './event-update-form.component.html',
  styleUrls: ['./event-update-form.component.scss'],
})
export class EventUpdateFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() event!: DetailedEvent
  @Output() update = new EventEmitter<DetailedEvent>()

  private readonly destroy$ = new Subject<void>()
  public flatpickrOptions = flatpickrOptions
  public readonly form = this.fb.group({
    url: this.fb.nonNullable.control('', [Validators.required]),
    title: this.fb.nonNullable.control('', [Validators.required]),
    description: this.fb.nonNullable.control(''),
    date: this.fb.nonNullable.control<[string | Date]>([new Date()], [Validators.required]),
    visible: this.fb.nonNullable.control(false, [Validators.required]),
  })

  constructor(
    private fb: FormBuilder,
    private service: EventService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.update.pipe(
      tap((event) => (this.event = event)),
      takeUntil(this.destroy$)
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['event']) {
      const date: [Date] = [new Date(this.event.date)]
      const formData = { ...this.event, date }
      this.form.patchValue(formData)
      this.form.markAsPristine()
    }
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      const { date: dateArray, ...rest } = this.form.getRawValue()
      const date = new Date(dateArray[0]).toISOString().split('T')[0]
      this.updateEvent({ date, ...rest })
    }
  }

  private updateEvent(updateEvent: UpdateEvent) {
    this.service
      .updateEvent(this.event.id, updateEvent)
      .pipe(
        tap({
          next: (event) => {
            this.successNotification(event)
            this.update.emit(event)
          },
          error: (err) => this.errorNotification(err),
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  private successNotification(event: Event) {
    const caption = $localize`Changes were saved`
    this.notificationService.showToast({
      type: 'success',
      title: $localize`Event updated`,
      subtitle: event.title,
      caption,
      message: caption,
      smart: true,
    })
  }

  private errorNotification(err: unknown) {
    const caption = $localize`Make sure title/url is unique`
    this.notificationService.showToast({
      type: 'error',
      title: $localize`Error updating event`,
      subtitle: this.event.title,
      caption,
      message: caption,
      smart: true,
    })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
