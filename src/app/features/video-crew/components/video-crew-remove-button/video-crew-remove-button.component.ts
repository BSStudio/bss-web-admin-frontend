import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core'
import { DetailedCrewMember } from '../../models'
import { Subject, takeUntil, tap, catchError, EMPTY } from 'rxjs'
import { VideoCrewService } from '../../services/video-crew.service'
import { DetailedVideo } from '../../../video/models'
import { AlertModalType, ModalButtonType, ModalService, NotificationService } from 'carbon-components-angular'

@Component({
  selector: 'app-video-crew-remove-button',
  template: `
    <button
      ibmButton="danger"
      size="field"
      [iconOnly]="true"
      assistiveTextAlignment="end"
      assistiveTextPlacement="left"
      (click)="showConfirm()"
    >
      <span i18n class="bx--assistive-text">Remove {{ crewMember.memberId }} {{ crewMember.position }} from event</span>
      <svg ibmIcon="delete" size="16" class="bx--btn__icon"></svg>
    </button>
  `,
})
export class VideoCrewRemoveButtonComponent implements OnDestroy {
  @Input()
  public crewMember!: DetailedCrewMember
  @Output()
  public update = new EventEmitter<DetailedVideo>()
  private readonly destroy$ = new Subject<void>()

  constructor(
    private modalService: ModalService,
    private service: VideoCrewService,
    private notificationService: NotificationService
  ) {}

  showConfirm() {
    this.modalService.show({
      type: AlertModalType.danger,
      label: `${this.crewMember.memberId} | ${this.crewMember.position}`,
      title: $localize`Remove member from video`,
      size: 'xs',
      content: $localize`Are you sure you want to remove this member from the crew?`,
      buttons: [
        { type: ModalButtonType.secondary, text: $localize`Close` },
        {
          type: ModalButtonType.danger,
          text: $localize`Remove`,
          click: () => this.removeCrewMember(),
        },
      ],
    })
  }

  removeCrewMember() {
    this.service
      .removeVideoCrewMember(this.crewMember)
      .pipe(
        tap((video) => {
          this.successNotification(video)
          this.update.emit(video)
        }),
        catchError((err: unknown) => {
          this.errorNotification(err)
          return EMPTY
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  successNotification(video: DetailedVideo) {
    this.notificationService.showToast({ type: 'success', title: '' })
  }

  errorNotification(error: unknown) {
    this.notificationService.showToast({ type: 'error', title: '' })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
