import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreateModalComponent } from './event-create-modal.component';

xdescribe('EventCreateModalComponent', () => {
  let component: EventCreateModalComponent;
  let fixture: ComponentFixture<EventCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventCreateModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
