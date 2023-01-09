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
    date: this.fb.nonNullable.control<string>(new Date().toISOString().split('T')[0], [Validators.required]),
    visible: this.fb.nonNullable.control(false, [Validators.required]),
  })

  log(a: any) {
    console.log(a)
  }

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
      this.form.patchValue(this.event)
      this.form.markAsPristine()
    }
  }

  submit() {
    this.form.markAllAsTouched()
    console.log(this.form.getRawValue())
    if (this.form.valid) {
      this.updateEvent(this.form.getRawValue())
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
