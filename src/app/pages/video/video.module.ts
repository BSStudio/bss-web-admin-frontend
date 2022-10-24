import { NgModule } from '@angular/core';
import { VideoIndexComponent } from './video-index/video-index.component';
import { VideoRoutingModule } from './video-routing.module';
import { VideoIdComponent } from './video-id/video-id.component';
import { CreateVideoModalModule } from '../../video/create-modal/create-video-modal.module';
import { VideoTableModule } from '../../video/table/video-table.module';
import {
  BreadcrumbModule,
  DatePickerInputModule,
  DatePickerModule,
  FileUploaderModule,
  IconModule,
  NFormsModule,
} from 'carbon-components-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, KeyValuePipe } from '@angular/common';
import { VideoPlayerModule } from '../../video/video-player/video-player.module';

@NgModule({
  imports: [
    VideoRoutingModule,
    CreateVideoModalModule,
    VideoTableModule,
    NFormsModule,
    ReactiveFormsModule,
    DatePickerInputModule,
    IconModule,
    BreadcrumbModule,
    DatePickerModule,
    JsonPipe,
    KeyValuePipe,
    FileUploaderModule,
    VideoPlayerModule,
  ],
  declarations: [VideoIndexComponent, VideoIdComponent],
})
export class VideoModule {}
