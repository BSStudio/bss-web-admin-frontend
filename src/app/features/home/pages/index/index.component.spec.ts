import { MockBuilder, MockRender, ngMocks } from 'ng-mocks'
import { IndexComponent } from './index.component'
import { MetricsComponent } from '../../components/metrics.component'

describe('IndexComponent', () => {
  beforeEach(() => MockBuilder(IndexComponent))

  it('should render', () => {
    MockRender(IndexComponent)
    const header = ngMocks.find('h1')
    expect(ngMocks.formatText(header)).toBe('Welcome to the BSS video admin site!')
    expect(() => ngMocks.find(MetricsComponent)).not.toThrow()
  })
})
