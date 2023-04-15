import { MockBuilder, MockRender, ngMocks } from 'ng-mocks'
import { EventIndexComponent } from './event-index.component'
import { EventModule } from '../../event.module'
import { EventTableComponent } from '../../components/event-table/event-table.component'

describe('EventIndexComponent', () => {
  beforeEach(() => MockBuilder(EventIndexComponent, EventModule))

  it('should render', () => {
    MockRender(EventIndexComponent)

    const header = ngMocks.find('h1')
    expect(ngMocks.formatText(header)).toBe('Event manager')
    const article = ngMocks.find('article')
    const paragraph = ngMocks.find(article, 'p')
    expect(ngMocks.formatText(paragraph)).toBe('A short description will be added here')
    expect(() => ngMocks.findInstance(EventTableComponent)).not.toThrow()
  })
})
