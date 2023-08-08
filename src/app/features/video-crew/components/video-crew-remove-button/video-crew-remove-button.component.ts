import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core'
import { CrewMember } from '../../models'
import { Subject, takeUntil, tap } from 'rxjs'
import { VideoCrewService } from '../../services/video-crew.service'
import { DetailedVideo } from '../../../video/models'
import { AlertModalType, ModalButtonType, ModalService, NotificationService } from 'carbon-components-angular'

@Component({
  selector: 'app-video-crew-remove-button[crewMember]',
  template: `
    <button cdsButton="danger--ghost" size="lg" [iconOnly]="true" (click)="showConfirm()">
      <svg cdsIcon="delete" size="16" class="cds--btn__icon"></svg>
      <span i18n class="cds--assistive-text">
        Remove {{ crewMember.member.name }}'s {{ crewMember.position }} position from the video
      </span>
    </button>
  `,
})
export class VideoCrewRemoveButtonComponent implements OnDestroy {
  @Input() public crewMember!: CrewMember
  @Output() public update = new EventEmitter<DetailedVideo>()

  private readonly destroy$ = new Subject<void>()

  constructor(
    private modalService: ModalService,
    private service: VideoCrewService,
    private notificationService: NotificationService,
  ) {}

  showConfirm() {
    this.modalService.show({
      type: AlertModalType.danger,
      label: `${this.crewMember.member.name} | ${this.crewMember.position}`,
      title: $localize`Remove crew member position from video`,
      size: 'xs',
      content: $localize`Are you sure you want to remove this member's position from the crew?`,
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
    const { videoId, position, member } = this.crewMember
    this.service
      .removeVideoCrewMember({ videoId, position, memberId: member.id })
      .pipe(
        tap({
          next: (video) => {
            this.successNotification(video)
            this.update.emit(video)
          },
          error: (err) => this.errorNotification(err),
        }),
        takeUntil(this.destroy$),
      )
      .subscribe()
  }

  private successNotification(video: DetailedVideo) {
    const caption = $localize`Crew member position was successfully removed`
    this.notificationService.showToast({
      type: 'success',
      title: $localize`${this.crewMember.member.name}'s ${this.crewMember.position} position`,
      subtitle: video.title,
      caption,
      message: caption,
      smart: true,
    })
  }

  private errorNotification(error: unknown) {
    const caption = $localize`Couldn't remove crew member position. Try refreshing the page`
    this.notificationService.showToast({
      type: 'error',
      title: $localize`Error removing crew member`,
      caption,
      message: caption,
      smart: true,
    })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
