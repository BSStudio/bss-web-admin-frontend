import { NgModule } from '@angular/core';
import { VideoIndexComponent } from './pages/video-index/video-index.component';
import { VideoRoutingModule } from './pages/video-routing.module';
import { VideoIdComponent } from './pages/video-id/video-id.component';
import { VideoCreateModalModule } from './components/video-create-modal/video-create-modal.module';
import { VideoTableModule } from './components/video-table-paginated/video-table.module';
import {
  BreadcrumbModule,
  DatePickerModule,
  FileUploaderModule,
  IconModule,
  NFormsModule,
} from 'carbon-components-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { VideoPlayerDirective } from './directives/video-player/video-player.directive';
import { BooleanPipe } from '../../shared/pipes/boolean.pipe';
import { VideoUpdateFormComponent } from './components/video-update-form/video-update-form.component';
import { VideoRemoveButtonComponent } from './components/video-remove-button/video-remove-button.component';
import { VideoBreadcrumbComponent } from './components/video-breadcrumb/video-breadcrumb.component';

@NgModule({
  imports: [
    BreadcrumbModule,
    DatePickerModule,
    FileUploaderModule,
    NFormsModule,
    ReactiveFormsModule,
    JsonPipe,
    VideoCreateModalModule,
    VideoTableModule,
    VideoRoutingModule,
    IconModule,
  ],
  declarations: [
    VideoIndexComponent,
    VideoIdComponent,
    VideoPlayerDirective,
    VideoUpdateFormComponent,
    VideoRemoveButtonComponent,
    VideoBreadcrumbComponent,
  ],
  providers: [BooleanPipe],
})
export class VideoModule {}
