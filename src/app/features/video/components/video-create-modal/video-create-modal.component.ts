import { VideoService } from '../../services/video.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { BaseModal, NotificationService } from 'carbon-components-angular'
import { FormBuilder, Validators } from '@angular/forms'
import { CreateVideo, Video } from '../../models'
import { Subject, takeUntil, tap } from 'rxjs'

@Component({
  selector: 'app-video-create-modal',
  templateUrl: './video-create-modal.component.html',
  styleUrls: ['./video-create-modal.component.scss'],
})
export class VideoCreateModalComponent extends BaseModal implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>()
  public readonly form = this.fb.nonNullable.group({
    title: this.fb.nonNullable.control('', [Validators.required]),
    url: this.fb.nonNullable.control('', [Validators.required, Validators.pattern(/^\w+(-\w+)*$/)]),
  })

  constructor(
    private fb: FormBuilder,
    private videoService: VideoService,
    private notificationService: NotificationService
  ) {
    super()
  }

  ngOnInit(): void {
    this.initAutomaticUrlGenerator()
  }

  private initAutomaticUrlGenerator(): void {
    this.form.controls.title.valueChanges
      .pipe(
        tap((title) => {
          const url = title.toLowerCase().split(/\W+/).join('-')
          this.form.controls.url.setValue(url)
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  get titleInvalidText(): string {
    const { title } = this.form.controls
    if (title.touched && title.errors) {
      if (title.errors['required']) {
        return $localize`Field required`
      }
      return JSON.stringify(title.errors)
    } else return ''
  }

  get urlInvalidText(): string {
    const { url } = this.form.controls
    if (url.touched && url.errors) {
      if (url.errors['required']) {
        return $localize`Field required`
      }
      if (url.errors['pattern']) {
        return $localize`Does not match url pattern: ${url.errors['pattern'].requiredPattern}`
      }
      return JSON.stringify(url.errors)
    } else return ''
  }

  get urlHelperText(): string {
    const { url } = this.form.getRawValue()
    const renderedUrl = url ? url : $localize`dorm-interview-series-cats`
    return $localize`The video will have the following url: https://bsstudio/video/${renderedUrl}`
  }

  onSubmit() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      this.createVideo(this.form.getRawValue())
    }
  }

  private createVideo(createVideo: CreateVideo) {
    this.videoService
      .createVideo(createVideo)
      .pipe(
        tap({
          next: (video) => {
            this.closeModal()
            this.onSuccessNotification(video)
          },
          error: () => window.alert($localize`Server error. Try a different title/url`),
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  private onSuccessNotification(video: Video) {
    const caption = $localize`Update video details and publish it`
    this.notificationService.showToast({
      type: 'success',
      title: $localize`Video created`,
      links: [
        {
          text: video.title,
          href: `/video/${video.id}`,
        },
      ],
      caption,
      message: caption,
      smart: true,
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
