import { MemberTableComponent } from './member-table.component'
import { MockBuilder, MockRender } from 'ng-mocks'
import { MemberModule } from '../../member.module'

describe('MemberTableComponent', () => {
  beforeEach(() => MockBuilder(MemberTableComponent, MemberModule))

  xit('should create', () => {
    const fixture = MockRender(MemberTableComponent)
    expect(fixture.componentInstance).toBeTruthy()
  })
})
