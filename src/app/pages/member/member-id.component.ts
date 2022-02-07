import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-video-id',
  templateUrl: './member-id.component.html',
  styleUrls: ['./member-id.component.scss'],
})
export class MemberIdComponent {
  public memberId: Observable<string>;
  constructor(route: ActivatedRoute) {
    this.memberId = route.params.pipe(map((p) => p['memberId']));
  }
}
