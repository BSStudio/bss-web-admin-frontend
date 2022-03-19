import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DetailedVideo } from '../../video/service/video.model';
import { VideoService } from '../../video/service/video.service';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VideoResolver implements Resolve<DetailedVideo> {
  constructor(private videoService: VideoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const videoId = route.paramMap.get('videoId');
    if (!videoId) return throwError(() => 'videoId is null');
    return this.videoService.getVideo(videoId);
  }
}
