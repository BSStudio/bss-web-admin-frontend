import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetailedCrewMember } from '../models';
import { DetailedVideo } from '../../video/models';

@Injectable({
  providedIn: 'root',
})
export class VideoCrewService {
  constructor(private http: HttpClient) {}

  getPositions() {
    return this.http.get<string[]>('/api/v1/videoCrew/position');
  }

  addVideoCrewMember(videoCrew: DetailedCrewMember) {
    return this.http.put<DetailedVideo>('/api/v1/videoCrew', null, { params: { ...videoCrew } });
  }
  removeVideoCrewMember(videoCrew: DetailedCrewMember) {
    return this.http.delete<DetailedVideo>('/api/v1/videoCrew', { params: { ...videoCrew } });
  }
}
