import { EventVideoAddModalComponent } from './event-video-add-modal.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { EventModule } from '../../event.module';

describe('EventVideoAddModalComponent', () => {
  beforeEach(() => MockBuilder(EventVideoAddModalComponent, EventModule));

  it('should create', () => {
    MockRender(EventVideoAddModalComponent);
  });
});
