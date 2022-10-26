import { TestBed } from '@angular/core/testing';

import { VideoService } from './video.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Pageable, PaginatedResponse, Sort } from '../../../shared/models';
import { Video } from '../models';
import { HttpClient } from '@angular/common/http';

describe('VideoService', () => {
  let service: VideoService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(VideoService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all videos', () => {
    const page = 1;
    const size = 2;
    const sort = new Sort(false, true, false);
    const pageable = new Pageable(sort, 2, page, size, true, false);
    const response = new PaginatedResponse<Video>([], pageable, false, 4, 20, size, 40, sort, false, 2, false);
    service.getVideos(page, size).subscribe({
      next: (videos) => {
        expect(videos).toBe(response);
      },
    });
    httpTestingController
      .expectOne({ method: 'GET', url: `/api/v1/video?page=${page}&size=${size}` }) //
      .flush(response);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
