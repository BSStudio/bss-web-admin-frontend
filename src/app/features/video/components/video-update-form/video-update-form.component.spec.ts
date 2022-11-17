import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUpdateFormComponent } from './video-update-form.component';

xdescribe('VideoUpdateFormComponent', () => {
  let component: VideoUpdateFormComponent;
  let fixture: ComponentFixture<VideoUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoUpdateFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
