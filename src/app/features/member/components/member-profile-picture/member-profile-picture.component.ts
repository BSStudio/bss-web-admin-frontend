import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../models/member.model';

interface SourceSet {
  type: string;
  srcset: string;
}

@Component({
  selector: 'app-member-profile-picture[member]',
  templateUrl: './member-profile-picture.component.html',
})
export class MemberProfilePictureComponent implements OnInit {
  private static FORMATS = ['avif', 'webp', 'jpeg'];
  private static SIZES = ['xl', 'lg', 'md', 'sm'];
  public sources: SourceSet[] = [];
  public refreshParam = '';

  @Input() member!: Member;

  ngOnInit() {
    const basePath = `/media/assets/m/${this.member.id}`;
    const { SIZES, FORMATS } = MemberProfilePictureComponent;
    this.sources = SIZES.flatMap((size) =>
      FORMATS.map((format) => ({
        type: `image/${format}`,
        srcset: `${basePath}/${size}.${format}`,
      }))
    );
  }

  updateImage() {
    this.refreshParam = '?' + new URLSearchParams({ t: new Date().getTime().toString() }).toString();
  }
}
