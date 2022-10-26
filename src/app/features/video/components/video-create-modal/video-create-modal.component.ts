import { VideoService } from '../../services/video.service';
import { Component, OnDestroy } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CreateVideo } from '../../models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-video-create-modal',
  templateUrl: './video-create-modal.component.html',
})
export class VideoCreateModalComponent extends BaseModal implements OnDestroy {
  public readonly createVideoForm: FormGroup<{ title: FormControl<string>; url: FormControl<string> }>;
  private readonly destroy$ = new Subject<boolean>();

  constructor(private videoService: VideoService, private fb: FormBuilder) {
    super();
    this.createVideoForm = fb.nonNullable.group<CreateVideo>({
      title: '',
      url: '',
    });
  }

  onSubmit() {
    if (this.createVideoForm.valid) {
      this.createVideo(this.createVideoForm.getRawValue());
    }
  }

  private createVideo(createVideo: CreateVideo) {
    this.videoService.createVideo(createVideo).pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
