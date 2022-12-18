import { MockBuilder, MockRender } from 'ng-mocks'
import { VideoCreateModalComponent } from './video-create-modal.component'
import { VideoModule } from '../../video.module'
import {ReactiveFormsModule} from "@angular/forms";

describe('VideoCreateModalComponent', () => {
  beforeEach(() => MockBuilder([VideoCreateModalComponent, ReactiveFormsModule], VideoModule))

  it('should render', () => {
    const fixture = MockRender(VideoCreateModalComponent)

    expect(fixture).toBeTruthy()
  })
})
