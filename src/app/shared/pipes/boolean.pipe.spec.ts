import { BooleanPipe } from './boolean.pipe';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';

describe('BooleanPipe', () => {
  ngMocks.faster();
  beforeEach(() => MockBuilder(BooleanPipe));
  it('returns string true', () => {
    const fixture = MockRender(BooleanPipe, {
      $implicit: true,
    });
    expect(fixture.nativeElement.innerHTML).toEqual('true');
  });
  it('returns string false', () => {
    const fixture = MockRender(BooleanPipe, {
      $implicit: false,
    });
    expect(fixture.nativeElement.innerHTML).toEqual('false');
  });
});