import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBreadcrumbComponent } from './event-breadcrumb.component';

describe('EventBreadcrumbComponent', () => {
  let component: EventBreadcrumbComponent;
  let fixture: ComponentFixture<EventBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventBreadcrumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    console.log(fixture.nativeElement);
  });
});
