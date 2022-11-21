import { EventVideoTableComponent } from './event-video-table.component';
import { MockBuilder, MockInstance, MockRender } from 'ng-mocks';
import { EventModule } from '../../event.module';
import { DetailedEvent } from '../../models';

describe('EventVideoTableComponent', () => {
  beforeEach(() => MockBuilder(EventVideoTableComponent, EventModule));
  const detailedEvent = new DetailedEvent('id', 'url', 'title', 'description', 'date', true, []);

  it('should create', () => {
    const fixture = MockRender(EventVideoTableComponent, {
      event: detailedEvent,
    });
    expect(fixture.componentInstance.event).toEqual(detailedEvent);
  });
});
