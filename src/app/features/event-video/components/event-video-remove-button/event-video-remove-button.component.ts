import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core'
import { AlertModalType, ModalButtonType, ModalService } from 'carbon-components-angular'
import { Subject, takeUntil, tap } from 'rxjs'
import { DetailedEvent } from '../../../event/models'
import { Video } from '../../../video/models'
import { EventVideoActionsService } from '../../actions/event-video.actions.service'

@Component({
  selector: 'app-event-video-remove-button',
  template: `
    <cds-icon-button
      kind="danger--ghost"
      size="lg"
      description="Remove {{ video.title }} from event"
      i18n-description
      (click)="showRemoveModal()"
    >
      <svg cdsIcon="delete" size="16" class="cds--btn__icon"></svg>
    </cds-icon-button>
  `,
})
export class EventVideoRemoveButtonComponent implements OnDestroy {
  @Input() public video!: Video
  @Input() public event!: DetailedEvent
  @Output() public update = new EventEmitter<DetailedEvent>()
  private readonly destroy$ = new Subject<void>()

  constructor(
    private modalService: ModalService,
    private eventVideoService: EventVideoActionsService,
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
        { type: ModalButtonType.danger, text: $localize`Remove`, click: () => this.removeEventVideo() },
      ],
    })
  }

  removeEventVideo() {
    this.eventVideoService
      .removeVideoFromEvent(this.event, this.video)
      .pipe(
        tap((event) => this.update.emit(event)),
        takeUntil(this.destroy$),
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
