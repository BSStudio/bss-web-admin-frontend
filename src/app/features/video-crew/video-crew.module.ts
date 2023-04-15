import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VideoCrewTableComponent } from './components/video-crew-table/video-crew-table.component'
import {
  ButtonModule,
  ComboBoxModule,
  IconModule,
  ModalModule,
  NFormsModule,
  NotificationModule,
  TableModule,
} from 'carbon-components-angular'
import { RouterModule } from '@angular/router'
import { VideoCrewAddFormComponent } from './components/video-crew-add-form/video-crew-add-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { VideoCrewRemoveButtonComponent } from './components/video-crew-remove-button/video-crew-remove-button.component'

@NgModule({
  declarations: [VideoCrewTableComponent, VideoCrewAddFormComponent, VideoCrewRemoveButtonComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RouterModule,
    IconModule,
    ModalModule,
    NotificationModule,
    ReactiveFormsModule,
    NFormsModule,
    ComboBoxModule,
  ],
  exports: [VideoCrewTableComponent],
})
export class VideoCrewModule {}
