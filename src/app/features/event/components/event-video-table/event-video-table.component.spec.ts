import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventVideoTableComponent } from './event-video-table.component';

describe('EventVideoTableComponent', () => {
  let component: EventVideoTableComponent;
  let fixture: ComponentFixture<EventVideoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventVideoTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventVideoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
