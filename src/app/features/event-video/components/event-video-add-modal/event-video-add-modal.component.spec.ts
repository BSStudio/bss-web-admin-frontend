import { EventVideoAddModalComponent } from './event-video-add-modal.component'
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { EMPTY } from 'rxjs'
import { VideoService } from '../../../video/services/video.service'
import { DetailedEvent } from '../../../event/models'
import { FormBuilder } from '@angular/forms'
import { EventVideoModule } from '../../event-video.module'

describe('EventVideoAddModalComponent', () => {
  const detailedEvent = new DetailedEvent('id', 'url', 'title', 'description', 'date', true, [])
  beforeEach(() =>
    MockBuilder([EventVideoAddModalComponent, FormBuilder], EventVideoModule).provide({
      provide: 'event',
      useFactory: () => detailedEvent,
    })
  )

  it('should create', () => {
    MockInstance(VideoService, (instance) =>
      ngMocks.stub(instance, {
        getAllVideos: () => EMPTY,
      })
    )
    const fixture = MockRender(EventVideoAddModalComponent)
    expect(fixture.point.componentInstance.event).toBe(detailedEvent)
  })
})
