import { Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import Hls from 'hls.js';

@Directive({
  selector: 'video[appVideoPlayer]',
})
export class VideoPlayerDirective implements OnChanges {
  private static readonly DEFAULT_POSTER = '/assets/fallback-poster.png';
  private readonly hls = new Hls();

  @Input()
  public src = '';
  @Input()
  @HostBinding('poster')
  public poster = VideoPlayerDirective.DEFAULT_POSTER;

  constructor(private video: ElementRef<HTMLVideoElement>) {
    this.video.nativeElement.controls = true;
    this.video.nativeElement.preload = 'metadata';
  }

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
      this.hls.attachMedia(this.video.nativeElement);
      return;
    }
  }
}
