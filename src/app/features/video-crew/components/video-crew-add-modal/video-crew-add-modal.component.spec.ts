import { EventEmitter } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { MockBuilder, MockInstance, MockRender } from 'ng-mocks'
import { of } from 'rxjs'
import { VideoCrewAddModalComponent } from './video-crew-add-modal.component'
import { VideoCrewModule } from '../../video-crew.module'
import { DetailedVideo } from '../../../video/models'
import { VideoCrewService } from '../../services/video-crew.service'
import { MemberService } from '../../../member/services/member.service'
import { Member, MemberStatus } from '../../../member/models'

describe('VideoCrewAddModalComponent', () => {
  const positions = ['position']
  const members = [new Member('id', 'url', 'name', 'description', 'joinedAt', 'role', MemberStatus.ALUMNI, true)]
  const detailedVideo = new DetailedVideo('id', 'url', 'title', 'description', 'uploadedAt', true, [])
  const eventEmitter = new EventEmitter<DetailedVideo>()
  beforeEach(() =>
    MockBuilder([VideoCrewAddModalComponent, FormBuilder], VideoCrewModule).provide({
      provide: 'video',
      useFactory: () => detailedVideo,
    })
  )

  it('should create', () => {
    MockInstance(VideoCrewService, 'getPositions', () => of(positions))
    MockInstance(MemberService, 'getMembers', () => of(members))
    const fixture = MockRender(VideoCrewAddModalComponent)

    expect(fixture.point.componentInstance.video).toEqual(detailedVideo)
    expect(fixture.point.componentInstance['update']).toEqual(eventEmitter)
  })
})
