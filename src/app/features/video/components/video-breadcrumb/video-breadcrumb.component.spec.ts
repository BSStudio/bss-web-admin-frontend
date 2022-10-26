import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoBreadcrumbComponent } from './video-breadcrumb.component';

describe('VideoBreadcrumbComponent', () => {
  let component: VideoBreadcrumbComponent;
  let fixture: ComponentFixture<VideoBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoBreadcrumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
