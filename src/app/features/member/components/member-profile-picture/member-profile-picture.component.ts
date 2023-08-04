import { Component, Input, OnInit } from '@angular/core'
import { Member } from '../../models'

interface SourceSet {
  type: string
  media: string
  srcset: string
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
        <img #img [src]="fallback" alt="{{ member.name }}'s profile picture" i18n-alt (error)="onError($event)" />
      </picture>
      <figcaption *ngIf="showCaption">{{ img.alt }}</figcaption>
    </figure>
  `,
})
export class MemberProfilePictureComponent implements OnInit {
  private static FORMATS = ['avif', 'webp', 'jpeg']
  private static SIZES = ['xl', 'lg', 'md', 'sm']
  public readonly fallback = '/assets/fallback.jpg'
  public sources: SourceSet[] = []
  public refreshParam = ''

  @Input() member!: Member
  @Input() showCaption = false

  ngOnInit() {
    const basePath = `/media/assets/m/${this.member.id}`
    const { SIZES, FORMATS } = MemberProfilePictureComponent
    this.sources = SIZES.flatMap((size) =>
      FORMATS.map((format) => ({
        type: `image/${format}`,
        media: '',
        srcset: `${basePath}/${size}.${format}`,
      })),
    )
  }

  onError(event: ErrorEvent) {
    this.sources[0].srcset = this.fallback
  }

  updateImage() {
    const time = new Date().getTime().toString()
    this.refreshParam = `?${new URLSearchParams({ time })}`
  }
}
