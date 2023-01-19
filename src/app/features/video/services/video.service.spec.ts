import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { MockBuilder, ngMocks } from 'ng-mocks'
import { tap } from 'rxjs'
import { VideoService } from './video.service'
import { CreateVideo, DetailedVideo, UpdateVideo, Video } from '../models'
import { Pageable, PageableRequest, PaginatedResponse, Sort, SortRequest } from '../../../shared/models'
import { CrewMember } from '../../video-crew/models'
import { SimpleMember } from '../../member/models'

describe('VideoService', () => {
  ngMocks.faster()
  beforeAll(() => MockBuilder([VideoService, HttpClientTestingModule]))

  const createVideo = new CreateVideo('url', 'title')
    const video = new Video('videoId', 'url', 'title', 'uploadedAt', true)
    const updateVideo = new UpdateVideo('url', 'title', 'description', 'uploadedAt', true)
    const member = new SimpleMember('id', 'name', 'nickname')
    const crewMember = new CrewMember('position', 'memberId', member)
    const detailedVideo = new DetailedVideo('videoId', 'url', 'title', 'description', 'uploadedAt', true, [crewMember])
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

  it('should get all videos', (done) => {
    const service = ngMocks.findInstance(VideoService)
    const httpMock = ngMocks.findInstance(HttpTestingController)

    service
      .getAllVideos()
      .pipe(tap((actual) => expect(actual).toEqual([video])))
      .subscribe({ complete: () => done() })

    httpMock.expectOne((req) => req.method === 'GET' && req.url === '/api/v1/video/all').flush([video])
    httpMock.verify()
  })

  describe('should get paginated videos', () => {
    const sort = new SortRequest<Video>('title', 'asc')
    const pageableRequest = new PageableRequest<Video>(5, 10, [sort])
    it('with all requestParams', (done) => {
      const service = ngMocks.findInstance(VideoService)
      const httpMock = ngMocks.findInstance(HttpTestingController)

      service
        .getVideos(pageableRequest)
        .pipe(tap((actual) => expect(actual).toEqual(paginatedResponse)))
        .subscribe({ complete: () => done() })

      httpMock
        .expectOne(
          (req) =>
            req.method === 'GET' &&
            req.urlWithParams ===
              `/api/v1/video?page=${pageableRequest.page}&size=${pageableRequest.size}&sort=${sort.property},${sort.direction}`
        )
        .flush(paginatedResponse)
      httpMock.verify()
    })

    it('with page requestParam', (done) => {
      const service = ngMocks.findInstance(VideoService)
      const httpMock = ngMocks.findInstance(HttpTestingController)

      service
        .getVideos({ page: pageableRequest.page })
        .pipe(tap((actual) => expect(actual).toEqual(paginatedResponse)))
        .subscribe({ complete: () => done() })

      httpMock
        .expectOne((req) => req.method === 'GET' && req.urlWithParams === `/api/v1/video?page=${pageableRequest.page}`)
        .flush(paginatedResponse)
      httpMock.verify()
    })

    it('with size requestParam', (done) => {
      const service = ngMocks.findInstance(VideoService)
      const httpMock = ngMocks.findInstance(HttpTestingController)

      service
        .getVideos({ size: pageableRequest.size })
        .pipe(tap((actual) => expect(actual).toEqual(paginatedResponse)))
        .subscribe({ complete: () => done() })

      httpMock
        .expectOne((req) => req.method === 'GET' && req.urlWithParams === `/api/v1/video?size=${pageableRequest.size}`)
        .flush(paginatedResponse)
      httpMock.verify()
    })

    it('with sort requestParam', (done) => {
      const service = ngMocks.findInstance(VideoService)
      const httpMock = ngMocks.findInstance(HttpTestingController)

      service
        .getVideos({ sort: [sort] })
        .pipe(tap((actual) => expect(actual).toEqual(paginatedResponse)))
        .subscribe({ complete: () => done() })

      httpMock
        .expectOne(
          (req) => req.method === 'GET' && req.urlWithParams === `/api/v1/video?sort=${sort.property},${sort.direction}`
        )
        .flush(paginatedResponse)
      httpMock.verify()
    })

    it('with sort requestParam (only property)', (done) => {
      const service = ngMocks.findInstance(VideoService)
      const httpMock = ngMocks.findInstance(HttpTestingController)

      service
        .getVideos({ sort: [{ property: sort.property }] })
        .pipe(tap((actual) => expect(actual).toEqual(paginatedResponse)))
        .subscribe({ complete: () => done() })

      httpMock
        .expectOne((req) => req.method === 'GET' && req.urlWithParams === `/api/v1/video?sort=${sort.property}`)
        .flush(paginatedResponse)
      httpMock.verify()
    })

    it('with multiple sort requestParam (only property)', (done) => {
      const service = ngMocks.findInstance(VideoService)
      const httpMock = ngMocks.findInstance(HttpTestingController)

      service
        .getVideos({ sort: [sort, { property: sort.property }] })
        .pipe(tap((actual) => expect(actual).toEqual(paginatedResponse)))
        .subscribe({ complete: () => done() })

      httpMock
        .expectOne(
          (req) =>
            req.method === 'GET' &&
            req.urlWithParams === `/api/v1/video?sort=${sort.property},${sort.direction}&sort=${sort.property}`
        )
        .flush(paginatedResponse)
      httpMock.verify()
    })
  })

  it('should get a video', (done) => {
    const service = ngMocks.findInstance(VideoService)
    const httpMock = ngMocks.findInstance(HttpTestingController)

    service
      .getVideo(video.id)
      .pipe(tap((actual) => expect(actual).toEqual(detailedVideo)))
      .subscribe({ complete: () => done() })

    httpMock
      .expectOne((req) => req.method === 'GET' && req.urlWithParams === `/api/v1/video/${video.id}`)
      .flush(detailedVideo)
    httpMock.verify()
  })

  it('should create a video', (done) => {
    const service = ngMocks.findInstance(VideoService)
    const httpMock = ngMocks.findInstance(HttpTestingController)

    service
      .createVideo(createVideo)
      .pipe(tap((actual) => expect(actual).toEqual(video)))
      .subscribe({ complete: () => done() })

    httpMock.expectOne((req) => req.method === 'POST' && req.urlWithParams === `/api/v1/video`).flush(video)
    httpMock.verify()
  })

  it('should change visibility of videos', (done) => {
    const service = ngMocks.findInstance(VideoService)
    const httpMock = ngMocks.findInstance(HttpTestingController)

    const visible = true
    const videoIds = [video.id]
    service
      .changeVisibility(videoIds, visible)
      .pipe(tap((actual) => expect(actual).toEqual(videoIds)))
      .subscribe({ complete: () => done() })

    httpMock
      .expectOne(
        (req) =>
          req.method === 'PUT' &&
          req.urlWithParams ===
            `/api/v1/video/visible?${new URLSearchParams({ videoIds: `${videoIds}`, visible: `${visible}` })}`
      )
      .flush(videoIds)
    httpMock.verify()
  })

  it('should change visibility of videos with default', (done) => {
    const service = ngMocks.findInstance(VideoService)
    const httpMock = ngMocks.findInstance(HttpTestingController)

    const videoIds = [video.id]
    service
      .changeVisibility(videoIds)
      .pipe(tap((actual) => expect(actual).toEqual(videoIds)))
      .subscribe({ complete: () => done() })

    httpMock
      .expectOne(
        (req) =>
          req.method === 'PUT' &&
          req.urlWithParams ===
            `/api/v1/video/visible?${new URLSearchParams({ videoIds: `${videoIds}`, visible: `${false}` })}`
      )
      .flush(videoIds)
    httpMock.verify()
  })

  it('should update a video', (done) => {
    const service = ngMocks.findInstance(VideoService)
    const httpMock = ngMocks.findInstance(HttpTestingController)

    service
      .updateVideo(video.id, updateVideo)
      .pipe(tap((actual) => expect(actual).toEqual(detailedVideo)))
      .subscribe({ complete: () => done() })

    httpMock
      .expectOne((req) => req.method === 'PUT' && req.urlWithParams === `/api/v1/video/${video.id}`)
      .flush(detailedVideo)
    httpMock.verify()
  })

  it('should remove a video', (done) => {
    const service = ngMocks.findInstance(VideoService)
    const httpMock = ngMocks.findInstance(HttpTestingController)

    service
      .removeVideo(video.id)
      .pipe(tap(() => expect().nothing()))
      .subscribe({ complete: () => done() })

    httpMock
      .expectOne((req) => req.method === 'DELETE' && req.urlWithParams === `/api/v1/video/${video.id}`)
      .flush(detailedVideo)
    httpMock.verify()
  })
})
