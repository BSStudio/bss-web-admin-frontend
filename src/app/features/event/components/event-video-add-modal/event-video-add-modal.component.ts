import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core'
import { BaseModal } from 'carbon-components-angular'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { DetailedEvent } from '../../models'
import { VideoService } from '../../../video/services/video.service'
import { Subject, takeUntil, tap } from 'rxjs'
import { EventVideoService } from '../../../video/services/event-video.service'
import { Video } from '../../../video/models'

@Component({
  selector: 'app-event-video-add-modal-component',
  templateUrl: './event-video-add-modal.component.html',
})
export class EventVideoAddModalComponent extends BaseModal implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>()
  public readonly form: FormGroup<{
    videoId: FormControl<{ selected: boolean; content: string; id: string }>
  }>
  public videos: { selected: boolean; content: string; id: string }[] = []

  constructor(
    private fb: FormBuilder,
    private videoService: VideoService,
    private eventVideoService: EventVideoService,
    @Inject('event') public event: DetailedEvent,
    @Inject('update') public update: EventEmitter<DetailedEvent>
  ) {
    super()
    this.form = this.fb.nonNullable.group({
      videoId: this.fb.nonNullable.control({ id: '', selected: false, content: '' }),
    })
  }

  onSubmit() {
    if (this.form.valid) {
      const videoId = this.form.getRawValue().videoId.id
      this.eventVideoService
        .addVideoToEvent({ eventId: this.event.id, videoId })
        .pipe(
          tap((event) => this.update.emit(event)),
          tap(() => this.closeModal()),
          takeUntil(this.destroy$)
        )
        .subscribe()
    }
  }

  ngOnInit() {
    this.videoService
      .getAllVideos()
      .pipe(
        tap((videos) => this.updateVideos(videos)),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  updateVideos(videos: Video[]) {
    this.videos = videos.map((video) => ({ selected: false, content: video.title, id: video.id }))
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
