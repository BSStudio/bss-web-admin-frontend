import { Injectable } from '@angular/core'
import { EventVideoService } from '../services/event-video.service'
import { NotificationService } from 'carbon-components-angular'
import { DetailedEvent } from '../../event/models'
import { tap } from 'rxjs'
import { Video } from '../../video/models'

@Injectable()
export class EventVideoActionsService {
  constructor(private service: EventVideoService, private notification: NotificationService) {}

  removeVideoFromEvent(event: DetailedEvent, video: Video) {
    return this.service.removeVideoFromEvent({ eventId: event.id, videoId: video.id }).pipe(
      tap({
        next: (event) => this.removeSuccessNotification(event, video),
        error: (err) => this.removeErrorNotification(err),
      })
    )
  }

  private removeSuccessNotification(event: DetailedEvent, removedVideo: Video) {
    const caption = $localize`Video remain published`
    this.notification.showToast({
      type: 'success',
      title: $localize`Video was removed from event (${event.title})`,
      subtitle: removedVideo.title,
      caption,
      message: caption,
      smart: true,
    })
  }

  private removeErrorNotification(error: unknown) {
    this.notification.showToast({
      type: 'error',
      title: $localize`Error removing video`,
      content: JSON.stringify(error),
    })
  }
}
