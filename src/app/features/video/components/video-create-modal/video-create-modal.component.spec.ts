import { MockBuilder, MockRender, ngMocks } from 'ng-mocks'
import { VideoCreateModalComponent } from './video-create-modal.component'
import { VideoModule } from '../../video.module'
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms'
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalHeaderHeading,
  ModalModule,
} from 'carbon-components-angular'

describe('VideoCreateModalComponent', () => {
  beforeEach(() => MockBuilder([VideoCreateModalComponent, ModalModule, ReactiveFormsModule, FormBuilder], VideoModule))

  it('should render', () => {
    const fixture = MockRender(VideoCreateModalComponent, { open: true })

    expect(fixture).toBeTruthy()
  })

  it('should have a header', () => {
    MockRender(VideoCreateModalComponent, { open: true })

    const modal = ngMocks.find(Modal)
    expect(modal.componentInstance.open).toBeTrue()
    const modalHeader = ngMocks.find(modal, ModalHeader)
    const h3 = ngMocks.find(modalHeader, 'h3')
    expect(ngMocks.formatText(h3)).toBe('Add new video')
    ngMocks.findInstance(h3, ModalHeaderHeading)
  })

  it('should have a form', () => {
    const fixture = MockRender(VideoCreateModalComponent, { open: true })

    const modal = ngMocks.find(Modal)
    const form = ngMocks.find(modal, 'form')
    const modalContent = ngMocks.findInstance(form, ModalContent)
    expect(modalContent.hasForm).toBeTrue()
    const formGroup = ngMocks.findInstance(form, FormGroupDirective)
    expect(formGroup.form).toEqual(fixture.point.componentInstance.form)
  })
  it('should have a footer', () => {
    MockRender(VideoCreateModalComponent, { open: true })

    const modal = ngMocks.find(Modal)
    const modalFooter = ngMocks.find(modal, ModalFooter)

    const buttons = ngMocks.findAll(modalFooter, 'button')
    expect(buttons.length).toBe(2)
    const [addButton, cancelButton] = buttons

    expect(ngMocks.formatText(addButton)).toBe('Add video')
    expect(ngMocks.formatText(cancelButton)).toBe('Cancel')

    const addButtonDirective = ngMocks.findInstance(addButton, Button)
    const cancelButtonDirective = ngMocks.findInstance(cancelButton, Button)

    expect(addButtonDirective.cdsButton).toBe('primary')
    expect(cancelButtonDirective.cdsButton).toBe('secondary')
  })
})
