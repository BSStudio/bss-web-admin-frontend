import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Subject, takeUntil, tap } from 'rxjs'
import { DetailedVideo } from '../../models'
import { NotificationService } from 'carbon-components-angular'
import { VideoService } from '../../services/video.service'

@Component({
  selector: 'app-video-update-form',
  templateUrl: './video-update-form.component.html',
  styleUrls: ['./video-update-form.component.scss'],
})
export class VideoUpdateFormComponent implements OnChanges, OnDestroy {
  @Input() public video!: DetailedVideo
  @Output() public update = new EventEmitter<DetailedVideo>()

  private destroy$ = new Subject<void>()
  public form = this.fb.nonNullable.group({
    url: this.fb.nonNullable.control('', { validators: [Validators.pattern(/^[\p{Alpha}\p{Number}\-]+$/u)] }),
    title: this.fb.nonNullable.control(''),
    description: this.fb.nonNullable.control(''),
    uploadedAt: this.fb.nonNullable.control(''),
    visible: this.fb.nonNullable.control(false),
  })

  public flatpickrOptions = {
    disableMobile: true,
    formatDate: (date: Date): string => {
      const d = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
      return d.toISOString().split('T')[0]
    },
    parseDate: (string: string): Date => {
      const date = new Date(string)
      return new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
    },
  }

  constructor(
    private fb: FormBuilder,
    private service: VideoService,
    private notificationService: NotificationService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['video']) {
      this.form.patchValue(this.video)
    }
  }

  public updateVideo() {
    const { uploadedAt: date, ...rest } = this.form.getRawValue()
    const uploadedAt = this.toLocalDate(date)
    this.service
      .updateVideo(this.video.id, { uploadedAt, ...rest })
      .pipe(
        tap({
          next: (video) => {
            this.successNotification(video)
            this.update.emit(video)
          },
          error: (err) => this.errorNotification(err),
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  private successNotification(video: DetailedVideo) {
    const caption = $localize`Changes were saved`
    this.notificationService.showToast({
      type: 'success',
      title: $localize`Video updated`,
      subtitle: video.title,
      caption: caption,
      message: caption,
      smart: true,
    })
  }

  private errorNotification(err: unknown) {
    const caption = $localize`Make sure everything is well formatted, and there are no duplicate ids`
    this.notificationService.showToast({
      type: 'error',
      title: $localize`Error updating`,
      caption: caption,
      message: caption,
      smart: true,
    })
  }

  public toLocalDate(date: string | Date) {
    return new Date(date).toISOString().split('T')[0]
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
