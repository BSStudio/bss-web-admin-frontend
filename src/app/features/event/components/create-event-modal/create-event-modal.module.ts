import { NgModule } from '@angular/core';
import { IconModule, ModalModule, NFormsModule } from 'carbon-components-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEventModalComponent } from './create-event-modal.component';

@NgModule({
  imports: [ModalModule, IconModule, ReactiveFormsModule, NFormsModule],
  declarations: [CreateEventModalComponent],
  exports: [CreateEventModalComponent],
})
export class CreateEventModalModule {}
