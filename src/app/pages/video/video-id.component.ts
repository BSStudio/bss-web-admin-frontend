import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from '../../video/service/video.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DetailedVideo } from '../../video/service/video.model';
import { AlertModalType, ModalButtonType, ModalService } from 'carbon-components-angular';

@Component({
  selector: 'app-video-id',
  templateUrl: './video-id.component.html',
  styleUrls: ['./video-id.component.scss'],
})
export class VideoIdComponent implements OnInit {
  public video: DetailedVideo;
  public videoForm = this.fb.group({
    url: ['', Validators.required],
    title: ['', Validators.required],
    description: [''],
    videoUrl: [''],
    thumbnailUrl: [''],
    uploadedAt: ['', Validators.required],
    visible: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: VideoService,
    private fb: FormBuilder,
    private modalService: ModalService
  ) {
    this.video = <DetailedVideo>this.route.snapshot.data['video'];
  }

  ngOnInit(): void {
    const { id, crew, ...rest } = this.video;
    this.videoForm.setValue(rest);
  }

  public updateVideo() {
    if (!this.video) return;
    this.service.updateVideo(this.video.id, this.videoForm.getRawValue()).subscribe();
  }

  public removeVideo() {
    this.modalService.show({
      type: AlertModalType.danger,
      label: this.video.title,
      title: 'Remove video',
      size: 'xs',
      content: 'Are you sure you want to remove this video?',
      buttons: [
        { type: ModalButtonType.secondary, text: 'Close' },
        { type: ModalButtonType.danger, text: 'Remove', click: () => this.removeVid() },
      ],
    });
  }

  private removeVid() {
    this.service.removeVideo(this.video.id).subscribe({
      next: async () => {
        await this.router.navigate(['video']);
      },
    });
  }
}
