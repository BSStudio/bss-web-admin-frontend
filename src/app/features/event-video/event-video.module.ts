import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EventVideoAddFormComponent } from './components/event-video-add-form/event-video-add-form.component'
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
import { SharedModule } from '../../shared/shared.module'
import { EventVideoActionsService } from './actions/event-video.actions.service'

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
    SharedModule,
  ],
  declarations: [EventVideoAddFormComponent, EventVideoTableComponent, EventVideoRemoveButtonComponent],
  exports: [EventVideoAddFormComponent, EventVideoTableComponent, EventVideoRemoveButtonComponent],
  providers: [EventVideoActionsService],
})
export class EventVideoModule {}
