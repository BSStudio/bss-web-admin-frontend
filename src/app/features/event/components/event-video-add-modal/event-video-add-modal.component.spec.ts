import { EventVideoAddModalComponent } from './event-video-add-modal.component';
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';
import { EventModule } from '../../event.module';
import { EventService } from '../../services/event.service';
import { EMPTY } from 'rxjs';
import { VideoService } from '../../../video/services/video.service';
import { DetailedEvent } from '../../models';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

describe('EventVideoAddModalComponent', () => {
  const detailedEvent = new DetailedEvent('id', 'url', 'title', 'description', 'date', true, []);
  const updateEmitter = new EventEmitter<DetailedEvent>();
  beforeEach(() =>
    MockBuilder([EventVideoAddModalComponent, FormBuilder], EventModule)
      .provide({ provide: 'event', useFactory: () => detailedEvent })
      .provide({ provide: 'update', useFactory: () => updateEmitter })
  );

  it('should create', () => {
    MockInstance(VideoService, (instance) =>
      ngMocks.stub(instance, {
        getAllVideos: () => EMPTY,
      })
    );
    MockRender(EventVideoAddModalComponent);
  });
});
