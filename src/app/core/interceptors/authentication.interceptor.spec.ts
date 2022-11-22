import { AuthenticationInterceptor } from './authentication.interceptor';
import { MockBuilder, MockRender } from 'ng-mocks';

describe('AuthenticationInterceptor', () => {
  beforeEach(() => MockBuilder(AuthenticationInterceptor));

  it('should be created', () => {
    MockRender(AuthenticationInterceptor);
  });
});
