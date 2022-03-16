import { NgModule } from '@angular/core';
import { ButtonModule, IconModule, ModalModule, NFormsModule } from 'carbon-components-angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoService } from '../service/video.service';
import { CreateVideoModalComponent } from './create-video-modal.component';

@NgModule({
  imports: [ButtonModule, IconModule, CommonModule, ModalModule, NFormsModule, ReactiveFormsModule, FormsModule],
  providers: [VideoService],
  declarations: [CreateVideoModalComponent],
  exports: [CreateVideoModalComponent],
})
export class CreateVideoModalModule {}
