import { MockBuilder, MockRender } from 'ng-mocks'
import { MemberCreateModalComponent } from './member-create-modal.component'
import { ReactiveFormsModule } from '@angular/forms'
import { MemberModule } from '../../member.module'
import { ModalModule } from 'carbon-components-angular'

describe('MemberCreateModalComponent', () => {
  beforeEach(() => MockBuilder([MemberCreateModalComponent, ReactiveFormsModule, ModalModule], [MemberModule]))

  it('should render', () => {
    const fixture = MockRender(MemberCreateModalComponent)

    expect(fixture.point.componentInstance.open).toBeTrue()
  })
})
