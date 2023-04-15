import { EventActionsService } from './event.actions.service'
import { MockBuilder, MockInstance, ngMocks } from 'ng-mocks'
import { EventModule } from '../event.module'
import { EventService } from '../services/event.service'
import { of, throwError } from 'rxjs'
import { NotificationService } from 'carbon-components-angular'
import { DetailedEvent, Event, UpdateEvent } from '../models'

describe('EventActionsService', () => {
  ngMocks.faster()
  beforeEach(() => MockBuilder(EventActionsService, EventModule))

  const event = new Event('id', 'url', 'title', 'description', '2022-01-01', true)
  const updateEvent = new UpdateEvent('url', 'title', 'description', 'date', true)
  const detailedEvent = new DetailedEvent('id', 'url', 'title', 'description', 'date', true, [])

  it('removeEventSuccessNotification', (done) => {
    MockInstance(EventService, 'deleteEvent', () => of(void 0))

    ngMocks
      .findInstance(EventActionsService)
      .deleteEvent(event)
      .subscribe(() => done())

    expect(ngMocks.findInstance(NotificationService).showNotification).toHaveBeenCalledOnceWith({
      type: 'success',
      title: $localize`Event was removed`,
      message: event.title,
      smart: true,
    })
  })

  it('removeEventErrorNotification', (done) => {
    MockInstance(EventService, 'deleteEvent', () => throwError(() => new Error()))

    ngMocks
      .findInstance(EventActionsService)
      .deleteEvent(event)
      .subscribe({ error: () => done() })

    expect(ngMocks.findInstance(NotificationService).showToast).toHaveBeenCalledOnceWith({
      type: 'error',
      title: $localize`Error removing event`,
      subtitle: event.title,
      caption: 'Make sure videos are removed from the event',
      message: 'Make sure videos are removed from the event',
      smart: true,
    })
  })

  it('updateEventSuccessNotification', (done) => {
    MockInstance(EventService, 'updateEvent', () => of(detailedEvent))

    ngMocks
      .findInstance(EventActionsService)
      .updateEvent(event.id, updateEvent)
      .subscribe((actual) => {
        expect(actual).toEqual(detailedEvent)
        done()
      })

    expect(ngMocks.findInstance(NotificationService).showToast).toHaveBeenCalledOnceWith({
      type: 'success',
      title: 'Event updated',
      subtitle: event.title,
      caption: 'Changes were saved',
      message: 'Changes were saved',
      smart: true,
    })
  })

  it('updateEventErrorNotification', (done) => {
    MockInstance(EventService, 'updateEvent', () => throwError(() => new Error()))

    ngMocks
      .findInstance(EventActionsService)
      .updateEvent(event.id, updateEvent)
      .subscribe({ error: () => done() })

    expect(ngMocks.findInstance(NotificationService).showToast).toHaveBeenCalledOnceWith({
      type: 'error',
      title: $localize`Error updating event`,
      subtitle: updateEvent.title,
      caption: 'Make sure title/url is unique',
      message: 'Make sure title/url is unique',
      smart: true,
    })
  })
})
