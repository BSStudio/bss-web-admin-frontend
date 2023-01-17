import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core'
import { ListItem } from 'carbon-components-angular'
import { FormBuilder } from '@angular/forms'
import { DetailedEvent } from '../../../event/models'
import { VideoService } from '../../../video/services/video.service'
import { map, Subject, takeUntil, tap } from 'rxjs'
import { EventVideoService } from '../../services/event-video.service'
import { Video } from '../../../video/models'

interface VideoListItem extends ListItem {
  id: string
}

@Component({
  selector: 'app-event-video-add-form-component',
  templateUrl: './event-video-add-form.component.html',
  styleUrls: ['./event-video-add-form.component.scss'],
})
export class EventVideoAddFormComponent implements OnChanges, OnDestroy {
  @Input() public event!: DetailedEvent
  @Output() public update = new EventEmitter<DetailedEvent>()
  private readonly destroy$ = new Subject<void>()
  public videos: VideoListItem[] = []
  public readonly form = this.fb.nonNullable.group({
    videoId: this.fb.nonNullable.control<VideoListItem>({ id: '', selected: false, content: '' }),
  })

  constructor(
    private fb: FormBuilder,
    private videoService: VideoService,
    private eventVideoService: EventVideoService
  ) {}

  ngOnChanges() {
    this.videoService
      .getAllVideos()
      .pipe(
        map((videos) => this.updateVideos(videos)),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  onSubmit() {
    if (this.form.valid) {
      const videoId = this.form.getRawValue().videoId.id
      this.eventVideoService
        .addVideoToEvent({ eventId: this.event.id, videoId })
        .pipe(
          tap((event) => {
            this.update.emit(event)
            this.form.reset()
          }),
          takeUntil(this.destroy$)
        )
        .subscribe()
    }
  }

  private updateVideos(videos: Video[]) {
    this.videos = videos
      .filter(({ id }) => !this.event.videos.some((video) => video.id === id))
      .map((video): VideoListItem => ({ selected: false, content: video.title, id: video.id }))
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
