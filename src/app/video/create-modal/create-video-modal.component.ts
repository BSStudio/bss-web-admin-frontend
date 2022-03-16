import { CreateVideo, VideoService } from '../service/video.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-create-video-modal',
  templateUrl: './create-video-modal.component.html',
})
export class CreateVideoModalComponent {
  addVideoText = 'Videó létrehozása';
  loading = false;
  @Input() visible = false;
  url = '';
  title = '';
  constructor(private videoService: VideoService) {}

  create() {
    this.loading = true;
    return this.videoService.createVideo({ url: this.url, title: this.title }).subscribe({
      next: () => this.hideModal(),
      // TODO error: (err) => this.notificationService.error(err),
      complete: () => (this.loading = false),
    });
  }

  hideModal() {
    this.visible = false;
  }
}
