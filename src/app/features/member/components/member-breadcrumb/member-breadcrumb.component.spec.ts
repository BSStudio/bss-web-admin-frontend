import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBreadcrumbComponent } from './member-breadcrumb.component';

describe('MemberBreadcrumbComponent', () => {
  let component: MemberBreadcrumbComponent;
  let fixture: ComponentFixture<MemberBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberBreadcrumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
