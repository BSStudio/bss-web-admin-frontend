import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseModal, NotificationService } from 'carbon-components-angular';
import { EventService } from '../../services/event.service';
import { CreateEvent } from '../../models';
import { catchError, EMPTY, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-event-create-modal',
  templateUrl: './event-create-modal.component.html',
})
export class EventCreateModalComponent extends BaseModal implements OnDestroy {
  public readonly form: FormGroup<{ url: FormControl<string>; title: FormControl<string> }>;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private service: EventService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    super();
    this.form = this.fb.nonNullable.group({
      url: this.fb.nonNullable.control('', Validators.required),
      title: this.fb.nonNullable.control('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.createEvent(this.form.getRawValue());
    }
  }

  private createEvent(createEvent: CreateEvent) {
    this.service
      .createEvent(createEvent)
      .pipe(
        tap(() => this.close.emit(true)),
        catchError((err) => {
          this.onErrorNotification(err);
          return EMPTY;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private onErrorNotification(err: unknown) {
    this.notificationService.showToast({
      type: 'error',
      title: $localize`Error creating event`,
      message: JSON.stringify(err),
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
