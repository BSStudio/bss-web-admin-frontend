import { EventVideoService } from './event-video.service'
import { MockBuilder, ngMocks } from 'ng-mocks'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { EventVideo } from '../models'
import { tap } from 'rxjs'
import { DetailedEvent } from '../../event/models'

describe('EventVideoService', () => {
  ngMocks.faster()
  beforeAll(() => MockBuilder([EventVideoService, HttpClientTestingModule]))
  const eventVideo = new EventVideo('eventId', 'videoId')
  const detailedEvent = new DetailedEvent('id', 'url', 'title', 'description', 'date', true, [])

  it('should add video to event', (done) => {
    const service = ngMocks.findInstance(EventVideoService)
    const httpMock = ngMocks.findInstance(HttpTestingController)

    service
      .addVideoToEvent(eventVideo)
      .pipe(tap((actual) => expect(actual).toEqual(detailedEvent)))
      .subscribe({ complete: () => done() })

    httpMock
      .expectOne(
        (req) =>
          req.method === 'POST' &&
          req.urlWithParams === `/api/v1/eventVideo?${new URLSearchParams({ ...eventVideo })}` &&
          req.body === null
      )
      .flush(detailedEvent)
    httpMock.verify()
  })

  it('should remove video from event', (done) => {
    const service = ngMocks.findInstance(EventVideoService)
    const httpMock = ngMocks.findInstance(HttpTestingController)

    service
      .removeVideoFromEvent(eventVideo)
      .pipe(tap((actual) => expect(actual).toEqual(detailedEvent)))
      .subscribe({ complete: () => done() })

    httpMock
      .expectOne(
        (req) =>
          req.method === 'DELETE' &&
          req.urlWithParams === `/api/v1/eventVideo?${new URLSearchParams({ ...eventVideo })}` &&
          req.body === null
      )
      .flush(detailedEvent)
    httpMock.verify()
  })
})
