import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../models/member.model';

interface SourceSet {
  type: string;
  media: string;
  srcset: string;
}

@Component({
  selector: 'app-member-profile-picture[member]',
  template: `
    <figure>
      <picture>
        <source
          *ngFor="let image of sources"
          [type]="image.type"
          [media]="image.media"
          [srcset]="image.srcset + refreshParam"
        />
        <img #img ngSrc="/assets/fallback.jpg" fill alt="{{ member.name }}'s profile picture" i18n-alt />
      </picture>
      <figcaption>{{ img.alt }}</figcaption>
    </figure>
  `,
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
        media: '',
        srcset: `${basePath}/${size}.${format}`,
      }))
    );
  }

  updateImage() {
    const time = new Date().getTime().toString();
    this.refreshParam = `?${new URLSearchParams({ time })}`;
  }
}
