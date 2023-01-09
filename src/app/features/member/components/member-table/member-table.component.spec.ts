import { MemberTableComponent } from './member-table.component'
import { MockBuilder, MockInstance, MockRender } from 'ng-mocks'
import { MemberModule } from '../../member.module'
import { MemberService } from '../../services/member.service'
import { of } from 'rxjs'
import { Member, MemberStatus } from '../../models'

describe('MemberTableComponent', () => {
  const member = new Member(
    'id',
    'url',
    'name',
    'nickname',
    'description',
    'joinedAt',
    'role',
    MemberStatus.ALUMNI,
    false
  )

  beforeEach(() => MockBuilder(MemberTableComponent, MemberModule))

  it('should create', () => {
    MockInstance(MemberService, 'getMembers', () => of([member]))
    const fixture = MockRender(MemberTableComponent)
    expect(fixture.componentInstance).toBeTruthy()
  })
})
