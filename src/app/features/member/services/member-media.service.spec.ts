import { MemberMediaService } from './member-media.service';
import { MockBuilder, ngMocks } from 'ng-mocks';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { tap } from 'rxjs';

describe('MemberMediaService', () => {
  beforeEach(() => MockBuilder([MemberMediaService, HttpClientTestingModule]));

  it('should be created', (done) => {
    const service = ngMocks.findInstance(MemberMediaService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    const memberId = 'memberId';
    const file = new File([], 'fileName');

    service
      .uploadPicture(memberId, file)
      .pipe(tap(() => expect().nothing()))
      .subscribe({ complete: () => done() });

    httpMock
      .expectOne((req) => req.method === 'POST' && req.url === `/media/api/v1/member/${memberId}/image`)
      .flush(null);
    httpMock.verify();
  });
});
