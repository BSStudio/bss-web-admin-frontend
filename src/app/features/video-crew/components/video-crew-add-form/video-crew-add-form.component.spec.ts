import { FormBuilder } from '@angular/forms'
import { MockBuilder, MockInstance, MockRender } from 'ng-mocks'
import { of } from 'rxjs'
import { VideoCrewAddFormComponent } from './video-crew-add-form.component'
import { VideoCrewModule } from '../../video-crew.module'
import { DetailedVideo } from '../../../video/models'
import { VideoCrewService } from '../../services/video-crew.service'
import { MemberService } from '../../../member/services/member.service'
import { Member, MemberStatus } from '../../../member/models'

describe('VideoCrewAddModalComponent', () => {
  const positions = ['position']
  const members = [
    new Member('id', 'url', 'name', 'nickname', 'description', 'joinedAt', 'role', MemberStatus.ALUMNI, true),
  ]
  const detailedVideo = new DetailedVideo('id', 'url', 'title', 'description', 'uploadedAt', true, [])
  beforeEach(() => MockBuilder([VideoCrewAddFormComponent, FormBuilder], VideoCrewModule))

  it('should create', () => {
    MockInstance(VideoCrewService, 'getPositions', () => of(positions))
    MockInstance(MemberService, 'getMembers', () => of(members))
    const fixture = MockRender(VideoCrewAddFormComponent, { video: detailedVideo })

    expect(fixture.point.componentInstance.video).toEqual(detailedVideo)
  })
})
