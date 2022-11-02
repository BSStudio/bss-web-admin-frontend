import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCrewTableComponent } from './components/video-crew-table/video-crew-table.component';
import {
  ButtonModule,
  ComboBoxModule,
  IconModule,
  ModalModule,
  NFormsModule,
  TableModule,
} from 'carbon-components-angular';
import { RouterModule } from '@angular/router';
import { VideoCrewAddModalComponent } from './components/video-crew-add-modal/video-crew-add-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VideoCrewTableComponent, VideoCrewAddModalComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RouterModule,
    IconModule,
    ModalModule,
    ReactiveFormsModule,
    NFormsModule,
    ComboBoxModule,
  ],
  exports: [VideoCrewTableComponent],
})
export class VideoCrewModule {}
