import { EventRemoveButtonComponent } from './event-remove-button.component'
import { MockBuilder, MockRender } from 'ng-mocks'
import { EventModule } from '../../event.module'

describe('EventRemoveButtonComponent', () => {
  beforeEach(() => MockBuilder(EventRemoveButtonComponent, EventModule))

  it('should create', () => {
    const fixture = MockRender(EventRemoveButtonComponent)
    expect(fixture).toBeTruthy()
  })
})
