import { VideoCrewService } from './video-crew.service';
import { MockBuilder, ngMocks } from 'ng-mocks';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { tap } from 'rxjs';
import { DetailedCrewMember } from '../models';
import { DetailedVideo } from '../../video/models';

describe('VideoCrewService', () => {
  const crew = new DetailedCrewMember('videoId', 'position', 'memberId');
  const video = new DetailedVideo('id', 'url', 'title', 'description', 'uploadedAt', true, []);
  ngMocks.faster();
  beforeAll(() => MockBuilder([VideoCrewService, HttpClientTestingModule]));

  it('get positions', (done) => {
    const service = ngMocks.findInstance(VideoCrewService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service
      .getPositions()
      .pipe(tap((actual) => expect(actual).toEqual(['position1', 'position2'])))
      .subscribe({ complete: () => done() });

    const req = httpMock.expectOne('/api/v1/videoCrew/position');
    expect(req.request.method).toEqual('GET');
    req.flush(['position1', 'position2']);
    httpMock.verify();
  });

  it('add video crew member', (done) => {
    const service = ngMocks.findInstance(VideoCrewService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service
      .addVideoCrewMember(crew)
      .pipe(tap((actual) => expect(actual).toEqual(video)))
      .subscribe({ complete: () => done() });

    const req = httpMock.expectOne(`/api/v1/videoCrew?${new URLSearchParams({ ...crew })}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toBeNull();
    req.flush(video);
    httpMock.verify();
  });

  it('remove video crew member', (done) => {
    const service = ngMocks.findInstance(VideoCrewService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service
      .removeVideoCrewMember(crew)
      .pipe(tap((actual) => expect(actual).toEqual(video)))
      .subscribe({ complete: () => done() });

    const req = httpMock.expectOne(`/api/v1/videoCrew?${new URLSearchParams({ ...crew })}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(video);
    httpMock.verify();
  });
});
