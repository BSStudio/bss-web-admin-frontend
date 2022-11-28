import { AuthenticationInterceptor } from './authentication.interceptor';
import { MockBuilder, MockRender } from 'ng-mocks';
import { HttpRequest } from '@angular/common/http';

describe('AuthenticationInterceptor', () => {
  beforeEach(() => MockBuilder(AuthenticationInterceptor));

  it('should be created', () => {
    const fixture = MockRender(AuthenticationInterceptor);
    const updatedRequest = {};
    const handle = jasmine.createSpy('handle');
    const clone = jasmine.createSpy('clone').and.returnValue(updatedRequest);
    fixture.point.componentInstance.intercept({ clone } as unknown as HttpRequest<unknown>, { handle });
    expect(clone).toHaveBeenCalledOnceWith({
      setHeaders: { 'application-secret': 'appSecret' },
    });
    expect(handle).toHaveBeenCalledWith(updatedRequest);
  });
});
