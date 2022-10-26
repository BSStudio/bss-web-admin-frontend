import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { EventService } from '../services/event.service';
import { DetailedEvent } from '../models';

@Injectable({
  providedIn: 'root',
})
export class EventResolver implements Resolve<DetailedEvent> {
  constructor(private service: EventService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const eventId = route.paramMap.get('eventId');
    if (!eventId) return throwError(() => 'eventId is null');
    return this.service.getEvent(eventId);
  }
}
