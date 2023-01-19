import { VideoRemoveButtonComponent } from './video-remove-button.component'
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { VideoModule } from '../../video.module'
import {
  AlertModalType,
  Button,
  IconDirective,
  IconModule,
  ModalButtonType,
  ModalService,
} from 'carbon-components-angular'
import { DetailedVideo } from '../../models'
import { Router } from '@angular/router'
import { of } from 'rxjs'
import { fakeAsync, tick } from '@angular/core/testing'
import { VideoActionsService } from '../../actions/video.actions.service'

describe('VideoRemoveButtonComponent', () => {
  beforeEach(() => MockBuilder(VideoRemoveButtonComponent, [VideoModule, IconModule]))
  const detailedVideo = new DetailedVideo('id', 'url', 'title', 'description', 'uploadedAt', true, [])

  it('should display remove button', () => {
    const fixture = MockRender(VideoRemoveButtonComponent, {
      video: detailedVideo,
    })
    expect(fixture.componentInstance.video).toEqual(detailedVideo)

    const button = ngMocks.findInstance(Button)
    expect(button.ibmButton).toBe('danger--tertiary')

    const buttonText = ngMocks.find<HTMLSpanElement>('span')
    expect(buttonText.nativeElement.innerHTML).toBe('Remove')

    const svgIcon = ngMocks.find('svg')
    expect(Object.keys(svgIcon.classes)).toEqual(['bx--btn__icon'])

    const iconDirective = ngMocks.findInstance(svgIcon, IconDirective)
    expect(iconDirective.ibmIcon).toBe('delete')
    expect(iconDirective.size).toBe('16')
  })

  it('should show a remove modal on click', () => {
    MockRender(VideoRemoveButtonComponent, { video: detailedVideo })

    ngMocks.click('button')

    const modalService = ngMocks.findInstance(ModalService)
    expect(modalService.show).toHaveBeenCalledOnceWith({
      type: AlertModalType.danger,
      label: detailedVideo.title,
      title: 'Remove video',
      size: 'xs',
      content: 'Are you sure you want to remove this video?',
      buttons: [
        { type: ModalButtonType.secondary, text: 'Close' },
        { type: ModalButtonType.danger, text: 'Remove', click: jasmine.any(Function) },
      ],
    })
  })

  describe('on remove button press', () => {
    it('should navigate to videos and show success notification on success', fakeAsync(() => {
      const navigate = jasmine.createSpy('navigate').and.resolveTo(true)
      MockInstance(Router, 'navigate', navigate)
      MockInstance(ModalService, 'show', ({ buttons }) => buttons?.[1]?.click?.())
      MockInstance(VideoActionsService, 'removeVideo', () => of(void 0))
      MockRender(VideoRemoveButtonComponent, { video: detailedVideo })

      ngMocks.click('button')
      tick()

      expect(navigate).toHaveBeenCalledOnceWith(['video'])
    }))
  })
})
