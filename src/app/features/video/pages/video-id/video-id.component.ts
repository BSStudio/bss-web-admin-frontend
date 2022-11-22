import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailedVideo } from '../../models';

@Component({
  selector: 'app-video-id',
  templateUrl: './video-id.component.html',
})
export class VideoIdComponent {
  public video: DetailedVideo;

  constructor(private route: ActivatedRoute) {
    this.video = <DetailedVideo>this.route.snapshot.data['video'];
  }

  setVideo(video: DetailedVideo) {
    this.video = video;
  }
}
