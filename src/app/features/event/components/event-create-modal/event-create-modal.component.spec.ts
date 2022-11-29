import { EventCreateModalComponent } from './event-create-modal.component';
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';
import { EventModule } from '../../event.module';
import { EventService } from '../../services/event.service';
import { FormBuilder, FormControlName, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
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
} from 'carbon-components-angular';
import { of, throwError } from 'rxjs';
import { Event } from '../../models';

describe('EventCreateModalComponent', () => {
  const close = jasmine.createSpy('close');
  beforeEach(() => MockBuilder([EventCreateModalComponent, FormBuilder, ReactiveFormsModule], EventModule));

  describe('render', () => {
    it('should have params', () => {
      const fixture = MockRender(EventCreateModalComponent, { open: true });
      expect(fixture.point.componentInstance.open).toBeTrue();
      const modal = ngMocks.find(Modal);
      expect(modal.componentInstance.open).toBeTrue();
    });

    it('should have a header', () => {
      MockRender(EventCreateModalComponent, { open: true });
      const modal = ngMocks.find(Modal);
      const header = ngMocks.find(modal, ModalHeader);
      const heading = ngMocks.find(header, ModalHeaderHeading);
      expect(ngMocks.formatText(heading)).toEqual('Add new event');
      ngMocks.findInstance(header, ModalHeaderHeading);
    });

    it('should have a form', () => {
      const fixture = MockRender(EventCreateModalComponent, { open: true });

      const modal = ngMocks.find(Modal);

      // form content
      const form = ngMocks.find<HTMLFormElement>(modal, 'form');
      const modalContent = ngMocks.findInstance(form, ModalContent);
      expect(modalContent.hasForm).toEqual(true);
      const formGroupDirective = ngMocks.findInstance(FormGroupDirective);
      expect(formGroupDirective.form).toEqual(fixture.point.componentInstance.form);

      // form inputs
      const labels = ngMocks.findAll(form, Label);
      expect(labels.length).toBe(2);
      const [titleLabel, urlLabel] = labels;

      // title input
      expect(ngMocks.formatText(titleLabel)).toBe('Title');
      const titleInput = ngMocks.find(titleLabel, 'input');
      expect(titleInput.nativeElement.placeholder).toBe('Simonyi Conference 2022');
      ngMocks.findInstance(titleInput, TextInput);
      const titleFormControl = ngMocks.findInstance(titleInput, FormControlName);
      expect(titleFormControl.name).toBe('title');

      // url input
      expect(urlLabel.componentInstance.helperText).toBe(
        'The event will have the following url: https://bsstudio/member/simonyi-conference-2022'
      );
      expect(ngMocks.formatText(urlLabel)).toBe('URL');
      const urlInput = ngMocks.find(urlLabel, 'input');
      expect(urlInput.nativeElement.placeholder).toBe('simonyi-conference-2022');
      ngMocks.findInstance(urlInput, TextInput);
      const urlFormControl = ngMocks.findInstance(urlInput, FormControlName);
      expect(urlFormControl.name).toBe('url');
    });

    it('should have a footer', () => {
      MockRender(EventCreateModalComponent, { open: true });

      const modal = ngMocks.find(Modal);
      const footer = ngMocks.find(modal, ModalFooter);
      const buttons = ngMocks.findAll<HTMLButtonElement>(footer, 'button');

      expect(buttons.length).toBe(2);

      const [addButton, closeButton] = buttons;
      expect(ngMocks.formatText(addButton)).toBe('Add event');
      expect(addButton.nativeElement.style.order).toBe('1');
      const addButtonDirective = ngMocks.findInstance(addButton, Button);
      expect(addButtonDirective.ibmButton).toEqual('primary');
      expect(ngMocks.formatText(closeButton)).toBe('Cancel');
      const closeButtonDirective = ngMocks.findInstance(closeButton, Button);
      expect(closeButtonDirective.ibmButton).toEqual('secondary');
    });
  });

  it('should submit successfully', () => {
    const title = 'title';
    const url = 'url';
    const event = new Event('id', url, title, 'description', 'date', true);
    MockInstance(EventService, (instance) =>
      ngMocks.stub(instance, { createEvent: jasmine.createSpy().and.returnValue(of(event)) })
    );
    MockRender(EventCreateModalComponent, { open: true, close });

    const [titleInput, urlInput] = ngMocks.findAll('input');
    ngMocks.change(titleInput, title);
    ngMocks.change(urlInput, url);

    const buttons = ngMocks.findAll<HTMLButtonElement>('button');
    const addButton = buttons[0];
    ngMocks.click(addButton);
    expect(ngMocks.findInstance(EventService).createEvent).toHaveBeenCalledWith({ title, url });
    expect(ngMocks.findInstance(NotificationService).showToast).toHaveBeenCalledWith({
      type: 'success',
      title: 'Event created',
      message: title,
    });
    expect(close).toHaveBeenCalled();
  });

  it('should not submit if title is empty', () => {
    const url = 'url';
    MockRender(EventCreateModalComponent, { open: true, close });

    const urlInput = ngMocks.findAll('input')[1];
    ngMocks.change(urlInput, url);

    const buttons = ngMocks.findAll<HTMLButtonElement>('button');
    const addButton = buttons[0];
    ngMocks.click(addButton);
    expect(ngMocks.findInstance(EventService).createEvent).not.toHaveBeenCalled();
  });

  it('should not submit if url is empty', () => {
    const title = 'title';
    MockRender(EventCreateModalComponent, { open: true, close });

    const [titleInput] = ngMocks.findAll('input');
    ngMocks.change(titleInput, title);

    const buttons = ngMocks.findAll<HTMLButtonElement>('button');
    const addButton = buttons[0];
    ngMocks.click(addButton);
    expect(ngMocks.findInstance(EventService).createEvent).not.toHaveBeenCalled();
  });

  it('should submit with error returning', () => {
    const title = 'title';
    const url = 'url';
    const error = new Error('error');
    MockInstance(EventService, (instance) =>
      ngMocks.stub(instance, {
        createEvent: jasmine.createSpy().and.returnValue(throwError(() => error)),
      })
    );
    MockRender(EventCreateModalComponent, { open: true, close });

    const [titleInput, urlInput] = ngMocks.findAll('input');
    ngMocks.change(titleInput, title);
    ngMocks.change(urlInput, url);

    const buttons = ngMocks.findAll<HTMLButtonElement>('button');
    const addButton = buttons[0];
    ngMocks.click(addButton);
    expect(ngMocks.findInstance(EventService).createEvent).toHaveBeenCalledWith({ title, url });
    expect(ngMocks.findInstance(NotificationService).showToast).toHaveBeenCalledWith({
      type: 'error',
      title: 'Error creating event',
      message: JSON.stringify(error),
    });
  });

  it('should close on button', () => {
    MockRender(EventCreateModalComponent, { open: true, close });

    const buttons = ngMocks.findAll<HTMLButtonElement>('button');
    const closeButton = buttons[1];

    ngMocks.click(closeButton);
    expect(close).toHaveBeenCalled();
  });

  it('should close on x', () => {
    MockRender(EventCreateModalComponent, { open: true, close });

    const heading = ngMocks.find(ModalHeaderHeading);

    ngMocks.trigger(heading, 'closeSelect');
    expect(close).toHaveBeenCalled();
  });

  it('should close on clicking out', () => {
    MockRender(EventCreateModalComponent, { open: true, close });

    const modal = ngMocks.find(Modal);

    ngMocks.trigger(modal, 'overlaySelected');
    expect(close).toHaveBeenCalled();
  });
});
