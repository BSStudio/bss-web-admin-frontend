import { Component, Input, OnDestroy } from '@angular/core';
import { AlertModalType, ModalButtonType, ModalService } from 'carbon-components-angular';
import { Subject, takeUntil, tap } from 'rxjs';
import { DetailedVideo } from '../../models';
import { Router } from '@angular/router';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video-remove-button',
  template: `
    <button ibmButton="danger" (click)="showConfirmModal()">
      <span i18n>Remove</span>
      <svg ibmIcon="delete" size="16" class="bx--btn__icon"></svg>
    </button>
  `,
})
export class VideoRemoveButtonComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  @Input() public video!: DetailedVideo;

  constructor(private router: Router, private service: VideoService, private modalService: ModalService) {}

  public showConfirmModal() {
    this.modalService.show({
      type: AlertModalType.danger,
      label: this.video.title,
      title: $localize`Remove video`,
      size: 'xs',
      content: $localize`Are you sure you want to remove this video?`,
      buttons: [
        { type: ModalButtonType.secondary, text: $localize`Close` },
        { type: ModalButtonType.danger, text: $localize`Remove`, click: () => this.removeVideo() },
      ],
    });
  }

  private removeVideo() {
    this.service
      .removeVideo(this.video.id)
      .pipe(
        tap(async () => await this.router.navigate(['video'])),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
