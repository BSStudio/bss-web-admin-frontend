import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProfilePictureUploadComponent } from './member-profile-picture-upload.component';

xdescribe('MemberProfilePictureUploadComponent', () => {
  let component: MemberProfilePictureUploadComponent;
  let fixture: ComponentFixture<MemberProfilePictureUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberProfilePictureUploadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MemberProfilePictureUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
