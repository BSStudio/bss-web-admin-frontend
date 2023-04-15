import { RouterModule, Routes } from '@angular/router'
import { VideoIndexComponent } from './video-index/video-index.component'
import { VideoIdComponent } from './video-id/video-id.component'
import { NgModule } from '@angular/core'
import { VideoResolver } from './video.resolver'

const routes: Routes = [
  { path: '', component: VideoIndexComponent, title: $localize`BSS Web | Videos` },
  { path: ':videoId', resolve: { video: VideoResolver }, component: VideoIdComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoRoutingModule {}
