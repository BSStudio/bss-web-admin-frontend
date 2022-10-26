import { Component, OnDestroy } from '@angular/core';
import { BaseModal, NotificationService } from 'carbon-components-angular';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateMember } from '../../models/create-member.model';
import { MemberService } from '../../services/member.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-member-modal',
  templateUrl: './create-member-modal.component.html',
})
export class CreateMemberModalComponent extends BaseModal implements OnDestroy {
  public form: FormGroup<{ name: FormControl<string>; url: FormControl<string> }>;
  private readonly destroy$ = new Subject<boolean>();

  constructor(
    private service: MemberService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    super();
    this.form = fb.nonNullable.group<CreateMember>({
      name: '',
      url: '',
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.createMember(this.form.getRawValue());
    }
  }

  private createMember(createMember: CreateMember) {
    this.service
      .createMember(createMember)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.close.emit(true),
        error: (err) => this.notificationService.showNotification({ message: err, type: 'error', title: 'Error' }),
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
