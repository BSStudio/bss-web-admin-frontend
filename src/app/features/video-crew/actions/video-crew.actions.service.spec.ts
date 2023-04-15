import { VideoCrewActionsService } from './video-crew.actions.service'
import { MockBuilder, MockInstance, ngMocks } from 'ng-mocks'
import { VideoCrewModule } from '../video-crew.module'
import { DetailedCrewMember } from '../models'
import { VideoCrewService } from '../services/video-crew.service'
import { of, throwError } from 'rxjs'
import { NotificationService } from 'carbon-components-angular'
import { DetailedVideo } from '../../video/models'

describe('VideoCrewActionsService', () => {
  ngMocks.faster()
  beforeEach(() => MockBuilder(VideoCrewActionsService, VideoCrewModule))

  const videoCrew: DetailedCrewMember = {
    videoId: 'videoId',
    position: 'position',
    memberId: 'memberId',
  }
  const memberName = 'memberName'
  const video = new DetailedVideo('videoId', 'url', 'title', 'description', 'uploadedAt', true, [])

  it('should remove a crew member and show a success notification', (done) => {
    MockInstance(VideoCrewService, 'removeVideoCrewMember', () => of(video))

    ngMocks
      .findInstance(VideoCrewActionsService)
      .removeCrewMember(videoCrew, memberName)
      .subscribe((returnedVideo) => {
        expect(returnedVideo).toEqual(video)
        done()
      })

    expect(ngMocks.findInstance(NotificationService).showToast).toHaveBeenCalledOnceWith({
      type: 'success',
      title: `${memberName}'s ${videoCrew.position} position`,
      subtitle: video.title,
      caption: 'Crew member position was successfully removed',
      message: 'Crew member position was successfully removed',
      smart: true,
    })
  })

  it('should handle errors and show an error notification', (done) => {
    MockInstance(VideoCrewService, 'removeVideoCrewMember', () => throwError(() => new Error('Test error')))

    ngMocks
      .findInstance(VideoCrewActionsService)
      .removeCrewMember(videoCrew, memberName)
      .subscribe({
        error: () => {
          done()
        },
      })

    expect(ngMocks.findInstance(NotificationService).showToast).toHaveBeenCalledOnceWith({
      type: 'error',
      title: 'Error removing crew member',
      caption: "Couldn't remove crew member position. Try refreshing the page",
      message: "Couldn't remove crew member position. Try refreshing the page",
      smart: true,
    })
  })
})
