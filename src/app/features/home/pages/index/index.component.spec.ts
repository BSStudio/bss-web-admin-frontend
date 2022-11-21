import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { IndexComponent } from './index.component';
import { MetricsComponent } from '../../components/metrics.component';
import { HomeModule } from '../../home.module';

describe('IndexComponent', () => {
  beforeEach(() => MockBuilder(IndexComponent, HomeModule));

  it('should render', () => {
    MockRender(IndexComponent);
    expect(ngMocks.find('h1').nativeElement.innerHTML).toBe('Welcome to the BSS video admin site!');
    expect(() => ngMocks.find(MetricsComponent)).not.toThrow();
  });
});
