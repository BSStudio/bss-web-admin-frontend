import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import {
  DatePickerModule,
  IconModule,
  ModalModule,
  NFormsModule,
  NotificationModule,
  TableModule,
} from 'carbon-components-angular'
import { EventRoutingModule } from './pages/event-routing.module'
import { EventIndexComponent } from './pages/event-index/event-index.component'
import { EventIdComponent } from './pages/event-id/event-id.component'
import { EventCreateModalComponent } from './components/event-create-modal/event-create-modal.component'
import { EventTableComponent } from './components/event-table/event-table.component'
import { EventUpdateFormComponent } from './components/event-update-form/event-update-form.component'
import { SharedModule } from '../../shared/shared.module'
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component'
import { EventRemoveButtonComponent } from './components/event-remove-button/event-remove-button.component'
import { EventVideoModule } from '../event-video/event-video.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    DatePickerModule,
    IconModule,
    ModalModule,
    NotificationModule,
    NFormsModule,
    TableModule,
    EventRoutingModule,
    SharedModule,
    EventVideoModule,
  ],
  declarations: [
    EventIndexComponent,
    EventIdComponent,
    EventCreateModalComponent,
    EventTableComponent,
    EventUpdateFormComponent,
    EventRemoveButtonComponent,
  ],
})
export class EventModule {}
