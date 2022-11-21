import { MemberRemoveButtonComponent } from './member-remove-button.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { MemberModule } from '../../member.module';
import { Member } from '../../models/member.model';
import { MemberStatus } from '../../models/member-status.model';

describe('MemberRemoveButtonComponent', () => {
  beforeEach(() => MockBuilder(MemberRemoveButtonComponent, MemberModule));
  const member = new Member('id', 'url', 'name', 'description', 'joinedAt', 'role', MemberStatus.ALUMNI, false);

  it('should create', () => {
    const fixture = MockRender(MemberRemoveButtonComponent, { member });
    expect(fixture.componentInstance.member).toEqual(member);
  });
});
