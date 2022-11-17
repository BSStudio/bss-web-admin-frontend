import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProfilePictureComponent } from './member-profile-picture.component';

xdescribe('MemberProfilePictureComponent', () => {
  let component: MemberProfilePictureComponent;
  let fixture: ComponentFixture<MemberProfilePictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberProfilePictureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MemberProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
