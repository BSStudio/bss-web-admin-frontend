import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core'
import { AlertModalType, ModalButtonType, ModalService, NotificationService } from 'carbon-components-angular'
import { catchError, EMPTY, Subject, takeUntil, tap } from 'rxjs'
import { DetailedEvent } from '../../models'
import { EventVideoService } from '../../../video/services/event-video.service'
import { Video } from '../../../video/models'

@Component({
  selector: 'app-event-video-remove-button',
  template: `
    <button
      ibmButton="danger"
      size="field"
      [iconOnly]="true"
      [hasAssistiveText]="true"
      assistiveTextAlignment="end"
      assistiveTextPlacement="left"
      (click)="showRemoveModal(video)"
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

  showRemoveModal(video: { title: string; id: string }) {
    this.modalService.show({
      type: AlertModalType.danger,
      label: video.title,
      title: $localize`Remove video from event`,
      size: 'xs',
      content: $localize`Are you sure you want to remove this video?`,
      buttons: [
        { type: ModalButtonType.secondary, text: $localize`Close` },
        {
          type: ModalButtonType.danger,
          text: $localize`Remove`,
          click: () => this.removeEventVideo(video.id, video.title),
        },
      ],
    })
  }

  removeEventVideo(videoId: string, videoTitle: string) {
    this.eventVideoService
      .removeVideoFromEvent({ eventId: this.event.id, videoId })
      .pipe(
        tap((event) => {
          this.successNotification(event, videoTitle)
          this.update.emit(event)
        }),
        catchError((err) => {
          this.errorNotification(err)
          return EMPTY
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  successNotification(event: DetailedEvent, videoTitle: string) {
    this.notificationService.showToast({
      type: 'success',
      title: $localize`${videoTitle} was removed from ${event.title}`,
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
