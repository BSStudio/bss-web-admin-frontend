import { MockBuilder, MockRender, ngMocks } from 'ng-mocks'
import { VideoPlayerDirective } from './video-player.directive'

describe('VideoPlayerDirective', () => {
  beforeEach(() => MockBuilder(VideoPlayerDirective))
  const src = 'https://bsstudio/media/v/{id}/main.m3u8'
  const poster = 'https://bsstudio/media/v/{id}/poster/image.jpg'
  const fallbackPoster = '/assets/fallback-poster.png'
  it('should render with fallback poster', () => {
    const fixture = MockRender(`<video [src]="src" appVideoPlayer></video>`, { src })

    const video = ngMocks.find('video')
    const videoPlayer = ngMocks.get(video, VideoPlayerDirective)

    console.log(fixture.nativeElement.innerHTML)
    expect((<HTMLVideoElement>video.nativeElement).controls).toBeTrue()
    expect((<HTMLVideoElement>video.nativeElement).preload).toBe('metadata')
    expect((<HTMLVideoElement>video.nativeElement).src).not.toEqual(src)
    expect(videoPlayer.poster).toBe(fallbackPoster)
    expect(videoPlayer.src).toBe(src)
  })
  it('should render with poster defined', () => {
    MockRender(`<video [src]="src" [poster]="poster" appVideoPlayer></video>`, {
      src,
      poster,
    })

    const video = ngMocks.find('video')
    const videoPlayer = ngMocks.get(video, VideoPlayerDirective)

    expect((<HTMLVideoElement>video.nativeElement).controls).toBeTrue()
    expect((<HTMLVideoElement>video.nativeElement).preload).toBe('metadata')
    expect((<HTMLVideoElement>video.nativeElement).src).not.toEqual(src)
    expect(videoPlayer.poster).toBe(poster)
    expect(videoPlayer.src).toBe(src)
  })
})
