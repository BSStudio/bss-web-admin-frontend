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

export interface SimpleCrew {
  position: string;
}

export interface PaginatedResponse<T> {
  totalElements: number;
  totalPages: number;
  data: T[];
}
