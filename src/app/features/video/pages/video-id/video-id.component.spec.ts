import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { VideoIdComponent } from './video-id.component'
import { VideoModule } from '../../video.module'
import { ActivatedRoute } from '@angular/router'
import { DetailedVideo } from '../../models'
import { RouterTestingModule } from '@angular/router/testing'

describe('VideoIdComponent', () => {
  beforeEach(() => MockBuilder([VideoIdComponent, RouterTestingModule.withRoutes([])], VideoModule))

  const detailedVideo = new DetailedVideo('id', 'url', 'title', 'description', 'uploadedAt', true, [])

  it('should render', () => {
    MockInstance(ActivatedRoute, (instance) =>
      ngMocks.stub(instance, {
        snapshot: ngMocks.stub(instance.snapshot, {
          data: ngMocks.stub(instance.snapshot.data, { video: detailedVideo }),
        }),
      })
    )
    const fixture = MockRender(VideoIdComponent)
    expect(fixture.componentInstance.video).toEqual(detailedVideo)
  })
})
