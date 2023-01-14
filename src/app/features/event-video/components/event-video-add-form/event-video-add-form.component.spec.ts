import { EventVideoAddFormComponent } from './event-video-add-form.component'
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { EMPTY } from 'rxjs'
import { VideoService } from '../../../video/services/video.service'
import { DetailedEvent } from '../../../event/models'
import { FormBuilder } from '@angular/forms'
import { EventVideoModule } from '../../event-video.module'

describe('EventVideoAddModalComponent', () => {
  const detailedEvent = new DetailedEvent('id', 'url', 'title', 'description', 'date', true, [])
  beforeEach(() =>
    MockBuilder([EventVideoAddFormComponent, FormBuilder], EventVideoModule).provide({
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
    const fixture = MockRender(EventVideoAddFormComponent)
    expect(fixture.point.componentInstance.event).toBe(detailedEvent)
  })
})