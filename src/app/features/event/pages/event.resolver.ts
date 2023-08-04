import { ActivatedRouteSnapshot } from '@angular/router'
import { Observable, throwError } from 'rxjs'
import { Injectable } from '@angular/core'
import { EventService } from '../services/event.service'
import { DetailedEvent } from '../models'

@Injectable({ providedIn: 'root' })
export class EventResolver {
  constructor(private service: EventService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<DetailedEvent> {
    const eventId = route.paramMap.get('eventId')
    if (!eventId) return throwError(() => 'eventId is null')
    return this.service.getEvent(eventId)
  }
}
