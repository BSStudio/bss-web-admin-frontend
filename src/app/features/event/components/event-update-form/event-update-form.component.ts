import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core'
import { DetailedEvent, UpdateEvent } from '../../models'
import { FormBuilder, Validators } from '@angular/forms'
import { Subject, takeUntil, tap } from 'rxjs'
import { flatpickrOptions } from 'src/app/core/util/flatpickr-options'
import { EventActionsService } from '../../actions/event.actions.service'

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
    date: this.fb.nonNullable.control<Date[]>([new Date()], [Validators.required]),
    visible: this.fb.nonNullable.control(false, [Validators.required]),
  })

  constructor(private fb: FormBuilder, private service: EventActionsService) {}

  ngOnInit(): void {
    this.update.pipe(
      tap((event) => (this.event = event)),
      takeUntil(this.destroy$)
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['event']) {
      const date = [new Date(this.event.date)]
      const formData = { ...this.event, date }
      this.form.patchValue(formData)
      this.form.markAsPristine()
    }
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      const { date: dateArray, ...rest } = this.form.getRawValue()
      const date = dateArray[0].toISOString().split('T')[0]
      this.updateEvent({ date, ...rest })
    }
  }

  private updateEvent(updateEvent: UpdateEvent) {
    this.service
      .updateEvent(this.event.id, updateEvent)
      .pipe(
        tap((event) => this.update.emit(event)),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
