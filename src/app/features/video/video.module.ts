import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import {
  DatePickerModule,
  FileUploaderModule,
  IconModule,
  InlineLoadingModule,
  ListModule,
  ModalModule,
  NFormsModule,
  NotificationModule,
  PaginationModule,
  TableModule,
} from 'carbon-components-angular'
import { VideoRoutingModule } from './pages/video-routing.module'
import { VideoIndexComponent } from './pages/video-index/video-index.component'
import { VideoIdComponent } from './pages/video-id/video-id.component'
import { VideoPlayerDirective } from './directives/video-player/video-player.directive'
import { VideoUpdateFormComponent } from './components/video-update-form/video-update-form.component'
import { VideoRemoveButtonComponent } from './components/video-remove-button/video-remove-button.component'
import { VideoCrewModule } from '../video-crew/video-crew.module'
import { VideoCreateModalComponent } from './components/video-create-modal/video-create-modal.component'
import { VideoTableComponent } from './components/video-table-paginated/video-table.component'
import { SharedModule } from '../../shared/shared.module'
import { VideoActionsService } from './actions/video.actions.service'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePickerModule,
    FileUploaderModule,
    IconModule,
    ModalModule,
    NFormsModule,
    NotificationModule,
    PaginationModule,
    TableModule,
    VideoRoutingModule,
    VideoCrewModule,
    SharedModule,
    InlineLoadingModule,
    ListModule,
  ],
  declarations: [
    VideoIndexComponent,
    VideoIdComponent,
    VideoPlayerDirective,
    VideoCreateModalComponent,
    VideoRemoveButtonComponent,
    VideoTableComponent,
    VideoUpdateFormComponent,
  ],
  providers: [VideoActionsService],
})
export class VideoModule {}
