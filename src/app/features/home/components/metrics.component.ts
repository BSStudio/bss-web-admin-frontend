import { Component } from '@angular/core';
import { MetricsService } from '../services/metrics.service';

@Component({
  selector: 'app-metrics',
  template: `
    <ng-template [ngIf]="metrics$ | async" let-metrics>
      <ibm-clickable-tile [route]="['video']" href="video">
        <label i18n>Videos</label>
        <h1>{{ metrics.videoCount | number }}</h1>
      </ibm-clickable-tile>
      <ibm-clickable-tile [route]="['event']" href="event">
        <label i18n>Events</label>
        <h1>{{ metrics.eventCount | number }}</h1>
      </ibm-clickable-tile>
      <ibm-clickable-tile [route]="['member']" href="member">
        <label i18n>Members</label>
        <h1>{{ metrics.memberCount | number }}</h1>
      </ibm-clickable-tile>
    </ng-template>
  `,
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent {
  public metrics$ = this.service.getMetrics();

  constructor(private service: MetricsService) {}
}
