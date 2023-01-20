import { Injectable } from '@angular/core'
import { VideoService } from '../services/video.service'
import { NotificationService } from 'carbon-components-angular'
import { DetailedVideo, UpdateVideo } from '../models'
import { catchError, EMPTY, tap } from 'rxjs'

@Injectable()
export class VideoActionsService {
  constructor(private service: VideoService, private notification: NotificationService) {}

  updateVideo(videoId: string, updateVideo: UpdateVideo) {
    return this.service.updateVideo(videoId, updateVideo).pipe(
      tap((updatedVideo) => this.updateSuccessToast(updatedVideo)),
      catchError((err) => {
        this.updateErrorToast(err)
        return EMPTY
      })
    )
  }

  removeVideo(video: DetailedVideo) {
    return this.service.removeVideo(video.id).pipe(
      tap(() => this.removeSuccessNotification(video)),
      catchError((err) => {
        this.removeErrorToast(err, video)
        return EMPTY
      })
    )
  }

  private updateSuccessToast(video: DetailedVideo) {
    const caption = $localize`Changes were saved`
    this.notification.showToast({
      type: 'success',
      title: $localize`Video updated`,
      subtitle: video.title,
      caption,
      message: caption,
      smart: true,
    })
  }

  private updateErrorToast(err: unknown) {
    const caption = $localize`Make sure everything is well formatted, and there are no duplicate ids`
    this.notification.showToast({
      type: 'error',
      title: $localize`Error updating`,
      caption,
      message: caption,
      smart: true,
    })
  }

  private removeSuccessNotification(video: DetailedVideo) {
    this.notification.showNotification({
      type: 'success',
      title: $localize`Video was removed`,
      message: video.title,
      smart: true,
    })
  }

  private removeErrorToast(error: unknown, video: DetailedVideo) {
    const caption = $localize`Remove crew members first`
    this.notification.showToast({
      type: 'error',
      title: $localize`Error removing`,
      subtitle: video.title,
      caption,
      message: caption,
      smart: true,
    })
  }
}
