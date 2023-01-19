import { VideoActionsService } from './video.actions.service'
import { MockBuilder, MockInstance, ngMocks } from 'ng-mocks'
import { VideoModule } from '../video.module'
import { DetailedVideo, UpdateVideo, Video } from '../models'
import { VideoService } from '../services/video.service'
import { of, throwError } from 'rxjs'
import { NotificationService } from 'carbon-components-angular'

describe('VideoActionsService', () => {
  ngMocks.faster()
  beforeEach(() => MockBuilder(VideoActionsService, VideoModule))

  const video = new Video('videoId', 'url', 'title', 'uploadedAt', true)
  const updateVideo = new UpdateVideo('url', 'title', 'description', 'uploadedAt', true)
  const detailedVideo = new DetailedVideo('videoId', 'url', 'title', 'description', 'uploadedAt', true, [])

  it('updateSuccessToast', (done) => {
    MockInstance(VideoService, 'updateVideo', () => of(detailedVideo))
    ngMocks
      .findInstance(VideoActionsService)
      .updateVideo(video.id, updateVideo)
      .subscribe(() => done())
    expect(ngMocks.findInstance(NotificationService).showToast).toHaveBeenCalledOnceWith({
      type: 'success',
      title: 'Video updated',
      subtitle: video.title,
      caption: 'Changes were saved',
      message: 'Changes were saved',
      smart: true,
    })
  })
  it('updateErrorToast', (done) => {
    MockInstance(VideoService, 'updateVideo', () => throwError(() => new Error()))
    ngMocks
      .findInstance(VideoActionsService)
      .updateVideo(video.id, updateVideo)
      .subscribe({ complete: () => done() })
    expect(ngMocks.findInstance(NotificationService).showToast).toHaveBeenCalledOnceWith({
      type: 'error',
      title: 'Error updating',
      caption: 'Make sure everything is well formatted, and there are no duplicate ids',
      message: 'Make sure everything is well formatted, and there are no duplicate ids',
      smart: true,
    })
  })
  it('removeSuccessNotification', (done) => {
    MockInstance(VideoService, 'removeVideo', () => of(void 0))
    ngMocks
      .findInstance(VideoActionsService)
      .removeVideo(detailedVideo)
      .subscribe(() => done())
    expect(ngMocks.findInstance(NotificationService).showNotification).toHaveBeenCalledOnceWith({
      type: 'success',
      title: 'Video was removed',
      message: video.title,
      smart: true,
    })
  })
  it('removeErrorToast', (done) => {
    MockInstance(VideoService, 'removeVideo', () => throwError(() => new Error()))
    ngMocks
      .findInstance(VideoActionsService)
      .removeVideo(detailedVideo)
      .subscribe({ complete: () => done() })
    expect(ngMocks.findInstance(NotificationService).showToast).toHaveBeenCalledOnceWith({
      type: 'error',
      title: 'Error removing',
      subtitle: video.title,
      caption: 'Remove crew members first',
      message: 'Remove crew members first',
      smart: true,
    })
  })
})
