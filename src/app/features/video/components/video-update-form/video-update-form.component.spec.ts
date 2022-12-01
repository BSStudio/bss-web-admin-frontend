import { VideoUpdateFormComponent } from './video-update-form.component'
import { MockBuilder, MockRender } from 'ng-mocks'
import { VideoModule } from '../../video.module'
import { DetailedVideo } from '../../models'
import { FormBuilder } from '@angular/forms'

describe('VideoUpdateFormComponent', () => {
  beforeEach(() => MockBuilder([VideoUpdateFormComponent, FormBuilder], VideoModule))
  const detailedVideo = new DetailedVideo('id', 'url', 'title', 'description', 'uploadedAt', true, [])

  it('should create', () => {
    const fixture = MockRender(VideoUpdateFormComponent, { video: detailedVideo })
    expect(fixture.componentInstance.video).toEqual(detailedVideo)
  })
})
