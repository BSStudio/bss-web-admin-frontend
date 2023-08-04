import { Injectable } from '@angular/core'
import { EventService } from '../services/event.service'
import { NotificationService } from 'carbon-components-angular'
import { DetailedEvent, Event, UpdateEvent } from '../models'
import { tap } from 'rxjs'

@Injectable()
export class EventActionsService {
  constructor(
    private service: EventService,
    private notification: NotificationService,
  ) {}

  deleteEvent(event: Event) {
    return this.service.deleteEvent(event.id).pipe(
      tap({
        next: () => this.removeEventSuccessNotification(event),
        error: () => this.removeEventErrorNotification(event),
      }),
    )
  }

  updateEvent(eventId: string, updateEvent: UpdateEvent) {
    return this.service.updateEvent(eventId, updateEvent).pipe(
      tap({
        next: (event) => this.updateEventSuccessNotification(event),
        error: () => this.updateEventErrorNotification(updateEvent),
      }),
    )
  }

  private removeEventSuccessNotification(event: Event) {
    return this.notification.showNotification({
      type: 'success',
      title: $localize`Event was removed`,
      message: event.title,
      smart: true,
    })
  }

  private removeEventErrorNotification(event: Event) {
    const caption = $localize`Make sure videos are removed from the event`
    this.notification.showToast({
      type: 'error',
      title: $localize`Error removing event`,
      subtitle: event.title,
      caption: caption,
      message: caption,
      smart: true,
    })
  }

  private updateEventSuccessNotification(event: DetailedEvent) {
    const caption = $localize`Changes were saved`
    this.notification.showToast({
      type: 'success',
      title: $localize`Event updated`,
      subtitle: event.title,
      caption,
      message: caption,
      smart: true,
    })
  }

  private updateEventErrorNotification(updateEvent: UpdateEvent) {
    const caption = $localize`Make sure title/url is unique`
    this.notification.showToast({
      type: 'error',
      title: $localize`Error updating event`,
      subtitle: updateEvent.title,
      caption,
      message: caption,
      smart: true,
    })
  }
}
