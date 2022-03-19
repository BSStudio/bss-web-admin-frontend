import { VideoService } from '../service/video.service';
import { Component, Input } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateVideo } from '../service/video.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-video-modal',
  templateUrl: './create-video-modal.component.html',
})
export class CreateVideoModalComponent extends BaseModal {
  readonly text = {
    header: 'Videó létrehozása',
    form: {
      title: {
        label: 'Videó címe',
        placeholder: 'Szobakommandó',
      },
      url: {
        helper: 'Ezen az url-en keresztül lesz elérhető a videó. Pl: https://bsstudio.hu/video/szobakommando-bss',
        label: 'Leíró URL',
        placeholder: 'szobakommando-bss',
      },
    },
    cancelButton: 'Mégse',
    addButton: 'Létrehozás',
  };
  readonly createVideoForm: FormGroup;

  constructor(private videoService: VideoService, private router: Router) {
    super();
    this.createVideoForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
      url: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
    });
  }

  onSubmit() {
    if (this.createVideoForm.valid) {
      this.createVideo();
    }
  }

  private createVideo() {
    const createVideo = this.createVideoForm.getRawValue() as CreateVideo;
    this.videoService.createVideo(createVideo).subscribe({
      next: ({ id }) => this.router.navigate(['/video', id]),
    });
  }
}
