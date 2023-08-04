import { Location } from '@angular/common'
import { RouterTestingModule } from '@angular/router/testing'
import { MockBuilder, MockRender, NG_MOCKS_ROOT_PROVIDERS, ngMocks } from 'ng-mocks'
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router'
import { EventResolver } from './event.resolver'
import { of } from 'rxjs'
import { fakeAsync, tick } from '@angular/core/testing'
import { EventModule } from '../event.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { EventService } from '../services/event.service'
import { DetailedEvent } from '../models'
import { EventIdComponent } from './event-id/event-id.component'

describe('EventResolver', () => {
  beforeEach(() =>
    MockBuilder(
      [
        EventResolver,
        RouterModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        NG_MOCKS_ROOT_PROVIDERS,
      ],
      EventModule,
    ),
  )

  it('should return event', fakeAsync(() => {
    const fixture = MockRender(RouterOutlet, {})
    const router: Router = fixture.point.injector.get(Router)
    const location: Location = fixture.point.injector.get(Location)
    const dataService: EventService = fixture.point.injector.get(EventService)

    // DataService has been replaced with a mock copy,
    // let's set a custom value we will assert later on.
    const eventId = 'eventId'
    const detailedEvent = new DetailedEvent(eventId, 'url', 'title', 'description', 'date', true, [])
    dataService.getEvent = () => of(detailedEvent)

    // Let's switch to the route with the resolver.
    location.go(`/${eventId}`)

    // Now we can initialize navigation.
    if (fixture.ngZone) {
      fixture.ngZone.run(() => router.initialNavigation())
      tick() // is needed for rendering of the current route.
    }

    // Checking that we are on the right page.
    expect(location.path()).toEqual(`/${eventId}`)

    // Let's extract ActivatedRoute of the current component.
    const el = ngMocks.find(EventIdComponent)
    const route: ActivatedRoute = el.injector.get(ActivatedRoute)

    // Now we can assert that it has expected data.
    expect(route.snapshot.data['event']).toEqual(detailedEvent)
  }))
})
