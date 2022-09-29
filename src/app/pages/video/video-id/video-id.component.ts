import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from '../../../data/video/service/video.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalData, AlertModalType, ModalButtonType, ModalService } from 'carbon-components-angular';
import { DetailedVideo, UpdateVideo } from '../../../data/video/model';

@Component({
  selector: 'app-video-id',
  templateUrl: './video-id.component.html',
  styleUrls: ['./video-id.component.scss'],
})
export class VideoIdComponent {
  public video: DetailedVideo;
  public videoForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: VideoService,
    private fb: FormBuilder,
    private modalService: ModalService
  ) {
    this.video = <DetailedVideo>this.route.snapshot.data['video'];
    const { id, crew, ...modifiableValues } = this.video;
    this.videoForm = this.fb.group<UpdateVideo>(modifiableValues);
  }

  public updateVideo() {
    const { url, videoUrl, title, thumbnailUrl, visible, uploadedAt, description } = this.videoForm.value;
    if (!this.videoForm.valid) {
      return;
    }
    this.service
      .updateVideo(this.video.id, { url, videoUrl, title, thumbnailUrl, visible, uploadedAt, description })
      .subscribe();
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
