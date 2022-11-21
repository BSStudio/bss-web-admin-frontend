import { EventCreateModalComponent } from './event-create-modal.component';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { EventModule } from '../../event.module';
import { FormBuilder } from '@angular/forms';
import { Modal } from 'carbon-components-angular';

describe('EventCreateModalComponent', () => {
  beforeEach(() => MockBuilder([EventCreateModalComponent, FormBuilder], EventModule));

  it('should create', () => {
    const fixture = MockRender(EventCreateModalComponent);
    const modal = ngMocks.findInstance(Modal);
    expect(modal.open).toEqual(true);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
