import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCrewAddModalComponent } from './video-crew-add-modal.component';

xdescribe('VideoCrewAddModalComponent', () => {
  let component: VideoCrewAddModalComponent;
  let fixture: ComponentFixture<VideoCrewAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoCrewAddModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoCrewAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
