import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventTableComponent } from './event-table.component';
import { ButtonModule, IconModule, ModalModule, TableModule } from 'carbon-components-angular';
import { BooleanPipe } from '../../../../shared/pipes/boolean.pipe';
import { CreateEventModalModule } from '../create-event-modal/create-event-modal.module';

@NgModule({
  declarations: [EventTableComponent],
  imports: [CommonModule, TableModule, ButtonModule, IconModule, ModalModule, CreateEventModalModule],
  providers: [BooleanPipe],
  exports: [EventTableComponent],
})
export class EventTableModule {}
