import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateVideo, DetailedVideo, PaginatedResponse, UpdateVideo, Video } from './video.model';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {}

  private static readonly defaultConfig = {
    headers: new HttpHeaders({
      'application-secret': 'appSecret',
    }),
  };

  getVideos(page: number, size: number) {
    return this.http.get<PaginatedResponse<Video>>('/api/video', {
      ...VideoService.defaultConfig,
      params: { page, size },
    });
  }

  getVideo(videoId: string) {
    return this.http.get<DetailedVideo>(`/api/video/${videoId}`, VideoService.defaultConfig);
  }

  createVideo(createVideo: CreateVideo) {
    return this.http.post<Video>('/api/video', createVideo, VideoService.defaultConfig);
  }

  changeVisibility(videoIds: string | string[], visible = false) {
    return this.http.put<string[]>('/api/video/visible', null, {
      ...VideoService.defaultConfig,
      params: { videoIds, visible },
    });
  }

  updateVideo(videoId: string, updateVideo: UpdateVideo) {
    return this.http.put<DetailedVideo>(`/api/video/${videoId}`, updateVideo, VideoService.defaultConfig);
  }

  removeVideo(videoId: string) {
    return this.http.delete(`/api/video/${videoId}`, VideoService.defaultConfig);
  }
}
