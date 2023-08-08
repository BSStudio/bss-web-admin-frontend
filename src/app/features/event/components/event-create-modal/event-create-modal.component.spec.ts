import { EventCreateModalComponent } from './event-create-modal.component'
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { EventModule } from '../../event.module'
import { EventService } from '../../services/event.service'
import { FormBuilder, FormControlName, FormGroupDirective, ReactiveFormsModule } from '@angular/forms'
import {
  Button,
  Label,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalHeaderHeading,
  NotificationService,
  TextInput,
} from 'carbon-components-angular'
import { of, throwError } from 'rxjs'
import { Event } from '../../models'

describe('EventCreateModalComponent', () => {
  const close = { emit: jasmine.createSpy('emit') }
  beforeEach(() => MockBuilder([EventCreateModalComponent, FormBuilder, ReactiveFormsModule], EventModule))

  describe('render', () => {
    it('should have params', () => {
      const fixture = MockRender(EventCreateModalComponent, { open: true })
      expect(fixture.point.componentInstance.open).toBeTrue()
      const modal = ngMocks.find(Modal)
      expect(modal.componentInstance.open).toBeTrue()
    })

    it('should have a header', () => {
      MockRender(EventCreateModalComponent, { open: true })
      const modal = ngMocks.find(Modal)
      const header = ngMocks.find(modal, ModalHeader)
      const heading = ngMocks.find(header, ModalHeaderHeading)
      expect(ngMocks.formatText(heading)).toEqual('Add new event')
      ngMocks.findInstance(header, ModalHeaderHeading)
    })

    it('should have a form', () => {
      const fixture = MockRender(EventCreateModalComponent, { open: true })

      const modal = ngMocks.find(Modal)

      // form content
      const form = ngMocks.find<HTMLFormElement>(modal, 'form')
      const modalContent = ngMocks.findInstance(form, ModalContent)
      expect(modalContent.hasForm).toEqual(true)
      const formGroupDirective = ngMocks.findInstance(FormGroupDirective)
      expect(formGroupDirective.form).toEqual(fixture.point.componentInstance.form)

      // form inputs
      const labels = ngMocks.findAll(form, Label)
      expect(labels.length).toBe(2)
      const [titleLabel, urlLabel] = labels

      // title input
      expect(ngMocks.formatText(titleLabel)).toBe('Title')
      const titleInput = ngMocks.find(titleLabel, 'input')
      expect(titleInput.nativeElement.placeholder).toBe('Simonyi Conference 2022')
      ngMocks.findInstance(titleInput, TextInput)
      const titleFormControl = ngMocks.findInstance(titleInput, FormControlName)
      expect(titleFormControl.name).toBe('title')

      // url input
      expect(urlLabel.componentInstance.helperText).toBe(
        'The event will have the following url: https://bsstudio/event/simonyi-conference-2022',
      )
      expect(ngMocks.formatText(urlLabel)).toBe('URL')
      const urlInput = ngMocks.find(urlLabel, 'input')
      expect(urlInput.nativeElement.placeholder).toBe('simonyi-conference-2022')
      ngMocks.findInstance(urlInput, TextInput)
      const urlFormControl = ngMocks.findInstance(urlInput, FormControlName)
      expect(urlFormControl.name).toBe('url')
    })

    it('should have a footer', () => {
      MockRender(EventCreateModalComponent, { open: true })

      const modal = ngMocks.find(Modal)
      const footer = ngMocks.find(modal, ModalFooter)
      const buttons = ngMocks.findAll<HTMLButtonElement>(footer, 'button')

      expect(buttons.length).toBe(2)

      const [addButton, closeButton] = buttons
      expect(ngMocks.formatText(addButton)).toBe('Add event')
      const addButtonDirective = ngMocks.findInstance(addButton, Button)
      expect(addButtonDirective.cdsButton).toEqual('primary')
      expect(ngMocks.formatText(closeButton)).toBe('Cancel')
      const closeButtonDirective = ngMocks.findInstance(closeButton, Button)
      expect(closeButtonDirective.cdsButton).toEqual('secondary')
    })
  })

  it('should submit successfully', () => {
    const title = 'title'
    const url = 'url'
    const event = new Event('id', url, title, 'description', 'date', true)
    MockInstance(EventService, 'createEvent', () => of(event))
    const fixture = MockRender(EventCreateModalComponent, { open: true, close })

    const [titleInput, urlInput] = ngMocks.findAll('input')
    ngMocks.change(titleInput, title)
    ngMocks.change(urlInput, url)

    const form = ngMocks.find('form')
    const formGroupDirective = ngMocks.findInstance(form, FormGroupDirective)
    formGroupDirective.ngSubmit.emit()

    expect(ngMocks.findInstance(NotificationService).showToast).toHaveBeenCalledWith({
      type: 'success',
      title: 'Event created',
      links: [{ text: event.title, href: `/event/${event.id}` }],
      caption: 'Add videos to the event, update the details and publish it',
      message: 'Add videos to the event, update the details and publish it',
      smart: true,
      template: fixture.point.componentInstance.toastContent,
    })
    expect(close.emit).toHaveBeenCalledWith(true)
  })

  it('should not submit if title is empty', () => {
    const url = 'url'
    MockRender(EventCreateModalComponent, { open: true, close })

    const urlInput = ngMocks.findAll('input')[1]
    ngMocks.change(urlInput, url)

    const buttons = ngMocks.findAll<HTMLButtonElement>('button')
    const addButton = buttons[0]
    ngMocks.click(addButton)
    expect(ngMocks.findInstance(EventService).createEvent).not.toHaveBeenCalled()
  })

  it('should not submit if url is empty', () => {
    const title = 'title'
    MockRender(EventCreateModalComponent, { open: true, close })

    const [titleInput] = ngMocks.findAll('input')
    ngMocks.change(titleInput, title)

    const buttons = ngMocks.findAll<HTMLButtonElement>('button')
    const addButton = buttons[0]
    ngMocks.click(addButton)
    expect(ngMocks.findInstance(EventService).createEvent).not.toHaveBeenCalled()
  })

  it('should submit with error returning', () => {
    const title = 'title'
    const url = 'url'
    window.alert = jasmine.createSpy('alert')
    MockInstance(EventService, 'createEvent', () => throwError(() => new Error()))
    MockRender(EventCreateModalComponent, { open: true, close })

    const [titleInput, urlInput] = ngMocks.findAll('input')
    ngMocks.change(titleInput, title)
    ngMocks.change(urlInput, url)

    const form = ngMocks.find('form')
    const formGroupDirective = ngMocks.findInstance(form, FormGroupDirective)
    formGroupDirective.ngSubmit.emit()

    expect(window.alert).toHaveBeenCalledOnceWith('Server error: title and url must be unique')
  })

  xit('should close on button', () => {
    MockRender(EventCreateModalComponent, { open: true, close })

    const buttons = ngMocks.findAll<HTMLButtonElement>('button')
    const closeButton = buttons[1]

    ngMocks.click(closeButton)
    expect(close.emit).toHaveBeenCalledWith(true)
  })

  xit('should close on x', () => {
    MockRender(EventCreateModalComponent, { open: true, close })

    const heading = ngMocks.find(ModalHeaderHeading)

    ngMocks.trigger(heading, ngMocks.event('close-select'))
    expect(close.emit).toHaveBeenCalledWith(true)
  })

  xit('should close on clicking out', () => {
    MockRender(EventCreateModalComponent, { open: true, close })

    const modal = ngMocks.find(Modal)

    ngMocks.trigger(modal, ngMocks.event('overlay-selected'))
    expect(close.emit).toHaveBeenCalledWith(true)
  })
})
