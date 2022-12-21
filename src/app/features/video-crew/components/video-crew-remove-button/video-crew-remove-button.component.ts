import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core'
import { CrewMember } from '../../models'
import { Subject, takeUntil, tap, catchError, EMPTY } from 'rxjs'
import { VideoCrewService } from '../../services/video-crew.service'
import { DetailedVideo } from '../../../video/models'
import { AlertModalType, ModalButtonType, ModalService, NotificationService } from 'carbon-components-angular'

@Component({
  selector: 'app-video-crew-remove-button[crewMember]',
  template: `
    <button
      ibmButton="danger"
      size="field"
      [iconOnly]="true"
      [hasAssistiveText]="true"
      assistiveTextAlignment="end"
      assistiveTextPlacement="left"
      (click)="showConfirm()"
    >
      <svg ibmIcon="delete" size="16" class="bx--btn__icon"></svg>
      <span i18n class="bx--assistive-text"
        >Remove {{ crewMember.member.name }}'s {{ crewMember.position }} from event</span
      >
    </button>
  `,
})
export class VideoCrewRemoveButtonComponent implements OnDestroy {
  @Input()
  public crewMember!: CrewMember
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
      label: `${this.crewMember.member.name} | ${this.crewMember.position}`,
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
    const { videoId, position, member } = this.crewMember
    this.service
      .removeVideoCrewMember({ videoId, position, memberId: member.id })
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
    this.notificationService.showToast({ type: 'success', title: `${this.crewMember.member.name}` })
  }

  errorNotification(error: unknown) {
    this.notificationService.showToast({
      type: 'error',
      title: $localize`Error removing crew member`,
      message: JSON.stringify(error),
    })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
