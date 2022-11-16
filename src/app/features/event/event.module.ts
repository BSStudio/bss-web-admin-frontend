import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  BreadcrumbModule,
  ComboBoxModule,
  DatePickerModule,
  IconModule,
  ModalModule,
  NFormsModule,
  TableModule,
} from 'carbon-components-angular';
import { EventRoutingModule } from './pages/event-routing.module';
import { EventIndexComponent } from './pages/event-index/event-index.component';
import { EventIdComponent } from './pages/event-id/event-id.component';
import { EventCreateModalComponent } from './components/event-create-modal/event-create-modal.component';
import { EventTableComponent } from './components/event-table/event-table.component';
import { EventUpdateFormComponent } from './components/event-update-form/event-update-form.component';
import { EventVideoAddModalComponent } from './components/event-video-add-modal/event-video-add-modal.component';
import { EventVideoTableComponent } from './components/event-video-table/event-video-table.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    ComboBoxModule,
    DatePickerModule,
    IconModule,
    ModalModule,
    NFormsModule,
    TableModule,
    EventRoutingModule,
    SharedModule,
  ],
  declarations: [
    EventIndexComponent,
    EventIdComponent,
    EventCreateModalComponent,
    EventTableComponent,
    EventUpdateFormComponent,
    EventVideoAddModalComponent,
    EventVideoTableComponent,
  ],
})
export class EventModule {}
