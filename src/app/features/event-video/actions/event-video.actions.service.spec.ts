import { EventVideoActionsService } from './event-video.actions.service'
import { MockBuilder, MockInstance, ngMocks } from 'ng-mocks'
import { EventVideoModule } from '../event-video.module'
import { DetailedEvent } from '../../event/models'
import { EventVideoService } from '../services/event-video.service'
import { of, throwError } from 'rxjs'
import { Video } from '../../video/models'
import { NotificationService } from 'carbon-components-angular'

describe('EventVideoActionsService', () => {
  ngMocks.faster()
  beforeEach(() => MockBuilder(EventVideoActionsService, EventVideoModule))
  const detailedEvent = new DetailedEvent('id', 'url', 'title', 'description', 'date', true, [])
  const video = new Video('id', 'url', 'title', 'uploadedAt', true)

  it('removeSuccessNotification', (done) => {
    MockInstance(EventVideoService, 'removeVideoFromEvent', () => of(detailedEvent))

    ngMocks
      .findInstance(EventVideoActionsService)
      .removeVideoFromEvent(detailedEvent, video)
      .subscribe((actual) => {
        expect(actual).toEqual(detailedEvent)
        done()
      })

    expect(ngMocks.findInstance(NotificationService).showToast).toHaveBeenCalledOnceWith({
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

    ngMocks
      .findInstance(EventVideoActionsService)
      .removeVideoFromEvent(detailedEvent, video)
      .subscribe({ error: () => done() })

    expect(ngMocks.findInstance(NotificationService).showToast).toHaveBeenCalledOnceWith({
      type: 'error',
      title: $localize`Error removing video`,
      content: JSON.stringify(error),
    })
  })
})
