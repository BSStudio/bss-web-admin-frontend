import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { EventResolver } from './event.resolver';
import { DetailedEvent } from '../models';
import { EventService } from '../services/event.service';
import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { EventIdComponent } from './event-id/event-id.component';
import { EventModule } from '../event.module';

describe('EventResolver', () => {
  const eventId = 'eventId';
  const detailedEvent = new DetailedEvent(eventId, 'url', 'title', 'description', 'date', true, []);
  beforeEach(() => MockBuilder([EventResolver, RouterModule, RouterTestingModule.withRoutes([])], EventModule));

  xit('should return event', fakeAsync(() => {
    const fixture = MockRender(RouterOutlet, {});
    const router: Router = fixture.point.injector.get(Router);
    const location = fixture.point.injector.get(Location);
    const eventService = fixture.point.injector.get(EventService);
    eventService.getEvent = () => of(detailedEvent);

    location.go(`/${eventId}`);

    if (fixture.ngZone) {
      fixture.ngZone.run(() => router.initialNavigation());
      tick();
    }

    expect(location.path()).toEqual(`/${eventId}`);

    const el = ngMocks.find(EventIdComponent);
    const route = el.injector.get(ActivatedRoute);
    expect(route.snapshot.data['event']).toEqual(detailedEvent);
  }));
});
