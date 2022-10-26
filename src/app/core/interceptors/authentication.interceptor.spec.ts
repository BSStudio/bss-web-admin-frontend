import { TestBed } from '@angular/core/testing';

import { AuthenticationInterceptor } from './authentication.interceptor';
import { HttpRequest } from '@angular/common/http';

describe('AuthenticationInterceptor', () => {
  let interceptor: AuthenticationInterceptor = TestBed.inject(AuthenticationInterceptor);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationInterceptor],
    });
    interceptor = TestBed.inject(AuthenticationInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should update header', () => {
    const httpRequest = new HttpRequest('GET', 'test');
    // todo interceptor.intercept(httpRequest, httpHandler );
  });
});
