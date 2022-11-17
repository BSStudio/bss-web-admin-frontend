import { TestBed } from '@angular/core/testing';

import { AuthenticationInterceptor } from './authentication.interceptor';

describe('AuthenticationInterceptor', () => {
  let interceptor: AuthenticationInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationInterceptor],
    });
    interceptor = TestBed.inject(AuthenticationInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
