import { MemberProfilePictureUploadComponent } from './member-profile-picture-upload.component'
import { MockBuilder, MockRender } from 'ng-mocks'
import { MemberModule } from '../../member.module'

describe('MemberProfilePictureUploadComponent', () => {
  beforeEach(() => MockBuilder(MemberProfilePictureUploadComponent, MemberModule))
  const memberId = 'memberId'

  it('should create', () => {
    const fixture = MockRender(MemberProfilePictureUploadComponent, { memberId })

    expect(fixture.componentInstance.memberId).toEqual(memberId)
  })
})
