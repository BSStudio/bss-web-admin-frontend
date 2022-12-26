import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { DetailedVideo } from '../../models'

@Component({
  selector: 'app-video-id',
  templateUrl: './video-id.component.html',
})
export class VideoIdComponent {
  public video = <DetailedVideo>this.route.snapshot.data['video']

  constructor(private route: ActivatedRoute) {}

  setVideo(video: DetailedVideo) {
    this.video = video
  }
}
