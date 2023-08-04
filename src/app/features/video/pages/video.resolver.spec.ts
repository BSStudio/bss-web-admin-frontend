import { MockBuilder, MockRender, NG_MOCKS_ROOT_PROVIDERS, ngMocks } from 'ng-mocks'
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { Location } from '@angular/common'
import { VideoResolver } from './video.resolver'
import { VideoService } from '../services/video.service'
import { of } from 'rxjs'
import { DetailedVideo } from '../models'
import { fakeAsync, tick } from '@angular/core/testing'
import { VideoIdComponent } from './video-id/video-id.component'
import { VideoModule } from '../video.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('VideoResolver', () => {
  beforeEach(() =>
    MockBuilder(
      [
        VideoResolver,
        RouterModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        NG_MOCKS_ROOT_PROVIDERS,
      ],
      VideoModule,
    ),
  )

  it('should return video', fakeAsync(() => {
    const fixture = MockRender(RouterOutlet, {})
    const router: Router = fixture.point.injector.get(Router)
    const location: Location = fixture.point.injector.get(Location)
    const dataService: VideoService = fixture.point.injector.get(VideoService)

    // DataService has been replaced with a mock copy,
    // let's set a custom value we will assert later on.
    const videoId = 'videoId'
    const detailedVideo = new DetailedVideo(videoId, 'url', 'title', 'description', 'uploadedAt', true, [])
    dataService.getVideo = () => of(detailedVideo)

    // Let's switch to the route with the resolver.
    location.go(`/${videoId}`)

    // Now we can initialize navigation.
    if (fixture.ngZone) {
      fixture.ngZone.run(() => router.initialNavigation())
      tick() // is needed for rendering of the current route.
    }

    // Checking that we are on the right page.
    expect(location.path()).toEqual(`/${videoId}`)

    // Let's extract ActivatedRoute of the current component.
    const el = ngMocks.find(VideoIdComponent)
    const route: ActivatedRoute = el.injector.get(ActivatedRoute)

    // Now we can assert that it has expected data.
    expect(route.snapshot.data['video']).toEqual(detailedVideo)
  }))
})
