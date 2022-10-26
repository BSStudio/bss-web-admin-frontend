import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './pages/event-routing.module';
import { EventIndexComponent } from './pages/event-index/event-index.component';
import { EventIdComponent } from './pages/event-id/event-id.component';
import { EventTableModule } from './components/event-table/event-table.module';
import {
  BreadcrumbModule,
  ComboBoxModule,
  DatePickerModule,
  IconModule,
  ModalModule,
  NFormsModule,
  StructuredListModule,
  TableModule,
} from 'carbon-components-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { EventUpdateFormComponent } from './components/event-update-form/event-update-form.component';
import { EventVideoAddModalComponent } from './components/event-video-add-modal/event-video-add-modal.component';
import { EventVideoTableComponent } from './components/event-video-table/event-video-table.component';

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    EventTableModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    NFormsModule,
    DatePickerModule,
    IconModule,
    StructuredListModule,
    TableModule,
    ModalModule,
    ComboBoxModule,
  ],
  declarations: [
    EventIndexComponent,
    EventIdComponent,
    EventUpdateFormComponent,
    EventVideoAddModalComponent,
    EventVideoTableComponent,
  ],
})
export class EventModule {}
