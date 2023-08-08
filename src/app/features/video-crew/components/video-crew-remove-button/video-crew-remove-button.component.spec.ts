import { VideoCrewRemoveButtonComponent } from './video-crew-remove-button.component'
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { VideoCrewModule } from '../../video-crew.module'
import { CrewMember } from '../../models'
import {
  AlertModalType,
  Button,
  IconDirective,
  ModalButtonType,
  ModalService,
  NotificationService,
} from 'carbon-components-angular'
import { SimpleMember } from '../../../member/models'
import { VideoCrewService } from '../../services/video-crew.service'
import { of, throwError } from 'rxjs'
import { DetailedVideo } from '../../../video/models'

describe('VideoCrewRemoveButtonComponent', () => {
  const member = new SimpleMember('id', 'name', 'nickname')
  const crewMember = new CrewMember('position', 'videoId', member)
  const detailedVideo = new DetailedVideo('id', 'url', 'title', 'description', 'uploadedAt', true, [])
  beforeEach(() => MockBuilder(VideoCrewRemoveButtonComponent, VideoCrewModule))

  it('should create', () => {
    const fixture = MockRender(VideoCrewRemoveButtonComponent, { crewMember })
    expect(fixture.point.componentInstance.crewMember).toEqual(crewMember)

    const button = ngMocks.find('button')
    expect(ngMocks.formatText(button)).toBe(
      `Remove ${crewMember.member.name}'s ${crewMember.position} position from the video`,
    )
    const buttonDirective = ngMocks.findInstance(button, Button)

    expect(buttonDirective.cdsButton).toBe('danger--ghost')
    expect(buttonDirective.size).toBe('field')
    expect(buttonDirective.iconOnly).toBeTrue()
    const svg = ngMocks.find(button, 'svg.cds--btn__icon')
    const icon = ngMocks.findInstance(svg, IconDirective)

    expect(icon.cdsIcon).toBe('delete')
    expect(icon.size).toBe('16')
  })

  it('should show confirm modal', () => {
    MockRender(VideoCrewRemoveButtonComponent, { crewMember })

    const button = ngMocks.find('button')

    ngMocks.click(button)

    const modalService = ngMocks.findInstance(ModalService)
    expect(modalService.show).toHaveBeenCalledOnceWith({
      type: AlertModalType.danger,
      label: `${crewMember.member.name} | ${crewMember.position}`,
      title: 'Remove crew member position from video',
      size: 'xs',
      content: "Are you sure you want to remove this member's position from the crew?",
      buttons: [
        { type: ModalButtonType.secondary, text: 'Close' },
        {
          type: ModalButtonType.danger,
          text: 'Remove',
          click: jasmine.any(Function),
        },
      ],
    })
  })

  xit('should show confirm modal and click remove', () => {
    MockInstance(VideoCrewService, 'removeVideoCrewMember', () => of(detailedVideo))
    MockRender(VideoCrewRemoveButtonComponent, { crewMember })

    const button = ngMocks.find('button')

    ngMocks.click(button)

    // expect to emit

    const notificationService = ngMocks.findInstance(NotificationService)
    expect(notificationService.showToast).toHaveBeenCalledOnceWith({
      type: 'success',
      title: ``,
    })
  })

  xit('should show confirm modal and click remove returning error', () => {
    MockInstance(VideoCrewService, 'removeVideoCrewMember', () => throwError(() => new Error()))
    MockRender(VideoCrewRemoveButtonComponent, { crewMember })

    const button = ngMocks.find('button')

    ngMocks.click(button)
    const notificationService = ngMocks.findInstance(NotificationService)
    expect(notificationService.showToast).toHaveBeenCalledOnceWith({ type: 'error', title: '' })
  })
})
