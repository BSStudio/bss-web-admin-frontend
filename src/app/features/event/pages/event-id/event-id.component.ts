import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailedEvent } from '../../models';

@Component({
  selector: 'app-video-id',
  template: `
    <app-event-breadcrumb [title]="event.title"></app-event-breadcrumb>
    <h1 i18n>Update event</h1>
    <h2 i18n>Metadata</h2>
    <app-event-update-form [event]="event" (update)="setEvent($event)"></app-event-update-form>
    <h2 i18n>Manage event videos</h2>
    <app-event-video-table [event]="event" (update)="setEvent($event)"></app-event-video-table>
  `,
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
