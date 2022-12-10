import { MockBuilder, MockRender } from 'ng-mocks'
import { VideoTableComponent } from './video-table.component'
import { VideoModule } from '../../video.module'

describe('VideoTableComponent', () => {
  beforeEach(() => MockBuilder(VideoTableComponent, VideoModule))

  it('should render', () => {
    const fixture = MockRender(VideoTableComponent)

    expect(fixture).toBeTruthy()
  })
})
