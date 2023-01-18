import { Injectable } from '@angular/core'
import { EventVideoService } from '../services/event-video.service'
import { NotificationService } from 'carbon-components-angular'
import { EventVideo } from '../models'
import { DetailedEvent } from '../../event/models'
import { catchError, EMPTY, tap } from 'rxjs'
import { Video } from '../../video/models'

@Injectable({ providedIn: 'root' })
export class EventVideoActionsService {
  constructor(private service: EventVideoService, private notification: NotificationService) {}

  addVideoToEvent(eventVideo: EventVideo) {
    return this.service.addVideoToEvent(eventVideo)
  }

  removeVideoFromEvent(event: DetailedEvent, video: Video) {
    return this.service.removeVideoFromEvent({ eventId: event.id, videoId: video.id }).pipe(
      tap((event) => this.removeSuccessNotification(event, video)),
      catchError((err) => {
        this.removeErrorNotification(err)
        return EMPTY
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
