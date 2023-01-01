import { MockBuilder, MockRender, ngMocks } from 'ng-mocks'
import { VideoIndexComponent } from './video-index.component'
import { VideoModule } from '../../video.module'
import { VideoTableComponent } from '../../components/video-table-paginated/video-table.component'

describe('VideoIndexComponent', () => {
  beforeEach(() => MockBuilder(VideoIndexComponent, VideoModule))

  it('should render', () => {
    MockRender(VideoIndexComponent)

    expect(ngMocks.find('h1').nativeElement.innerHTML).toBe('Video manager')
    expect(ngMocks.find('article > p').nativeElement.innerHTML).toBe('A short description will be added here')
    expect(() => ngMocks.find(VideoTableComponent)).not.toThrow()
  })
})
