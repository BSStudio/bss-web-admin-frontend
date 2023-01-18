import { EventVideoActionsService } from './event-video.actions.service'
import { MockBuilder, MockInstance, ngMocks } from 'ng-mocks'
import { EventVideoModule } from '../event-video.module'
import { EventVideo } from '../models'
import { DetailedEvent } from '../../event/models'
import { EventVideoService } from '../services/event-video.service'
import { of, throwError } from 'rxjs'
import { Video } from '../../video/models'
import { NotificationService } from 'carbon-components-angular'

describe('EventVideoActionsService', () => {
  ngMocks.faster()
  beforeEach(() => MockBuilder(EventVideoActionsService, EventVideoModule))
  const eventVideo = new EventVideo('eventId', 'videoId')
  const detailedEvent = new DetailedEvent('id', 'url', 'title', 'description', 'date', true, [])
  const video = new Video('id', 'url', 'title', 'uploadedAt', true)

  it('addVideoToEvent', (done) => {
    MockInstance(EventVideoService, 'addVideoToEvent', () => of(detailedEvent))
    const underTest = ngMocks.findInstance(EventVideoActionsService)

    underTest.addVideoToEvent(eventVideo).subscribe((actual) => {
      expect(actual).toEqual(detailedEvent)
      done()
    })
  })

  it('removeSuccessNotification', (done) => {
    MockInstance(EventVideoService, 'removeVideoFromEvent', () => of(detailedEvent))
    const underTest = ngMocks.findInstance(EventVideoActionsService)

    underTest.removeVideoFromEvent(detailedEvent, video).subscribe((actual) => {
      expect(actual).toEqual(detailedEvent)
      done()
    })
    const notification = ngMocks.findInstance(NotificationService)
    expect(notification.showToast).toHaveBeenCalledOnceWith({
      type: 'success',
      title: $localize`Video was removed from event (${detailedEvent.title})`,
      subtitle: video.title,
      caption: 'Video remain published',
      message: 'Video remain published',
      smart: true,
    })
  })
  it('removeErrorNotification', (done) => {
    const error = new Error()
    MockInstance(EventVideoService, 'removeVideoFromEvent', () => throwError(() => error))
    const underTest = ngMocks.findInstance(EventVideoActionsService)

    underTest.removeVideoFromEvent(detailedEvent, video).subscribe({ complete: () => done() })
    const notification = ngMocks.findInstance(NotificationService)
    expect(notification.showToast).toHaveBeenCalledOnceWith({
      type: 'error',
      title: $localize`Error removing video`,
      content: JSON.stringify(error),
    })
  })
})
