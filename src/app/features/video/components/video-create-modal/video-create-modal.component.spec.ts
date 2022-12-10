import { MockBuilder, MockRender } from 'ng-mocks'
import { VideoCreateModalComponent } from './video-create-modal.component'
import { VideoModule } from '../../video.module'

describe('VideoCreateModalComponent', () => {
  beforeEach(() => MockBuilder(VideoCreateModalComponent, VideoModule))

  it('should render', () => {
    const fixture = MockRender(VideoCreateModalComponent)

    expect(fixture).toBeTruthy()
  })
})
