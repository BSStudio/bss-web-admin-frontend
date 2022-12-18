import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { VideoIdComponent } from './video-id.component'
import { VideoModule } from '../../video.module'
import { ActivatedRoute } from '@angular/router'
import { DetailedVideo } from '../../models'

describe('VideoIdComponent', () => {
  beforeEach(() => MockBuilder([VideoIdComponent], VideoModule))

  const detailedVideo = new DetailedVideo('id', 'url', 'title', 'description', 'uploadedAt', true, [])

  xit('should render', () => {
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
