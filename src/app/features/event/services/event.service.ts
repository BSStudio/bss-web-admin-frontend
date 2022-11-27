import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateEvent, DetailedEvent, Event, UpdateEvent } from '../models';

@Injectable({ providedIn: 'root' })
export class EventService {
  constructor(private http: HttpClient) {}

  getEvent(eventId: string) {
    return this.http.get<DetailedEvent>(`/api/v1/event/${eventId}`);
  }

  getEvents() {
    return this.http.get<Event[]>('/api/v1/event');
  }

  createEvent(createEvent: CreateEvent) {
    return this.http.post<Event>('/api/v1/event', createEvent);
  }

  updateEvent(eventId: string, updateEvent: UpdateEvent) {
    return this.http.put<DetailedEvent>(`/api/v1/event/${eventId}`, updateEvent);
  }

  deleteEvent(eventId: string) {
    return this.http.delete<void>(`/api/v1/event/${eventId}`);
  }
}
