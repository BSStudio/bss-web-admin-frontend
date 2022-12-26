import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EventRemoveButtonComponent } from './event-remove-button.component'

describe('EventRemoveButtonComponent', () => {
  let component: EventRemoveButtonComponent
  let fixture: ComponentFixture<EventRemoveButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventRemoveButtonComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EventRemoveButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
