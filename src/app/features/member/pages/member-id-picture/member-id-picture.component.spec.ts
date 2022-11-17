import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberIdPictureComponent } from './member-id-picture.component';

xdescribe('MemberIdPictureComponent', () => {
  let component: MemberIdPictureComponent;
  let fixture: ComponentFixture<MemberIdPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberIdPictureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MemberIdPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
