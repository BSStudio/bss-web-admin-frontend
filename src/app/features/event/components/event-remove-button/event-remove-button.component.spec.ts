import { EventRemoveButtonComponent } from './event-remove-button.component'
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { EventModule } from '../../event.module'
import { AlertModalType, Button, ModalButtonType, ModalService } from 'carbon-components-angular'
import { Event } from '../../models'
import { Router } from '@angular/router'
import { EventActionsService } from '../../actions/event.actions.service'
import { of } from 'rxjs'

describe('EventRemoveButtonComponent', () => {
  beforeEach(() => MockBuilder(EventRemoveButtonComponent, EventModule))

  const event = new Event('id', 'url', 'title', 'description', 'date', true)

  it('should have a button', () => {
    MockRender(EventRemoveButtonComponent, { event })

    const button = ngMocks.find('button')
    const buttonDirective = ngMocks.findInstance(button, Button)
    expect(buttonDirective.cdsButton).toBe('danger--tertiary')
    expect(buttonDirective.size).toBe('field')
    expect(ngMocks.formatText(button)).toBe('Remove')
  })

  describe('button click', () => {
    it('should show modal', () => {
      MockRender(EventRemoveButtonComponent, { event })

      ngMocks.click('button')

      const modalService = ngMocks.findInstance(ModalService)
      expect(modalService.show).toHaveBeenCalledOnceWith({
        type: AlertModalType.danger,
        label: event.title,
        title: 'Remove event',
        size: 'xs',
        content: 'Are you sure you want to remove this event?',
        buttons: [
          { type: ModalButtonType.secondary, text: 'Close' },
          { type: ModalButtonType.danger, text: 'Remove', click: jasmine.any(Function) },
        ],
      })
    })
  })

  describe('modal button click', () => {
    it('should remove event and navigate to /event', () => {
      MockInstance(ModalService, 'show', (data) => data?.buttons?.[1].click?.())
      MockInstance(EventActionsService, 'deleteEvent', () => of(void 0))
      const navigate = jasmine.createSpy('navigate').and.resolveTo(true)
      MockInstance(Router, (instance) => ngMocks.stub(instance, { navigate }))
      MockRender(EventRemoveButtonComponent, { event })

      ngMocks.click('button')

      const router = ngMocks.findInstance(Router)
      expect(router.navigate).toHaveBeenCalledOnceWith(['event'])
    })
  })
})
