import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailedEvent } from '../../models';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-video-id',
  templateUrl: './event-id.component.html',
  styleUrls: ['./event-id.component.scss'],
})
export class EventIdComponent {
  public event: DetailedEvent;

  constructor(private route: ActivatedRoute) {
    this.event = <DetailedEvent>this.route.snapshot.data['event'];
  }

  setEvent(event: DetailedEvent) {
    this.event = event;
  }
}
