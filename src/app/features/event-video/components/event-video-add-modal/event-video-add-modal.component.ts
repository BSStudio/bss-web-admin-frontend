import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core'
import { BaseModal, ListItem } from 'carbon-components-angular'
import { FormBuilder } from '@angular/forms'
import { DetailedEvent } from '../../../event/models'
import { VideoService } from '../../../video/services/video.service'
import { Subject, takeUntil, tap } from 'rxjs'
import { EventVideoService } from '../../services/event-video.service'
import { Video } from '../../../video/models'

interface VideoListItem extends ListItem {
  id: string
}

@Component({
  selector: 'app-event-video-add-modal-component',
  templateUrl: './event-video-add-modal.component.html',
  styleUrls: ['./event-video-add-modal.component.scss'],
})
export class EventVideoAddModalComponent extends BaseModal implements OnInit, OnDestroy {
  @Output()
  public update = new EventEmitter<DetailedEvent>()
  private readonly destroy$ = new Subject<void>()
  public videos: { selected: boolean; content: string; id: string }[] = []
  public readonly form = this.fb.nonNullable.group({
    videoId: this.fb.nonNullable.control<VideoListItem>({ id: '', selected: false, content: '' }),
  })

  constructor(
    private fb: FormBuilder,
    private videoService: VideoService,
    private eventVideoService: EventVideoService,
    @Inject('event') public event: DetailedEvent
  ) {
    super()
  }

  onSubmit() {
    if (this.form.valid) {
      const videoId = this.form.getRawValue().videoId.id
      this.eventVideoService
        .addVideoToEvent({ eventId: this.event.id, videoId })
        .pipe(
          tap((event) => {
            this.closeModal()
            this.update.emit(event)
          }),
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

  private updateVideos(videos: Video[]) {
    this.videos = videos
      .filter(({ id }) => !this.event.videos.some((video) => video.id === id))
      .map((video) => ({ selected: false, content: video.title, id: video.id }))
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
