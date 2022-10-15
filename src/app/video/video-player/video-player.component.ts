import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import Hls from 'hls.js';

@Component({
  selector: 'app-video-player',
  template: `<video #video controls muted preload="metadata" width="400px" [poster]="poster"></video>`,
})
export class VideoPlayerComponent implements OnChanges {
  private hls = new Hls();
  @Input() src = '';
  @Input() poster = '';
  @ViewChild('video', { static: true }) video!: ElementRef<HTMLVideoElement>;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']) {
      this.loadSrc();
    }
  }

  private loadSrc(): void {
    if (this.video.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
      this.video.nativeElement.src = this.src;
      return;
    }
    if (Hls.isSupported()) {
      this.hls.loadSource(this.src);
      this.hls.capLevelToPlayerSize = true;
      this.hls.attachMedia(this.video.nativeElement);
      return;
    }
  }
}
