import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core'
import { CrewMember } from '../../models'
import { Subject, takeUntil, tap } from 'rxjs'
import { DetailedVideo } from '../../../video/models'
import { AlertModalType, ModalButtonType, ModalService } from 'carbon-components-angular'
import { VideoCrewActionsService } from '../../actions/video-crew.actions.service'

@Component({
  selector: 'app-video-crew-remove-button[crewMember]',
  template: `
    <button
      ibmButton="danger--ghost"
      size="field"
      [iconOnly]="true"
      [hasAssistiveText]="true"
      assistiveTextAlignment="end"
      assistiveTextPlacement="left"
      (click)="showConfirm()"
    >
      <svg ibmIcon="delete" size="16" class="bx--btn__icon"></svg>
      <span i18n class="bx--assistive-text">
        Remove {{ crewMember.member.name }}'s {{ crewMember.position }} position from the video
      </span>
    </button>
  `,
})
export class VideoCrewRemoveButtonComponent implements OnDestroy {
  @Input() public crewMember!: CrewMember
  @Output() public update = new EventEmitter<DetailedVideo>()

  private readonly destroy$ = new Subject<void>()

  constructor(private modalService: ModalService, private service: VideoCrewActionsService) {}

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
      .removeCrewMember({ videoId, position, memberId: member.id }, member.name)
      .pipe(
        tap((video) => this.update.emit(video)),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
