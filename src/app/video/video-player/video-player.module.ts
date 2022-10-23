import { NgModule } from '@angular/core';
import { VideoPlayerDirective } from './video-player.directive';

@NgModule({
  declarations: [VideoPlayerDirective],
  exports: [VideoPlayerDirective],
})
export class VideoPlayerModule {}
