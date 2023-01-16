import { VideoRemoveButtonComponent } from './video-remove-button.component'
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { VideoModule } from '../../video.module'
import {
  AlertModalData,
  AlertModalType,
  Button,
  IconDirective,
  IconModule,
  ModalButton,
  ModalButtonType,
  ModalService,
  NotificationService,
} from 'carbon-components-angular'
import { DetailedVideo } from '../../models'
import { VideoService } from '../../services/video.service'
import { Router } from '@angular/router'
import { of, throwError } from 'rxjs'
import { fakeAsync, tick } from '@angular/core/testing'

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
    const videoService = ngMocks.findInstance(VideoService)
    const modalData: AlertModalData = {
      type: AlertModalType.danger,
      label: detailedVideo.title,
      title: 'Remove video',
      size: 'xs',
      content: 'Are you sure you want to remove this video?',
      buttons: [
        { type: ModalButtonType.secondary, text: 'Close' },
        { type: ModalButtonType.danger, text: 'Remove', click: jasmine.any(Function) } as unknown as ModalButton,
      ],
    }
    expect(modalService.show).toHaveBeenCalledOnceWith(modalData)
    expect(videoService.removeVideo).not.toHaveBeenCalled()
  })

  describe('on remove button press', () => {
    it('should navigate to videos and show success notification on success', fakeAsync(() => {
      MockInstance(ModalService, 'show', ({ buttons }) => buttons?.[1]?.click?.())
      MockInstance(VideoService, 'removeVideo', () => of(void 0))
      const navigate = jasmine.createSpy('navigate').and.resolveTo(true)
      MockInstance(Router, 'navigate', navigate)
      MockRender(VideoRemoveButtonComponent, { video: detailedVideo })
      const notificationService = ngMocks.findInstance(NotificationService)
      const router = ngMocks.findInstance(Router)

      ngMocks.click('button')
      tick()

      expect(router.navigate).toHaveBeenCalledOnceWith(['video'])
      expect(notificationService.showNotification).toHaveBeenCalledOnceWith({
        type: 'success',
        title: 'Video was removed',
        message: detailedVideo.title,
        smart: true,
      })
    }))

    it('should show error notification on error', fakeAsync(() => {
      MockInstance(ModalService, 'show', ({ buttons }) => buttons?.[1]?.click?.())
      MockInstance(VideoService, 'removeVideo', (id) => throwError(() => new Error(id)))
      MockRender(VideoRemoveButtonComponent, { video: detailedVideo })
      const notificationService = ngMocks.findInstance(NotificationService)

      ngMocks.click('button')
      tick()

      expect(notificationService.showToast).toHaveBeenCalledOnceWith({
        type: 'error',
        title: 'Error removing',
        subtitle: detailedVideo.title,
        caption: 'Remove crew members first',
        message: 'Remove crew members first',
        smart: true,
      })
    }))
  })
})
