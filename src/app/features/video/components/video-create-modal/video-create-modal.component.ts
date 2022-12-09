import { VideoService } from '../../services/video.service'
import { Component, OnDestroy } from '@angular/core'
import { BaseModal } from 'carbon-components-angular'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { CreateVideo } from '../../models'
import { Subject, takeUntil, tap } from 'rxjs'

@Component({
  selector: 'app-video-create-modal',
  templateUrl: './video-create-modal.component.html',
  styleUrls: ['./video-create-modal.component.scss'],
})
export class VideoCreateModalComponent extends BaseModal implements OnDestroy {
  public readonly form: FormGroup<{ title: FormControl<string>; url: FormControl<string> }>
  private readonly destroy$ = new Subject<void>()

  constructor(private fb: FormBuilder, private videoService: VideoService) {
    super()
    this.form = this.fb.nonNullable.group({
      title: this.fb.nonNullable.control('', [Validators.required]),
      url: this.fb.nonNullable.control('', [Validators.required]),
    })
  }

  get titleInvalidText(): string {
    const { title } = this.form.controls
    if (title.touched && title.errors) {
      if (title.errors['required']) {
        return $localize`Required`
      }
      return JSON.stringify(title.errors)
    } else return ''
  }

  get urlInvalidText(): string {
    const { url } = this.form.controls
    if (url.touched && url.errors) {
      if (url.errors['required']) {
        return $localize`Required`
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
        tap(() => this.closeModal()),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
