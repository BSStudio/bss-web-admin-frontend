import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Video {
  id: string;
  url: string;
  title: string;
  uploadedAt: string;
  visible: boolean;
}
export interface CreateVideo {
  url: string;
  title: string;
}
export interface UpdateVideo {
  url: string;
  title: string;
  description: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  uploadedAt: string;
  visible: boolean;
}
export interface DetailedVideo {
  id: string;
  url: string;
  title: string;
  description: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  uploadedAt: string;
  visible: boolean;
  crew: SimpleCrew[];
}

interface SimpleCrew {
  position: string;
}

export interface PaginatedResponse<T> {
  totalElements: number;
  totalPages: number;
  data: T[];
}

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {}

  getVideos(page: number, size: number) {
    return this.http.get<PaginatedResponse<Video>>('/api/video', {
      params: { page, size },
    });
  }

  getVideo(videoId: string) {
    return this.http.get<DetailedVideo>(`/api/video/${videoId}`);
  }

  createVideo(createVideo: CreateVideo) {
    return this.http.post<Video>('/api/video', createVideo);
  }

  changeVisibility(videoIds: string | string[], visible = false) {
    return this.http.put<string[]>('/api/video/visible', null, {
      params: { videoIds, visible },
    });
  }

  updateVideo(videoId: string, updateVideo: UpdateVideo) {
    return this.http.put<DetailedVideo>(`/api/video/${videoId}`, updateVideo);
  }

  removeVideo(videoId: string) {
    return this.http.delete(`/api/video/${videoId}`);
  }
}
