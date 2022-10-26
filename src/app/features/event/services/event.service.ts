import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateEvent, DetailedEvent, Event, UpdateEvent } from '../models';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getEvent(eventId: string) {
    return this.http.get<DetailedEvent>(`/api/event/${eventId}`);
  }

  getEvents() {
    return this.http.get<Event[]>('/api/event');
  }

  createEvent(createEvent: CreateEvent) {
    return this.http.post<Event>('/api/event', createEvent);
  }

  updateEvent(eventId: string, updateEvent: UpdateEvent) {
    return this.http.put<DetailedEvent>(`/api/event/${eventId}`, updateEvent);
  }

  deleteEvent(eventId: string) {
    return this.http.delete(`/api/event/${eventId}`);
  }
}
