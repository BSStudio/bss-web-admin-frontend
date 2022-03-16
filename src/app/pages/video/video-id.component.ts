import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { DetailedVideo, VideoService } from '../../video/service/video.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-video-id',
  templateUrl: './video-id.component.html',
  styleUrls: ['./video-id.component.scss'],
})
export class VideoIdComponent implements OnInit {
  public video?: DetailedVideo;
  public videoForm = this.fb.group({
    url: ['', Validators.required],
    title: ['', Validators.required],
    description: [''],
    videoUrl: [''],
    thumbnailUrl: [''],
    uploadedAt: ['', Validators.required],
    visible: ['', Validators.required],
  });

  constructor(private route: ActivatedRoute, private service: VideoService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((p) => p['videoId']),
        mergeMap((videoId) => this.service.getVideo(videoId))
      )
      .subscribe({
        next: (video) => (this.video = video),
      });
  }
}
