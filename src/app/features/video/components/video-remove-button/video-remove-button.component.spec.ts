import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoRemoveButtonComponent } from './video-remove-button.component';

describe('VideoRemoveButtonComponent', () => {
  let component: VideoRemoveButtonComponent;
  let fixture: ComponentFixture<VideoRemoveButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoRemoveButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoRemoveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
