import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core'
import { AlertModalType, ModalButtonType, ModalService, NotificationService } from 'carbon-components-angular'
import { Subject, takeUntil, tap } from 'rxjs'
import { DetailedEvent } from '../../../event/models'
import { EventVideoService } from '../../services/event-video.service'
import { Video } from '../../../video/models'

@Component({
  selector: 'app-event-video-remove-button',
  template: `
    <button
      ibmButton="danger--ghost"
      size="field"
      [iconOnly]="true"
      [hasAssistiveText]="true"
      assistiveTextAlignment="end"
      assistiveTextPlacement="left"
      (click)="showRemoveModal()"
    >
      <svg ibmIcon="delete" size="16" class="bx--btn__icon"></svg>
      <span i18n class="bx--assistive-text">Remove {{ video.title }} from event</span>
    </button>
  `,
})
export class EventVideoRemoveButtonComponent implements OnDestroy {
  @Input()
  public video!: Video
  @Input()
  public event!: DetailedEvent
  @Output()
  public update = new EventEmitter<DetailedEvent>()
  private readonly destroy$ = new Subject<void>()

  constructor(
    private modalService: ModalService,
    private eventVideoService: EventVideoService,
    private notificationService: NotificationService
  ) {}

  showRemoveModal() {
    this.modalService.show({
      type: AlertModalType.danger,
      label: this.video.title,
      title: $localize`Remove video from event`,
      size: 'xs',
      content: $localize`Are you sure you want to remove this video?`,
      buttons: [
        { type: ModalButtonType.secondary, text: $localize`Close` },
        {
          type: ModalButtonType.danger,
          text: $localize`Remove`,
          click: () => this.removeEventVideo(),
        },
      ],
    })
  }

  removeEventVideo() {
    this.eventVideoService
      .removeVideoFromEvent({ eventId: this.event.id, videoId: this.video.id })
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

  successNotification(event: DetailedEvent) {
    const caption = $localize`Video remain published`
    this.notificationService.showToast({
      type: 'success',
      title: $localize`Video was removed from event`,
      subtitle: this.video.title,
      caption,
      message: caption,
      smart: true,
    })
  }

  errorNotification(error: unknown) {
    this.notificationService.showToast({
      type: 'error',
      title: $localize`Error removing video`,
      content: JSON.stringify(error),
    })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
