import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRemoveButtonComponent } from './member-remove-button.component';

xdescribe('MemberRemoveButtonComponent', () => {
  let component: MemberRemoveButtonComponent;
  let fixture: ComponentFixture<MemberRemoveButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberRemoveButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MemberRemoveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
