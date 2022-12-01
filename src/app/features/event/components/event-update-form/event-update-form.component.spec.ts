import { EventUpdateFormComponent } from './event-update-form.component'
import { MockBuilder, MockRender } from 'ng-mocks'
import { EventModule } from '../../event.module'
import { Event } from '../../models'
import { FormBuilder } from '@angular/forms'

describe('EventUpdateFormComponent', () => {
  beforeEach(() => MockBuilder([EventUpdateFormComponent, FormBuilder], EventModule))
  const event = new Event('id', 'url', 'title', 'description', 'date', true)

  it('should create', () => {
    const fixture = MockRender(EventUpdateFormComponent, { event })
    expect(fixture.componentInstance.event).toEqual(event)
  })
})
