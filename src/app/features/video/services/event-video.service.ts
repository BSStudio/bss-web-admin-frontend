import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetailedEvent } from '../../event/models';
import { EventVideo } from '../models/event-video.model';

@Injectable({ providedIn: 'root' })
export class EventVideoService {
  constructor(private http: HttpClient) {}

  addVideoToEvent(eventVideo: EventVideo) {
    return this.http.post<DetailedEvent>('/api/v1/eventVideo', null, { params: { ...eventVideo } });
  }

  removeVideoFromEvent(eventVideo: EventVideo) {
    return this.http.delete<DetailedEvent>('/api/v1/eventVideo', { params: { ...eventVideo } });
  }
}
