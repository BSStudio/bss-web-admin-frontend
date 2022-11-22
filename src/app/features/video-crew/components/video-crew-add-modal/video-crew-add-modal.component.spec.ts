import { VideoCrewAddModalComponent } from './video-crew-add-modal.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { VideoCrewModule } from '../../video-crew.module';
import { FormBuilder } from '@angular/forms';

describe('VideoCrewAddModalComponent', () => {
  beforeEach(() => MockBuilder([VideoCrewAddModalComponent, FormBuilder], VideoCrewModule));

  xit('should create', () => {
    const fixture = MockRender(VideoCrewAddModalComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
