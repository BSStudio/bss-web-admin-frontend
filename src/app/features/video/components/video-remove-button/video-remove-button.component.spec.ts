import { VideoRemoveButtonComponent } from './video-remove-button.component';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { VideoModule } from '../../video.module';
import {
  AlertModalData,
  AlertModalType,
  Button,
  IconDirective,
  IconModule,
  ModalButton,
  ModalButtonType,
  ModalService,
} from 'carbon-components-angular';
import { DetailedVideo } from '../../models';
import { VideoService } from '../../services/video.service';

describe('VideoRemoveButtonComponent', () => {
  beforeEach(() => MockBuilder(VideoRemoveButtonComponent, [VideoModule, IconModule]));
  const detailedVideo = new DetailedVideo('id', 'url', 'title', 'description', 'uploadedAt', true, []);

  it('should display remove button', () => {
    const fixture = MockRender(VideoRemoveButtonComponent, {
      video: detailedVideo,
    });
    expect(fixture.componentInstance.video).toEqual(detailedVideo);

    const button = ngMocks.findInstance(Button);
    expect(button.ibmButton).toBe('danger');

    const buttonText = ngMocks.find<HTMLSpanElement>('span');
    expect(buttonText.nativeElement.innerHTML).toBe('Remove');

    const svgIcon = ngMocks.find('svg');
    expect(Object.keys(svgIcon.classes)).toEqual(['bx--btn__icon']);

    const iconDirective = ngMocks.findInstance(svgIcon, IconDirective);
    expect(iconDirective.ibmIcon).toBe('delete');
    expect(iconDirective.size).toBe('16');
  });

  it('should show a remove modal on click', () => {
    const fixture = MockRender(VideoRemoveButtonComponent, {
      video: detailedVideo,
    });

    ngMocks.click('button');

    const modalService = ngMocks.findInstance(ModalService);
    const videoService = ngMocks.findInstance(VideoService);
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
    };
    expect(modalService.show).toHaveBeenCalledOnceWith(modalData);
    expect(videoService.removeVideo).not.toHaveBeenCalled();
  });

  xit('should press remove', () => {
    const videoService = ngMocks.findInstance(VideoService);
    expect(videoService.removeVideo).toHaveBeenCalledOnceWith(detailedVideo.id);
  });
});
