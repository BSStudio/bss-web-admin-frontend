import { MemberUpdateFormComponent } from './member-update-form.component'
import { MockBuilder, MockRender } from 'ng-mocks'
import { MemberModule } from '../../member.module'
import { FormBuilder } from '@angular/forms'
import { Member, MemberStatus } from '../../models'

describe('MemberUpdateFormComponent', () => {
  beforeEach(() => MockBuilder([MemberUpdateFormComponent, FormBuilder], MemberModule))
  const member = new Member('id', 'url', 'name', 'description', 'joinedAt', 'role', MemberStatus.ALUMNI, false)

  it('should create', () => {
    const fixture = MockRender(MemberUpdateFormComponent, { member })
    expect(fixture.componentInstance.member).toEqual(member)
  })
})
