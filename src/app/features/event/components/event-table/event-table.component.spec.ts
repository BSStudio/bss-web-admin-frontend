import { EventTableComponent } from './event-table.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { EventModule } from '../../event.module';

describe('EventTableComponent', () => {
  beforeEach(() => MockBuilder(EventTableComponent, EventModule));

  it('should create', () => {
    MockRender(EventTableComponent);
  });
});
