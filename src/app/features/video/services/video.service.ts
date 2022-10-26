import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginatedResponse } from '../../../shared/models';
import { CreateVideo, DetailedVideo, UpdateVideo, Video } from '../models';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {}

  getAllVideos() {
    return this.http.get<Video[]>('/api/v1/video/all');
  }

  getVideos(page: number, size: number) {
    return this.http.get<PaginatedResponse<Video>>('/api/v1/video', { params: { page, size } });
  }

  getVideo(videoId: string) {
    return this.http.get<DetailedVideo>(`/api/v1/video/${videoId}`);
  }

  createVideo(createVideo: CreateVideo) {
    return this.http.post<Video>('/api/v1/video', createVideo);
  }

  changeVisibility(videoIds: string | string[], visible = false) {
    return this.http.put<string[]>('/api/v1/video/visible', null, { params: { videoIds, visible } });
  }

  updateVideo(videoId: string, updateVideo: UpdateVideo) {
    return this.http.put<DetailedVideo>(`/api/v1/video/${videoId}`, updateVideo);
  }

  removeVideo(videoId: string) {
    return this.http.delete(`/api/v1/video/${videoId}`);
  }
}
