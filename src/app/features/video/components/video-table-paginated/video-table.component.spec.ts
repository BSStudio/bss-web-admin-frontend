import { MockBuilder, MockInstance, MockRender } from 'ng-mocks'
import { VideoTableComponent } from './video-table.component'
import { VideoModule } from '../../video.module'
import { VideoService } from '../../services/video.service'
import { of } from 'rxjs'
import { Video } from '../../models'
import { Pageable, PaginatedResponse, Sort } from '../../../../shared/models'

describe('VideoTableComponent', () => {
  beforeEach(() => MockBuilder(VideoTableComponent, VideoModule))

  const video = new Video('id', 'url', 'title', 'uploadedAt', true)
  const sort = new Sort(false, false, true)
  const pageable = new Pageable(sort, 3, 2, 10, true, false)
  const paginatedResponse = new PaginatedResponse<Video>(
    [video],
    pageable,
    false,
    22,
    200,
    2,
    4,
    sort,
    false,
    123,
    false
  )

  it('should render', () => {
    MockInstance(VideoService, 'getVideos', () => of(paginatedResponse))
    const fixture = MockRender(VideoTableComponent)

    expect(fixture).toBeTruthy()
  })
})
