import { MemberProfilePictureComponent } from './member-profile-picture.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { MemberModule } from '../../member.module';
import { Member } from '../../models/member.model';
import { MemberStatus } from '../../models/member-status.model';

describe('MemberProfilePictureComponent', () => {
  beforeEach(() => MockBuilder(MemberProfilePictureComponent, MemberModule));
  const member = new Member('id', 'url', 'name', 'description', 'joinedAt', 'role', MemberStatus.ALUMNI, true);

  it('should create', () => {
    const fixture = MockRender(MemberProfilePictureComponent, {
      member,
    });
    expect(fixture.componentInstance.member).toEqual(member);
  });
});
