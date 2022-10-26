import { TestBed } from '@angular/core/testing';

import { EventVideoService } from './event-video.service';

describe('EventVideoService', () => {
  let service: EventVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
