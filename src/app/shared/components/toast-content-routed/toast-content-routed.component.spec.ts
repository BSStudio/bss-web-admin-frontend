import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ToastContentRoutedComponent } from './toast-content-routed.component'

describe('NotificationContentRoutedComponent', () => {
  let component: ToastContentRoutedComponent
  let fixture: ComponentFixture<ToastContentRoutedComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastContentRoutedComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ToastContentRoutedComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
