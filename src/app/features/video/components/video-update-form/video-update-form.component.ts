import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Subject, takeUntil, tap } from 'rxjs'
import { DetailedVideo } from '../../models'
import { flatpickrOptions } from '../../../../core/util/flatpickr-options'
import { VideoActionsService } from '../../actions/video.actions.service'

@Component({
  selector: 'app-video-update-form',
  templateUrl: './video-update-form.component.html',
  styleUrls: ['./video-update-form.component.scss'],
})
export class VideoUpdateFormComponent implements OnChanges, OnDestroy {
  @Input() public video!: DetailedVideo
  @Output() public update = new EventEmitter<DetailedVideo>()

  private destroy$ = new Subject<void>()
  public flatpickrOptions = flatpickrOptions
  public form = this.fb.nonNullable.group({
    url: this.fb.nonNullable.control('', { validators: [Validators.pattern(/^[\p{Alpha}\p{Number}\-]+$/u)] }),
    title: this.fb.nonNullable.control(''),
    description: this.fb.nonNullable.control(''),
    uploadedAt: this.fb.nonNullable.control<Date[]>([new Date()]),
    visible: this.fb.nonNullable.control(false),
  })

  constructor(
    private fb: FormBuilder,
    private service: VideoActionsService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['video']) {
      const { uploadedAt: date, url, title, description, visible } = this.video
      const uploadedAt = [new Date(date)]
      this.form.patchValue({ uploadedAt, url, title, description, visible })
      this.form.markAsPristine()
    }
  }

  public updateVideo() {
    const { uploadedAt: date, ...rest } = this.form.getRawValue()
    const uploadedAt = date[0].toISOString().split('T')[0]
    this.service
      .updateVideo(this.video.id, { uploadedAt, ...rest })
      .pipe(
        tap((video) => this.update.emit(video)),
        takeUntil(this.destroy$),
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
