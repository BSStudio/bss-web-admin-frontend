import { Injectable } from '@angular/core'
import { VideoCrewService } from '../services/video-crew.service'
import { NotificationService } from 'carbon-components-angular'
import { DetailedCrewMember } from '../models'
import { tap } from 'rxjs'
import { DetailedVideo } from '../../video/models'

@Injectable({ providedIn: 'root' })
export class VideoCrewActionsService {
  constructor(private service: VideoCrewService, private notification: NotificationService) {}

  removeCrewMember(videoCrew: DetailedCrewMember, memberName: string) {
    return this.service.removeVideoCrewMember(videoCrew).pipe(
      tap({
        next: (video) => this.successNotification(video, memberName, videoCrew.position),
        error: (err) => this.errorNotification(err),
      })
    )
  }

  private successNotification(video: DetailedVideo, memberName: string, position: string) {
    const caption = $localize`Crew member position was successfully removed`
    this.notification.showToast({
      type: 'success',
      title: $localize`${memberName}'s ${position} position`,
      subtitle: video.title,
      caption,
      message: caption,
      smart: true,
    })
  }

  private errorNotification(error: unknown) {
    const caption = $localize`Couldn't remove crew member position. Try refreshing the page`
    this.notification.showToast({
      type: 'error',
      title: $localize`Error removing crew member`,
      caption,
      message: caption,
      smart: true,
    })
  }
}
