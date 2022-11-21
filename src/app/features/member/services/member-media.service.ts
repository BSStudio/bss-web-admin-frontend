import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MemberMediaService {
  constructor(private http: HttpClient) {}

  uploadPicture(memberId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`/media/api/v1/member/${memberId}/image`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
