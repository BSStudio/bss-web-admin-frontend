import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-id-picture',
  templateUrl: './member-id-picture.component.html',
  styleUrls: ['./member-id-picture.component.scss'],
})
export class MemberIdPictureComponent {
  private static FORMATS = ['avif', 'webp', 'jpeg'];
  private static SIZES = ['xl', 'lg', 'md', 'sm'];
  public readonly paths: string[];
  constructor(private route: ActivatedRoute) {
    const memberId = this.route.snapshot.paramMap.get('memberId');
    const basePath = `/media/member/${memberId}`;
    this.paths = MemberIdPictureComponent.SIZES.flatMap((size) =>
      MemberIdPictureComponent.FORMATS.map((format) => `${basePath}/${size}.${format}`)
    );
  }
}
