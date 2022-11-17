import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberUpdateFormComponent } from './member-update-form.component';

xdescribe('MemberUpdateFormComponent', () => {
  let component: MemberUpdateFormComponent;
  let fixture: ComponentFixture<MemberUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberUpdateFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MemberUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
