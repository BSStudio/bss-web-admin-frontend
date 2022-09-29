import { VideoService } from '../../data/video/service/video.service';
import { Component } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateVideo } from '../../data/video/model';

@Component({
  selector: 'app-create-video-modal',
  templateUrl: './create-video-modal.component.html',
})
export class CreateVideoModalComponent extends BaseModal {
  public readonly createVideoForm: FormGroup<{ title: FormControl<string>; url: FormControl<string> }>;

  constructor(private videoService: VideoService, private router: Router, private fb: FormBuilder) {
    super();
    this.createVideoForm = fb.nonNullable.group<CreateVideo>({
      title: '',
      url: '',
    });
  }

  onSubmit() {
    const { url, title } = this.createVideoForm.value;
    if (this.createVideoForm.valid && url && title) {
      this.createVideo({ url, title });
    }
  }

  private createVideo(createVideo: CreateVideo) {
    this.videoService
      .createVideo(createVideo) //
      .subscribe({
        next: async ({ id }) => {
          this.close.emit(true);
          await this.router.navigate(['/video', id]);
        },
        error: (err) => console.error(err),
      });
  }
}
