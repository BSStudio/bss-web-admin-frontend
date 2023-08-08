import { Component, Input, OnDestroy } from '@angular/core'
import { Subject, takeUntil, tap } from 'rxjs'
import { Router } from '@angular/router'
import { AlertModalType, ModalButtonType, ModalService } from 'carbon-components-angular'
import { Event } from '../../models'
import { EventActionsService } from '../../actions/event.actions.service'

@Component({
  selector: 'app-event-remove-button[event]',
  template: `
    <button cdsButton="danger--tertiary" size="lg" (click)="showRemoveModal()">
      <span i18n>Remove</span>
      <svg cdsIcon="delete" size="16" class="cds--btn__icon"></svg>
    </button>
  `,
})
export class EventRemoveButtonComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>()
  @Input() event!: Event

  constructor(
    private service: EventActionsService,
    private router: Router,
    private modalService: ModalService,
  ) {}

  showRemoveModal() {
    this.modalService.show({
      type: AlertModalType.danger,
      label: this.event.title,
      title: $localize`Remove event`,
      size: 'xs',
      content: $localize`Are you sure you want to remove this event?`,
      buttons: [
        { type: ModalButtonType.secondary, text: $localize`Close` },
        { type: ModalButtonType.danger, text: $localize`Remove`, click: () => this.removeEvent() },
      ],
    })
  }

  removeEvent() {
    this.service
      .deleteEvent(this.event)
      .pipe(
        tap(() => this.router.navigate(['event']).then()),
        takeUntil(this.destroy$),
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
