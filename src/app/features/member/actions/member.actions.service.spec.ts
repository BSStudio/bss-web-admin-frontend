import { MemberActionsService } from './member.actions.service'
import { MockBuilder, MockInstance, ngMocks } from 'ng-mocks'
import { MemberModule } from '../member.module'
import { MemberService } from '../services/member.service'
import { of, throwError } from 'rxjs'
import { Member, MemberStatus, UpdateMember } from '../models'
import { NotificationService } from 'carbon-components-angular'

describe('MemberActionsService', () => {
  ngMocks.faster()
  beforeEach(() => MockBuilder(MemberActionsService, MemberModule))

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
  const updateMember = new UpdateMember(
    'url',
    'name',
    'nickname',
    'description',
    'joinedAt',
    'role',
    MemberStatus.ALUMNI,
    false
  )

  it('deleteSuccessNotification', (done) => {
    MockInstance(MemberService, 'deleteMember', () => of(void 0))
    const underTest = ngMocks.findInstance(MemberActionsService)

    underTest.deleteMember(member).subscribe(() => done())

    const notification = ngMocks.findInstance(NotificationService)
    expect(notification.showNotification).toHaveBeenCalledOnceWith({
      type: 'success',
      title: 'Member removed',
      message: member.name,
      smart: true,
    })
  })

  it('deleteErrorToast', (done) => {
    MockInstance(MemberService, 'deleteMember', () => throwError(() => new Error()))
    const underTest = ngMocks.findInstance(MemberActionsService)

    underTest.deleteMember(member).subscribe({ complete: () => done() })

    const notification = ngMocks.findInstance(NotificationService)
    expect(notification.showToast).toHaveBeenCalledOnceWith({
      type: 'error',
      title: 'Error removing member',
      subtitle: member.name,
      caption: `Member is associated with one or more videos. Try archiving or remove positions`,
      message: `Member is associated with one or more videos. Try archiving or remove positions`,
      smart: true,
    })
  })

  it('updateSuccessToast', (done) => {
    MockInstance(MemberService, 'updateMember', () => of(member))
    const underTest = ngMocks.findInstance(MemberActionsService)

    underTest.updateMember(member.id, updateMember).subscribe(() => done())

    const notification = ngMocks.findInstance(NotificationService)
    expect(notification.showToast).toHaveBeenCalledOnceWith({
      type: 'success',
      title: 'Profile updated',
      subtitle: member.name,
      caption: `Changes were saved`,
      message: `Changes were saved`,
      smart: true,
    })
  })

  it('updateErrorToast', (done) => {
    MockInstance(MemberService, 'updateMember', () => throwError(() => new Error()))
    const underTest = ngMocks.findInstance(MemberActionsService)

    underTest.updateMember(member.id, updateMember).subscribe({ complete: () => done() })

    const notification = ngMocks.findInstance(NotificationService)
    expect(notification.showToast).toHaveBeenCalledOnceWith({
      type: 'error',
      title: 'Error',
      caption: 'Check if member was assigned to a video',
      message: 'Check if member was assigned to a video',
      smart: true,
    })
  })
})
