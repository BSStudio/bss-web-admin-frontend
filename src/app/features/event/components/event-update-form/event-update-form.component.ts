import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DetailedEvent, Event, UpdateEvent } from '../../models';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { EventService } from '../../services/event.service';
import { NotificationService } from 'carbon-components-angular';

@Component({
  selector: 'app-event-update-form[event]',
  templateUrl: './event-update-form.component.html',
})
export class EventUpdateFormComponent implements OnInit, OnDestroy {
  @Input() event!: Event;
  @Output() update = new EventEmitter<DetailedEvent>();

  public readonly form: FormGroup<{
    url: FormControl<string>;
    title: FormControl<string>;
    description: FormControl<string>;
    date: FormControl<string>;
    visible: FormControl<boolean>;
  }>;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private service: EventService,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.nonNullable.group<UpdateEvent>({
      url: '',
      title: '',
      description: '',
      date: '',
      visible: false,
    });
  }

  ngOnInit() {
    this.form.patchValue(this.event);
  }

  updateEvent() {
    if (this.form.valid) {
      const { date, ...updateEvent } = this.form.getRawValue();
      const dateTime = new Date(date).toISOString().split('T')[0];
      this.service
        .updateEvent(this.event.id, { date: dateTime, ...updateEvent })
        .pipe(
          tap((event) => this.update.emit(event)),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (event) => this.successNotification(event),
          error: (err) => this.errorNotification(err),
        });
    }
  }

  successNotification(event: Event) {
    this.notificationService.showToast({
      type: 'success',
      title: $localize`Event updated`,
      subtitle: event.title,
      caption: $localize`Changes were saved`,
    });
  }

  errorNotification(err: unknown) {
    this.notificationService.showToast({
      type: 'error',
      title: $localize`Error updating event`,
      subtitle: this.event.title,
      caption: JSON.stringify(err),
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
