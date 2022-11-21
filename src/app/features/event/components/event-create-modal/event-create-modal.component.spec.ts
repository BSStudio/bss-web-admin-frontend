import { EventCreateModalComponent } from './event-create-modal.component';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { EventModule } from '../../event.module';
import { FormBuilder, FormControlDirective, FormControlName, FormGroupDirective } from '@angular/forms';
import {
  Button,
  Label,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalHeaderHeading,
  TextInput,
} from 'carbon-components-angular';

describe('EventCreateModalComponent', () => {
  beforeEach(() => MockBuilder([EventCreateModalComponent, FormBuilder], EventModule));

  it('should render', () => {
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

    const form = ngMocks.find<HTMLFormElement>(modal, 'form');

    const modalContent = ngMocks.findInstance(form, ModalContent);
    expect(modalContent.hasForm).toEqual(true);
    const formGroupDirective = ngMocks.findInstance(FormGroupDirective);
    expect(formGroupDirective.form).toEqual(fixture.point.componentInstance.form);

    const labels = ngMocks.findAll(form, Label);
    expect(labels.length).toBe(2);
    const [titleLabel, urlLabel] = labels;

    expect(ngMocks.formatText(titleLabel)).toBe('Title');
    const titleInput = ngMocks.find(titleLabel, 'input');
    expect(titleInput.nativeElement.placeholder).toBe('Simonyi Conference 2022');
    ngMocks.findInstance(titleInput, TextInput);
    const titleFormControl = ngMocks.findInstance(titleInput, FormControlName);
    expect(titleFormControl.name).toBe('title');

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

  xit('should submit successfully', () => {});

  xit('should submit with error returning', () => {});

  xit('should close on button', () => {});

  xit('should close on x', () => {});

  xit('should close on clicking out', () => {});
});
