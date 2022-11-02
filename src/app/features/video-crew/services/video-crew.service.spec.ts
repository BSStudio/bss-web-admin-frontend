import { TestBed } from '@angular/core/testing';

import { VideoCrewService } from './video-crew.service';

describe('VideoCrewService', () => {
  let service: VideoCrewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoCrewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
