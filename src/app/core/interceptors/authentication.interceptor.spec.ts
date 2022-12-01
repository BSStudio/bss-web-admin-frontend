import { AuthenticationInterceptor } from './authentication.interceptor';
import { MockBuilder, MockRender, NG_MOCKS_INTERCEPTORS, ngMocks } from 'ng-mocks';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthenticationInterceptor', () => {
  beforeEach(() =>
    MockBuilder(AuthenticationInterceptor, [CoreModule, HttpClientModule])
      .exclude(NG_MOCKS_INTERCEPTORS)
      .keep(HTTP_INTERCEPTORS)
      .replace(HttpClientModule, HttpClientTestingModule)
  );

  it('should be created', () => {
    MockRender();

    const client = ngMocks.findInstance(HttpClient);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    client.get('/target').subscribe();

    const req = httpMock.expectOne('/target');
    req.flush('');
    httpMock.verify();

    expect(req.request.headers.get('application-secret')).toEqual('appSecret');
  });
});
