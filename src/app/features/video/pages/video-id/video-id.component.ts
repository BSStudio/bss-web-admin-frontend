import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { DetailedVideo } from '../../models'

@Component({
  selector: 'app-video-id',
  templateUrl: './video-id.component.html',
  styleUrls: ['./video-id.component.scss'],
})
export class VideoIdComponent {
  public video = <DetailedVideo>this.route.snapshot.data['video']

  constructor(
    private route: ActivatedRoute,
    private title: Title,
  ) {
    this.title.setTitle(this.video.title)
  }

  setVideo(video: DetailedVideo) {
    this.video = video
    this.title.setTitle(this.video.title)
  }
}
