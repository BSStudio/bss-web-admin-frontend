import { Component, Input, OnDestroy } from '@angular/core'
import { Subject, takeUntil, tap } from 'rxjs'
import { Router } from '@angular/router'
import { AlertModalType, ModalButtonType, ModalService, NotificationService } from 'carbon-components-angular'
import { EventService } from '../../services/event.service'
import { Event } from '../../models'

@Component({
  selector: 'app-event-remove-button[event]',
  template: `
    <button ibmButton="danger--tertiary" size="field" (click)="showRemoveModal()">
      <span i18n>Remove</span>
      <svg ibmIcon="delete" size="16" class="bx--btn__icon"></svg>
    </button>
  `,
})
export class EventRemoveButtonComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>()
  @Input() event!: Event

  constructor(
    private service: EventService,
    private router: Router,
    private modalService: ModalService,
    private notificationService: NotificationService
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
      .deleteEvent(this.event.id)
      .pipe(
        tap({
          next: () => {
            this.successNotification()
            this.router.navigate(['event']).then()
          },
          error: (error) => this.errorNotification(error),
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  private successNotification() {
    this.notificationService.showNotification({
      type: 'success',
      title: $localize`Event was removed`,
      message: this.event.title,
      smart: true,
    })
  }

  private errorNotification(error: unknown) {
    const caption = $localize`Make sure videos are removed from the event`
    this.notificationService.showToast({
      type: 'error',
      title: $localize`Error removing event`,
      subtitle: this.event.title,
      caption: caption,
      message: caption,
      smart: true,
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
