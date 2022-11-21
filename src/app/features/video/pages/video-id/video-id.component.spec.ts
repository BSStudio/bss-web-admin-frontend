import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { VideoIdComponent } from './video-id.component';
import { VideoModule } from '../../video.module';
import { ActivatedRoute } from '@angular/router';
import { DetailedVideo } from '../../models';

describe('VideoIdComponent', () => {
  beforeEach(() => MockBuilder(VideoIdComponent, VideoModule));
  it('should render', () => {
    const activatedRoute = ngMocks.findInstance(ActivatedRoute);
    const detailedVideo = new DetailedVideo('id', 'url', 'title', 'description', 'uploadedAt', true, []);
    activatedRoute.snapshot.data = { video: detailedVideo };
    const fixture = MockRender(VideoIdComponent);
    expect(fixture.componentInstance.video).toEqual(detailedVideo);
  });
});
