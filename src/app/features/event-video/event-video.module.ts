import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EventVideoAddModalComponent } from './components/event-video-add-modal/event-video-add-modal.component'
import { EventVideoTableComponent } from './components/event-video-table/event-video-table.component'
import { EventVideoRemoveButtonComponent } from './components/event-video-remove-button/event-video-remove-button.component'
import {
  ComboBoxModule,
  IconModule,
  ModalModule,
  NFormsModule,
  NotificationModule,
  TableModule,
} from 'carbon-components-angular'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    ReactiveFormsModule,
    NFormsModule,
    NotificationModule,
    IconModule,
    TableModule,
    RouterModule,
    ComboBoxModule,
  ],
  declarations: [EventVideoAddModalComponent, EventVideoTableComponent, EventVideoRemoveButtonComponent],
  exports: [EventVideoAddModalComponent, EventVideoTableComponent, EventVideoRemoveButtonComponent],
})
export class EventVideoModule {}
