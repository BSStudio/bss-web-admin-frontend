import { VideoCrewTableComponent } from './video-crew-table.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { VideoCrewModule } from '../../video-crew.module';
import { DetailedVideo } from '../../../video/models';

describe('VideoCrewTableComponent', () => {
  beforeEach(() => MockBuilder(VideoCrewTableComponent, VideoCrewModule));
  const detailedVideo = new DetailedVideo('id', 'url', 'title', 'description', 'uploadedAt', true, []);

  it('should create', () => {
    const fixture = MockRender(VideoCrewTableComponent, { detailedVideo });

    expect(fixture.componentInstance.detailedVideo).toEqual(detailedVideo);
  });
});
