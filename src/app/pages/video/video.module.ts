import { NgModule } from '@angular/core';
import { VideoIndexComponent } from './video-index.component';
import { VideoRoutingModule } from './video-routing.module';
import { VideoIdComponent } from './video-id.component';
import { CreateVideoModalModule } from '../../video/create-modal/create-video-modal.module';
import { VideoTableModule } from '../../video/table/video-table.module';
import { NFormsModule } from 'carbon-components-angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [VideoRoutingModule, CreateVideoModalModule, VideoTableModule, NFormsModule, ReactiveFormsModule],
  declarations: [VideoIndexComponent, VideoIdComponent],
})
export class VideoModule {}
