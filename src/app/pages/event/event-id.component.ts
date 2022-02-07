import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-video-id',
  templateUrl: './event-id.component.html',
  styleUrls: ['./event-id.component.scss'],
})
export class EventIdComponent {
  public eventId: Observable<string>;
  constructor(route: ActivatedRoute) {
    this.eventId = route.params.pipe(map((p) => p['eventId']));
  }
}
