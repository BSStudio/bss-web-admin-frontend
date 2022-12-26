import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { DetailedEvent } from '../../models'

@Component({
  selector: 'app-video-id',
  styleUrls: ['event-id.component.scss'],
  template: `
    <app-breadcrumb [title]="event.title" parentRoute="event" parentTitle="Events" i18n-parentTitle></app-breadcrumb>
    <section id="event-title">
      <h1 i18n>Update event</h1>
      <app-event-remove-button [event]="event"></app-event-remove-button>
    </section>
    <section id="metadata">
      <h2 i18n>Metadata</h2>
      <app-event-update-form [event]="event" (update)="setEvent($event)"></app-event-update-form>
    </section>
    <section id="event-videos">
      <h2 i18n>Manage event videos</h2>
      <app-event-video-table [event]="event" (update)="setEvent($event)"></app-event-video-table>
    </section>
  `,
})
export class EventIdComponent {
  public event: DetailedEvent

  constructor(private route: ActivatedRoute) {
    this.event = <DetailedEvent>this.route.snapshot.data['event']
  }

  setEvent(event: DetailedEvent) {
    this.event = event
  }
}
