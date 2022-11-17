import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventVideoAddModalComponent } from './event-video-add-modal.component';

xdescribe('EventVideoAddModalComponent', () => {
  let component: EventVideoAddModalComponent;
  let fixture: ComponentFixture<EventVideoAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventVideoAddModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventVideoAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
