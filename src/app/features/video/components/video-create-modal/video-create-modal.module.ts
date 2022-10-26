import { NgModule } from '@angular/core';
import { ButtonModule, IconModule, ModalModule, NFormsModule } from 'carbon-components-angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoService } from '../../services/video.service';
import { VideoCreateModalComponent } from './video-create-modal.component';

@NgModule({
  imports: [ButtonModule, IconModule, CommonModule, ModalModule, NFormsModule, ReactiveFormsModule, FormsModule],
  providers: [VideoService],
  declarations: [VideoCreateModalComponent],
  exports: [VideoCreateModalComponent],
})
export class VideoCreateModalModule {}
