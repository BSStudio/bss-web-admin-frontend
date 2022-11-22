import { EventService } from './event.service';
import { MockBuilder, ngMocks } from 'ng-mocks';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { tap } from 'rxjs';
import { CreateEvent, DetailedEvent, Event, UpdateEvent } from '../models';

describe('EventService', () => {
  ngMocks.faster();

  beforeAll(() => MockBuilder([EventService, HttpClientTestingModule]));
  const eventId = 'eventId';
  const createEvent = new CreateEvent('url', 'title');
  const updateEvent = new UpdateEvent('url', 'title', 'description', 'date', true);
  const event = new Event(eventId, 'url', 'title', 'description', 'date', true);
  const detailedEvent = new DetailedEvent(eventId, 'url', 'title', 'description', 'date', true, []);

  it('should get event', (done) => {
    const service = ngMocks.findInstance(EventService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service
      .getEvent(eventId)
      .pipe(tap((actual) => expect(actual).toEqual(detailedEvent)))
      .subscribe({ complete: () => done() });

    httpMock.expectOne((req) => req.method === 'GET' && req.url === `/api/v1/event/${eventId}`).flush(detailedEvent);
    httpMock.verify();
  });

  it('should get all events', (done) => {
    const service = ngMocks.findInstance(EventService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service
      .getEvents()
      .pipe(tap((actual) => expect(actual).toEqual([event])))
      .subscribe({ complete: () => done() });

    httpMock.expectOne((req) => req.method === 'GET' && req.url === `/api/v1/event`).flush([event]);
    httpMock.verify();
  });

  it('should create an event', (done) => {
    const service = ngMocks.findInstance(EventService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service
      .createEvent(createEvent)
      .pipe(tap((actual) => expect(actual).toEqual(event)))
      .subscribe({ complete: () => done() });

    httpMock.expectOne((req) => req.method === 'POST' && req.url === `/api/v1/event`).flush(event);
    httpMock.verify();
  });

  it('should update an event', (done) => {
    const service = ngMocks.findInstance(EventService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service
      .updateEvent(eventId, updateEvent)
      .pipe(tap((actual) => expect(actual).toEqual(detailedEvent)))
      .subscribe({ complete: () => done() });

    httpMock.expectOne((req) => req.method === 'PUT' && req.url === `/api/v1/event/${eventId}`).flush(detailedEvent);
    httpMock.verify();
  });

  it('should delete an event', (done) => {
    const service = ngMocks.findInstance(EventService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service
      .deleteEvent(eventId)
      .pipe(tap(() => expect().nothing()))
      .subscribe({ complete: () => done() });

    httpMock.expectOne((req) => req.method === 'DELETE' && req.url === `/api/v1/event/${eventId}`).flush(null);
    httpMock.verify();
  });
});
