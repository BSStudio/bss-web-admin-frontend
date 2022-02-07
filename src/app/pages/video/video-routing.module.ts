import { RouterModule, Routes } from '@angular/router';
import { VideoIndexComponent } from './video-index.component';
import { VideoIdComponent } from './video-id.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: VideoIndexComponent },
  { path: ':videoId', component: VideoIdComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoRoutingModule {}
