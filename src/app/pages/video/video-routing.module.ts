import { RouterModule, Routes } from '@angular/router';
import { VideoIndexComponent } from './video-index.component';
import { VideoIdComponent } from './video-id.component';
import { NgModule } from '@angular/core';
import { VideoResolver } from './video.resolver';

const routes: Routes = [
  { path: '', component: VideoIndexComponent },
  { path: ':videoId', resolve: { video: VideoResolver }, component: VideoIdComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoRoutingModule {}
