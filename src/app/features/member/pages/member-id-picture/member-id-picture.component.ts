import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-id-picture',
  templateUrl: './member-id-picture.component.html',
  styleUrls: ['./member-id-picture.component.scss'],
})
export class MemberIdPictureComponent implements OnInit {
  public readonly paths: string[];
  constructor(private route: ActivatedRoute) {
    const memberId = this.route.snapshot.paramMap.get('memberId');
    const basePath = `/media/member/${memberId}`;
    const formats = ['avif', 'webp', 'jpeg'];
    const sizes = ['xl', 'lg', 'md', 'sm'];
    this.paths = sizes.flatMap((size) => formats.map((format) => `${basePath}/${size}.${format}`));
  }

  ngOnInit(): void {
    console.log(this.paths);
  }
}
