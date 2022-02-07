import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-video-id',
  templateUrl: './video-id.component.html',
  styleUrls: ['./video-id.component.scss'],
})
export class VideoIdComponent {
  public videoId: Observable<string>;
  constructor(route: ActivatedRoute) {
    this.videoId = route.params.pipe(map((p) => p['videoId']));
  }
}
