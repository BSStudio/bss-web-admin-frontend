import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms'
import { catchError, EMPTY, Subject, takeUntil, tap } from 'rxjs'
import { DetailedVideo, UpdateVideo } from '../../models'
import { NotificationService } from 'carbon-components-angular'
import { VideoService } from '../../services/video.service'

type UpdateVideoForm = FormGroup<{
  url: FormControl<string>
  title: FormControl<string>
  description: FormControl<string>
  uploadedAt: FormControl<string>
  visible: FormControl<boolean>
}>

@Component({
  selector: 'app-video-update-form',
  templateUrl: './video-update-form.component.html',
  styleUrls: ['./video-update-form.component.scss'],
})
export class VideoUpdateFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>()
  public form: UpdateVideoForm

  @Input() public video!: DetailedVideo
  @Output() public update = new EventEmitter<DetailedVideo>()

  constructor(
    private fb: FormBuilder,
    private service: VideoService,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.nonNullable.group({
      url: this.fb.nonNullable.control('', { validators: [Validators.pattern(/^[\p{Alpha}\p{Number}\-]+$/u)] }),
      title: this.fb.nonNullable.control(''),
      description: this.fb.nonNullable.control(''),
      uploadedAt: this.fb.nonNullable.control('', { validators: [VideoUpdateFormComponent.DateValidator] }),
      visible: this.fb.nonNullable.control(false),
    })
  }

  ngOnInit(): void {
    const video = new UpdateVideo(
      this.video.url,
      this.video.title,
      this.video.description,
      this.video.uploadedAt,
      this.video.visible
    )
    this.form.patchValue(video)
  }

  public updateVideo() {
    const { uploadedAt: date, ...rest } = this.form.getRawValue()
    const uploadedAt = VideoUpdateFormComponent.toLocalDate(date)
    this.service
      .updateVideo(this.video.id, { uploadedAt, ...rest })
      .pipe(
        tap((video) => this.successNotification(video)),
        tap((video) => this.update.emit(video)),
        catchError((err) => {
          this.errorNotification(err)
          return EMPTY
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  successNotification(video: DetailedVideo) {
    this.notificationService.showToast({
      type: 'success',
      title: 'Video update',
      subtitle: video.title,
      caption: 'Changes were saved',
      duration: 3000,
    })
  }

  errorNotification(err: unknown) {
    this.notificationService.showToast({
      type: 'error',
      title: $localize`Error updating`,
      caption: JSON.stringify(err),
      duration: 3000,
    })
  }

  private static DateValidator: ValidatorFn = (control) => {
    if (control.value instanceof Date) return null
    else return { date: false }
  }

  private static toLocalDate(date: string | Date) {
    return new Date(date).toISOString().split('T')[0]
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
