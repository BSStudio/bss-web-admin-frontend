import { EventVideoAddModalComponent } from './event-video-add-modal.component'
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { EventModule } from '../../event.module'
import { EMPTY } from 'rxjs'
import { VideoService } from '../../../video/services/video.service'
import { DetailedEvent } from '../../models'
import { FormBuilder } from '@angular/forms'

describe('EventVideoAddModalComponent', () => {
  const detailedEvent = new DetailedEvent('id', 'url', 'title', 'description', 'date', true, [])
  beforeEach(() =>
    MockBuilder([EventVideoAddModalComponent, FormBuilder], EventModule).provide({
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
