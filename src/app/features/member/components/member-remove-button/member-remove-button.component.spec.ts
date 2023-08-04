import { MemberRemoveButtonComponent } from './member-remove-button.component'
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { MemberModule } from '../../member.module'
import { AlertModalType, Button, IconDirective, ModalButtonType, ModalService } from 'carbon-components-angular'
import { Member, MemberStatus } from '../../models'
import { of } from 'rxjs'
import { Router } from '@angular/router'
import { MemberActionsService } from '../../actions/member.actions.service'

describe('MemberRemoveButtonComponent', () => {
  beforeEach(() => MockBuilder(MemberRemoveButtonComponent, MemberModule))
  const member = new Member(
    'id',
    'url',
    'name',
    'nickname',
    'description',
    'joinedAt',
    'role',
    MemberStatus.ALUMNI,
    false,
  )

  it('should have a button with an icon', () => {
    const fixture = MockRender(MemberRemoveButtonComponent, { member })
    expect(fixture.componentInstance.member).toEqual(member)

    const button = ngMocks.find('button')
    const buttonDirective = ngMocks.findInstance(button, Button)

    expect(buttonDirective.ibmButton).toBe('danger--tertiary')
    expect(buttonDirective.size).toBe('field')
    const span = ngMocks.find(button, 'span')
    expect(ngMocks.formatText(span)).toBe('Remove')

    const svg = ngMocks.find(button, 'svg.bx--btn__icon')
    const icon = ngMocks.findInstance(svg, IconDirective)
    expect(icon.ibmIcon).toBe('delete')
    expect(icon.size).toBe('16')
  })

  describe('button click', () => {
    it('should show modal', () => {
      MockRender(MemberRemoveButtonComponent, { member })

      ngMocks.click('button')

      const modalService = ngMocks.findInstance(ModalService)
      expect(modalService.show).toHaveBeenCalledOnceWith({
        type: AlertModalType.danger,
        label: member.name,
        title: 'Remove member',
        size: 'xs',
        content: 'Are you sure you want to remove this member?',
        buttons: [
          { type: ModalButtonType.secondary, text: 'Close' },
          { type: ModalButtonType.danger, text: 'Remove', click: jasmine.any(Function) },
        ],
      })
    })
  })

  describe('modal button click', () => {
    it('should remove event and navigate to /member', () => {
      MockInstance(ModalService, 'show', (data) => data?.buttons?.[1].click?.())
      MockInstance(MemberActionsService, 'deleteMember', () => of(void 0))
      const navigate = jasmine.createSpy('navigate').and.resolveTo(true)
      MockInstance(Router, (instance) => ngMocks.stub(instance, { navigate }))
      MockRender(MemberRemoveButtonComponent, { member })

      ngMocks.click('button')

      const router = ngMocks.findInstance(Router)
      expect(router.navigate).toHaveBeenCalledOnceWith(['member'])
    })
  })
})
