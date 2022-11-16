import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCrewTableComponent } from './video-crew-table.component';

describe('VideoCrewTableComponent', () => {
  let component: VideoCrewTableComponent;
  let fixture: ComponentFixture<VideoCrewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoCrewTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoCrewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
