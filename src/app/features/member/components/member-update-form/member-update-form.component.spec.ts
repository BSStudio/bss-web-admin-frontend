import { MemberUpdateFormComponent } from './member-update-form.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { MemberModule } from '../../member.module';
import { Member } from '../../models/member.model';
import { MemberStatus } from '../../models/member-status.model';
import { FormBuilder } from '@angular/forms';

describe('MemberUpdateFormComponent', () => {
  beforeEach(() => MockBuilder([MemberUpdateFormComponent, FormBuilder], MemberModule));
  const member = new Member('id', 'url', 'name', 'description', 'joinedAt', 'role', MemberStatus.ALUMNI, false);

  it('should create', () => {
    const fixture = MockRender(MemberUpdateFormComponent, { member });
    expect(fixture.componentInstance.member).toEqual(member);
  });
});
