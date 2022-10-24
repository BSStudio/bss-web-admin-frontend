import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from '../../../data/video/service/video.service';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertModalType, ModalButtonType, ModalService, NotificationService } from 'carbon-components-angular';
import { DetailedVideo } from '../../../data/video/model';
import { Subject, takeUntil } from 'rxjs';

type UpdateVideoForm = FormGroup<{
  url: FormControl<string>;
  title: FormControl<string>;
  description: FormControl<string>;
  videoUrl: FormControl<string | null>;
  thumbnailUrl: FormControl<string | null>;
  uploadedAt: FormControl<string>;
  visible: FormControl<boolean>;
}>;

@Component({
  selector: 'app-video-id',
  templateUrl: './video-id.component.html',
  styleUrls: ['./video-id.component.scss'],
})
export class VideoIdComponent implements OnDestroy {
  public video: DetailedVideo;
  public form: UpdateVideoForm;
  private destroy$ = new Subject<boolean>();

  private static DateValidator: ValidatorFn = (control) => {
    if (control.value instanceof Date) return null;
    else return { date: false };
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: VideoService,
    private modalService: ModalService,
    private notificationService: NotificationService
  ) {
    this.video = <DetailedVideo>this.route.snapshot.data['video'];
    this.form = new FormGroup({
      url: new FormControl(this.video.url, {
        nonNullable: true,
        validators: [Validators.pattern(/^[\p{Alpha}\p{Number}\-]+$/u)],
      }),
      title: new FormControl(this.video.title, { nonNullable: true }),
      description: new FormControl(this.video.description, { nonNullable: true }),
      videoUrl: new FormControl(this.video.videoUrl),
      thumbnailUrl: new FormControl(this.video.thumbnailUrl),
      uploadedAt: new FormControl(this.video.uploadedAt, {
        nonNullable: true,
        validators: [VideoIdComponent.DateValidator],
      }),
      visible: new FormControl(this.video.visible, { nonNullable: true }),
    });
  }

  public updateVideo() {
    if (this.form.valid) {
      const { uploadedAt: date, ...rest } = this.form.getRawValue();
      const uploadedAt = VideoIdComponent.toLocalDate(date);
      this.service
        .updateVideo(this.video.id, { uploadedAt, ...rest })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (video) => this.successNotification(video),
          error: (err) => this.errorNotification(err),
        });
    }
  }

  successNotification(video: DetailedVideo) {
    this.notificationService.showNotification({
      type: 'success',
      title: 'Success',
      duration: 3000,
    });
  }

  errorNotification(err: unknown) {
    this.notificationService.showNotification({
      type: 'error',
      title: $localize`Error updating`,
      caption: JSON.stringify(err),
      duration: 3000,
    });
  }

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

  private static toLocalDate(date: string | Date) {
    return new Date(date).toISOString().split('T')[0];
  }
}
