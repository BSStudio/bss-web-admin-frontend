import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertModalType, ModalButtonType, ModalService } from 'carbon-components-angular';
import { Subject, takeUntil } from 'rxjs';
import { DetailedVideo } from '../../models';
import { Router } from '@angular/router';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video-remove-button',
  template: `
    <button ibmButton="danger" (click)="removeVideo()">
      <ng-container i18n>Remove</ng-container>
      <svg ibmIcon="delete" size="16" class="bx--btn__icon"></svg>
    </button>
  `,
})
export class VideoRemoveButtonComponent implements OnDestroy {
  private destroy$ = new Subject<boolean>();
  @Input() public video!: DetailedVideo;

  constructor(private router: Router, private service: VideoService, private modalService: ModalService) {}

  public removeVideo() {
    this.modalService.show({
      type: AlertModalType.danger,
      label: this.video.title,
      title: 'Remove video',
      size: 'xs',
      content: 'Are you sure you want to remove this video?',
      buttons: [
        { type: ModalButtonType.secondary, text: 'Close' },
        { type: ModalButtonType.danger, text: 'Remove', click: () => this.removeVid() },
      ],
    });
  }

  private removeVid() {
    this.service
      .removeVideo(this.video.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: async () => await this.router.navigate(['video']),
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
