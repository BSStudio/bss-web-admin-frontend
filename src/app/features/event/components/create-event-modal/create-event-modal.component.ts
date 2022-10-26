import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BaseModal, NotificationService } from 'carbon-components-angular';
import { EventService } from '../../services/event.service';
import { CreateEvent } from '../../models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-event-modal',
  templateUrl: './create-event-modal.component.html',
})
export class CreateEventModalComponent extends BaseModal implements OnDestroy {
  public readonly form: FormGroup<{ url: FormControl<string>; title: FormControl<string> }>;
  private readonly destroy$ = new Subject<boolean>();

  constructor(
    private service: EventService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    super();
    this.form = this.fb.nonNullable.group<CreateEvent>({
      url: '',
      title: '',
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
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.close.emit(true),
        error: (err) => this.onErrorNotification(err),
      });
  }

  private onErrorNotification(err: unknown) {
    this.notificationService.showNotification({ message: JSON.stringify(err), type: 'error', title: 'Error' });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
