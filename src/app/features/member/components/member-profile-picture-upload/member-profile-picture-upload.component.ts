import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileItem } from 'carbon-components-angular';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs';
import { MemberMediaService } from '../../services/member-media.service';

@Component({
  selector: 'app-member-profile-picture-upload',
  templateUrl: './member-profile-picture-upload.component.html',
  styleUrls: ['./member-profile-picture-upload.component.scss'],
})
export class MemberProfilePictureUploadComponent {
  @Input() memberId: string = '';
  @Output() update = new EventEmitter<void>();
  public files = new Set<FileItem>();

  constructor(private mediaService: MemberMediaService) {}

  upload() {
    if (this.files.size !== 1) return;
    this.files.forEach((file) => {
      if (file.file.size > 25_000_000) {
        file.state = 'edit';
        file.invalid = true;
        file.invalidText = 'File is bigger than 25MB';
        return;
      }
      this.mediaService
        .uploadPicture(this.memberId, file.file)
        .pipe(tap((event) => this.onHttpEventUpdate(event, file)))
        .subscribe();
    });
  }

  private onHttpEventUpdate(event: HttpEvent<Object>, file: FileItem) {
    switch (event.type) {
      case HttpEventType.Sent:
        file.invalid = true;
        file.invalidText = '';
        break;
      case HttpEventType.UploadProgress:
        file.state = 'upload';
        break;
      case HttpEventType.ResponseHeader:
        if (!event.ok) {
          file.state = 'edit';
          file.uploaded = false;
          file.invalid = true;
          file.invalidText = `Error: ` + event.statusText;
        }
        break;
      case HttpEventType.DownloadProgress:
        if (event.loaded === event.total) {
          file.state = 'complete';
          file.uploaded = true;
          this.update.emit();
        }
    }
  }

  get hasFile() {
    return this.files.size !== 0;
  }
}