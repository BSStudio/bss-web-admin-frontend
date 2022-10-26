import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BaseModal, ListItem } from 'carbon-components-angular';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DetailedEvent } from '../../models';
import { VideoService } from '../../../video/services/video.service';
import { tap } from 'rxjs';
import { EventVideoService } from '../../../video/services/event-video.service';

@Component({
  selector: 'app-event-video-add-modal-component',
  templateUrl: './event-video-add-modal.component.html',
  styleUrls: ['./event-video-add-modal.component.scss'],
})
export class EventVideoAddModalComponent extends BaseModal implements OnInit, OnDestroy {
  public readonly form: FormGroup<{
    videoId: FormControl<{ selected: boolean; content: string; id: string }>;
    eventId: FormControl<string>;
  }>;
  public videos: { selected: boolean; content: string; id: string }[] = [];

  constructor(
    private fb: FormBuilder,
    @Inject('event') public event: DetailedEvent,
    private videoService: VideoService,
    private eventVideoService: EventVideoService
  ) {
    super();
    this.form = this.fb.nonNullable.group({
      videoId: this.fb.nonNullable.control({ id: '', selected: false, content: '' }),
      eventId: event.id,
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { eventId, videoId } = this.form.getRawValue();
      this.eventVideoService.addVideoToEvent({ eventId, videoId: videoId.id }).subscribe({
        next: () => this.closeModal(),
      });
    }
  }

  ngOnInit() {
    this.videoService
      .getVideos(0, 1000)
      .pipe(
        tap((res) => {
          this.videos = res.content.map((video) => ({ selected: false, content: video.title, id: video.id }));
        })
      )
      .subscribe();
  }

  ngOnDestroy() {}
}
