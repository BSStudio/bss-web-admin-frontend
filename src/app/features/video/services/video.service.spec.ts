import { VideoService } from './video.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockBuilder, ngMocks } from 'ng-mocks';
import { tap } from 'rxjs';
import { CreateVideo, DetailedVideo, UpdateVideo, Video } from '../models';
import { Pageable, PaginatedResponse, Sort } from '../../../shared/models';

describe('VideoService', () => {
  ngMocks.faster();
  beforeAll(() => MockBuilder([VideoService, HttpClientTestingModule]));

  const videoId = 'videoId';
  const createVideo = new CreateVideo('url', 'title');
  const video = new Video(videoId, 'url', 'title', 'uploadedAt', true);
  const updateVideo = new UpdateVideo('url', 'title', 'description', 'uploadedAt', true);
  const detailedVideo = new DetailedVideo(videoId, 'url', 'title', 'description', 'uploadedAt', true, []);
  const sort = new Sort(false, false, true);
  const pageable = new Pageable(sort, 3, 2, 10, true, false);
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
  );

  it('should get all videos', (done) => {
    const service = ngMocks.findInstance(VideoService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service
      .getAllVideos()
      .pipe(tap((actual) => expect(actual).toEqual([video])))
      .subscribe({ complete: () => done() });

    httpMock.expectOne((req) => req.method === 'GET' && req.url === '/api/v1/video/all').flush([video]);
    httpMock.verify();
  });

  it('should get paginated videos', (done) => {
    const service = ngMocks.findInstance(VideoService);
    const httpMock = ngMocks.findInstance(HttpTestingController);
    const page = 5;
    const size = 10;

    service
      .getVideos(page, size)
      .pipe(tap((actual) => expect(actual).toEqual(paginatedResponse)))
      .subscribe({ complete: () => done() });

    httpMock
      .expectOne(
        (req) =>
          req.method === 'GET' &&
          req.urlWithParams === `/api/v1/video?${new URLSearchParams({ page: `${page}`, size: `${size}` })}`
      )
      .flush(paginatedResponse);
    httpMock.verify();
  });

  it('should get a video', (done) => {
    const service = ngMocks.findInstance(VideoService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service
      .getVideo(videoId)
      .pipe(tap((actual) => expect(actual).toEqual(detailedVideo)))
      .subscribe({ complete: () => done() });

    httpMock
      .expectOne((req) => req.method === 'GET' && req.urlWithParams === `/api/v1/video/${videoId}`)
      .flush(detailedVideo);
    httpMock.verify();
  });

  it('should create a video', (done) => {
    const service = ngMocks.findInstance(VideoService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service
      .createVideo(createVideo)
      .pipe(tap((actual) => expect(actual).toEqual(video)))
      .subscribe({ complete: () => done() });

    httpMock.expectOne((req) => req.method === 'POST' && req.urlWithParams === `/api/v1/video`).flush(video);
    httpMock.verify();
  });

  it('should change visibility of videos', (done) => {
    const service = ngMocks.findInstance(VideoService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    const visible = true;
    const videoIds = [videoId];
    service
      .changeVisibility(videoIds, visible)
      .pipe(tap((actual) => expect(actual).toEqual(videoIds)))
      .subscribe({ complete: () => done() });

    httpMock
      .expectOne(
        (req) =>
          req.method === 'PUT' &&
          req.urlWithParams ===
            `/api/v1/video?${new URLSearchParams({ videoIds: `${videoIds}`, visible: `${visible}` })}`
      )
      .flush(videoIds);
    httpMock.verify();
  });

  it('should change visibility of videos with default', (done) => {
    const service = ngMocks.findInstance(VideoService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    const videoIds = [videoId];
    service
      .changeVisibility(videoIds)
      .pipe(tap((actual) => expect(actual).toEqual(videoIds)))
      .subscribe({ complete: () => done() });

    httpMock
      .expectOne(
        (req) =>
          req.method === 'PUT' &&
          req.urlWithParams === `/api/v1/video?${new URLSearchParams({ videoIds: `${videoIds}`, visible: `${false}` })}`
      )
      .flush(videoIds);
    httpMock.verify();
  });

  it('should update a video', (done) => {
    const service = ngMocks.findInstance(VideoService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service
      .updateVideo(videoId, updateVideo)
      .pipe(tap((actual) => expect(actual).toEqual(detailedVideo)))
      .subscribe({ complete: () => done() });

    httpMock
      .expectOne((req) => req.method === 'PUT' && req.urlWithParams === `/api/v1/video/${videoId}`)
      .flush(detailedVideo);
    httpMock.verify();
  });

  it('should update a video', (done) => {
    const service = ngMocks.findInstance(VideoService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service.removeVideo(videoId).subscribe({ complete: () => done() });

    httpMock
      .expectOne((req) => req.method === 'DELETE' && req.urlWithParams === `/api/v1/video/${videoId}`)
      .flush(detailedVideo);
    httpMock.verify();
  });
});
