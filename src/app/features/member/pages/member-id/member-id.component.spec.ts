import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { MemberIdComponent } from './member-id.component'
import { MemberModule } from '../../member.module'
import { Member } from '../../models/member.model'
import { MemberStatus } from '../../models/member-status.model'
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component'
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { MemberRemoveButtonComponent } from '../../components/member-remove-button/member-remove-button.component'
import { MemberProfilePictureComponent } from '../../components/member-profile-picture/member-profile-picture.component'
import { MemberProfilePictureUploadComponent } from '../../components/member-profile-picture-upload/member-profile-picture-upload.component'
import { EventEmitter } from '@angular/core'
import { MemberUpdateFormComponent } from '../../components/member-update-form/member-update-form.component'

describe('MemberIdComponent', () => {
  const member = new Member('id', 'url', 'name', 'description', 'joinedAt', 'role', MemberStatus.ALUMNI, false)
  const fakeRoute = {
    snapshot: {
      data: {
        member,
      },
    } as Partial<ActivatedRouteSnapshot>,
  } as ActivatedRoute
  beforeEach(() => MockBuilder([MemberIdComponent, RouterTestingModule], MemberModule).mock(ActivatedRoute, fakeRoute))

  it('should render', () => {
    const fixture = MockRender(MemberIdComponent)

    expect(fixture.point.componentInstance.member).toEqual(member)
  })

  it('should have a breadcrumb', () => {
    MockRender(MemberIdComponent)

    const breadcrumbComponent = ngMocks.findInstance(BreadcrumbComponent)

    expect(breadcrumbComponent.title).toBe(member.name)
    expect(breadcrumbComponent.parentRoute).toBe('member')
    expect(breadcrumbComponent.parentTitle).toBe('Members')
  })

  it('should have a title section', () => {
    MockRender(MemberIdComponent)

    const section = ngMocks.find('section#title')

    const h1 = ngMocks.find(section, 'h1')
    expect(ngMocks.formatText(h1)).toBe('Update member')

    const memberRemoveButton = ngMocks.findInstance(section, MemberRemoveButtonComponent)
    expect(memberRemoveButton.member).toEqual(member)
  })

  describe('picture section', () => {
    it('should render', () => {
      MockRender(MemberIdComponent)

      const section = ngMocks.find('section#profile-picture')

      const h2 = ngMocks.find(section, 'h2')
      expect(ngMocks.formatText(h2)).toBe('Profile picture')

      const profilePicture = ngMocks.findInstance(section, MemberProfilePictureComponent)
      expect(profilePicture.member).toEqual(member)

      const pictureUpload = ngMocks.findInstance(section, MemberProfilePictureUploadComponent)
      expect(pictureUpload.memberId).toBe(member.id)
    })

    it('should update picture', () => {
      const update = new EventEmitter<void>()
      MockInstance(MemberProfilePictureUploadComponent, (instance) => ngMocks.stub(instance, { update }))
      const fixture = MockRender(MemberIdComponent)

      const section = ngMocks.find('section#profile-picture')

      const h2 = ngMocks.find(section, 'h2')
      expect(ngMocks.formatText(h2)).toBe('Profile picture')

      const profilePicture = ngMocks.findInstance(section, MemberProfilePictureComponent)
      expect(profilePicture.member).toEqual(member)
      expect(profilePicture.updateImage).not.toHaveBeenCalled()

      const pictureUpload = ngMocks.findInstance(section, MemberProfilePictureUploadComponent)
      expect(pictureUpload.memberId).toBe(member.id)

      update.emit()
      fixture.detectChanges()

      expect(profilePicture.updateImage).toHaveBeenCalledOnceWith()
    })
  })

  describe('should have a details section', () => {
    it('should render', () => {
      MockRender(MemberIdComponent)

      const section = ngMocks.find('section#details')

      const h2 = ngMocks.find(section, 'h2')
      expect(ngMocks.formatText(h2)).toBe('Details')

      const updateForm = ngMocks.findInstance(section, MemberUpdateFormComponent)
      expect(updateForm.member).toEqual(member)
    })

    it('should update member', () => {
      const updatedMember = new Member(
        'id',
        'url',
        'name',
        'desc',
        '2023-01-01',
        'role',
        MemberStatus.MEMBER_CANDIDATE,
        true
      )
      const update = new EventEmitter<Member>()
      MockInstance(MemberUpdateFormComponent, (instance) => ngMocks.stub(instance, { update }))
      const fixture = MockRender(MemberIdComponent)

      const section = ngMocks.find('section#details')

      const h2 = ngMocks.find(section, 'h2')
      expect(ngMocks.formatText(h2)).toBe('Details')

      const updateForm = ngMocks.findInstance(section, MemberUpdateFormComponent)
      expect(updateForm.member).toEqual(member)

      update.emit(updatedMember)
      fixture.detectChanges()

      expect(updateForm.member).toEqual(updatedMember)
      expect(fixture.point.componentInstance.member).toEqual(updatedMember)
    })
  })
})
