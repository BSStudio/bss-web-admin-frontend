import { NgModule } from '@angular/core';
import { VideoIndexComponent } from './video-index.component';
import { VideoRoutingModule } from './video-routing.module';
import { ButtonModule, IconModule, TableModule } from 'carbon-components-angular';
import { VideoIdComponent } from './video-id.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [VideoRoutingModule, TableModule, ButtonModule, IconModule, CommonModule],
  declarations: [VideoIndexComponent, VideoIdComponent],
})
export class VideoModule {}
