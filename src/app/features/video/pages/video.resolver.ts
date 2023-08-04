import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { VideoService } from '../services/video.service'
import { Observable, throwError } from 'rxjs'
import { Injectable } from '@angular/core'
import { DetailedVideo } from '../models'

@Injectable({ providedIn: 'root' })
export class VideoResolver {
  constructor(private videoService: VideoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DetailedVideo> {
    const videoId = route.paramMap.get('videoId')
    if (!videoId) return throwError(() => 'videoId is null')
    return this.videoService.getVideo(videoId)
  }
}
