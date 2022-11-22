import { EventTableComponent } from './event-table.component';
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';
import { EventModule } from '../../event.module';
import { EventService } from '../../services/event.service';
import { EMPTY } from 'rxjs';

describe('EventTableComponent', () => {
  beforeEach(() => MockBuilder(EventTableComponent, EventModule));

  it('should create', () => {
    MockInstance(EventService, (instance) =>
      ngMocks.stub(instance, {
        getEvents: () => EMPTY,
      })
    );
    MockRender(EventTableComponent);
  });
});
