import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { VideoIdComponent } from './video-id.component'
import { VideoModule } from '../../video.module'
import { DetailedVideo } from '../../models'
import { RouterTestingModule } from '@angular/router/testing'
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router'
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component'
import { VideoUpdateFormComponent } from '../../components/video-update-form/video-update-form.component'
import { EventEmitter } from '@angular/core'
import { VideoCrewTableComponent } from '../../../video-crew/components/video-crew-table/video-crew-table.component'
import { VideoPlayerDirective } from '../../directives/video-player/video-player.directive'
import { VideoRemoveButtonComponent } from '../../components/video-remove-button/video-remove-button.component'

describe('VideoIdComponent', () => {
  const detailedVideo = new DetailedVideo('id', 'url', 'title', 'description', '2022-01-01', true, [])
  const updatedDetailedVideo = new DetailedVideo('id', 'url', 'title', 'description', '2023-01-01', false, [])
  const fakeRoute = {
    snapshot: {
      data: {
        video: detailedVideo,
      },
    } as Partial<ActivatedRouteSnapshot>,
  } as ActivatedRoute
  beforeEach(() => MockBuilder([VideoIdComponent, RouterTestingModule], VideoModule).mock(ActivatedRoute, fakeRoute))

  it('should render', () => {
    const fixture = MockRender(VideoIdComponent)
    expect(fixture.point.componentInstance.video).toEqual(detailedVideo)
  })

  it('should have a breadcrumb', () => {
    MockRender(VideoIdComponent)
    const breadcrumbComponent = ngMocks.findInstance(BreadcrumbComponent)
    expect(breadcrumbComponent.title).toEqual(detailedVideo.title)
    expect(breadcrumbComponent.parentRoute).toEqual('video')
    expect(breadcrumbComponent.parentTitle).toEqual('Videos')
  })

  it('should have a header', () => {
    MockRender(VideoIdComponent)
    const div = ngMocks.find('div#video-title')
    const h1 = ngMocks.find(div, 'h1')

    expect(ngMocks.formatText(h1)).toEqual('Update video')
    const videoRemoveButton = ngMocks.findInstance(div, VideoRemoveButtonComponent)
    expect(videoRemoveButton.video).toEqual(detailedVideo)
  })

  describe('metadata section', () => {
    it('should render', () => {
      MockRender(VideoIdComponent)

      const section = ngMocks.find('section#video-update-metadata')

      const h2 = ngMocks.find(section, 'h2')
      expect(ngMocks.formatText(h2)).toEqual('Metadata')

      const updateForm = ngMocks.findInstance(section, VideoUpdateFormComponent)
      expect(updateForm.video).toEqual(detailedVideo)
    })

    it('should update video on update', () => {
      const update = new EventEmitter<DetailedVideo>()
      MockInstance(VideoUpdateFormComponent, (instance) =>
        ngMocks.stub(instance, {
          update,
        }),
      )
      const fixture = MockRender(VideoIdComponent)

      const section = ngMocks.find('section#video-update-metadata')

      const updateForm = ngMocks.findInstance(section, VideoUpdateFormComponent)
      expect(updateForm.video).toEqual(detailedVideo)

      update.emit(updatedDetailedVideo)
      fixture.detectChanges()

      expect(updateForm.video).toEqual(updatedDetailedVideo)
      expect(fixture.point.componentInstance.video).toEqual(updatedDetailedVideo)
    })
  })

  describe('video crew section', () => {
    it('should render', () => {
      MockRender(VideoIdComponent)

      const section = ngMocks.find('section#video-crew')
      const videoCrewTable = ngMocks.findInstance(section, VideoCrewTableComponent)

      expect(videoCrewTable.video).toEqual(detailedVideo)
    })

    it('should update video on update', () => {
      const update = new EventEmitter<DetailedVideo>()
      MockInstance(VideoCrewTableComponent, (instance) =>
        ngMocks.stub(instance, {
          update,
        }),
      )
      const fixture = MockRender(VideoIdComponent)

      const section = ngMocks.find('section#video-crew')

      const videoCrewTable = ngMocks.findInstance(section, VideoCrewTableComponent)
      expect(videoCrewTable.video).toEqual(detailedVideo)

      update.emit(updatedDetailedVideo)
      fixture.detectChanges()

      expect(videoCrewTable.video).toEqual(updatedDetailedVideo)
      expect(fixture.point.componentInstance.video).toEqual(updatedDetailedVideo)
    })
  })

  describe('video inspect section', () => {
    it('should render', () => {
      MockRender(VideoIdComponent)

      const section = ngMocks.find('section#video-inspect')

      const h2 = ngMocks.find(section, 'h2')
      expect(ngMocks.formatText(h2)).toEqual('Inspect video')

      const video = ngMocks.find(section, 'video')
      expect((<HTMLVideoElement>video.nativeElement).width).toBe(720)

      const videoPlayerDirective = ngMocks.findInstance(VideoPlayerDirective)
      expect(videoPlayerDirective.src).toBe(
        'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8',
      )
    })
  })
})
