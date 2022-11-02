import { Component, OnDestroy, OnInit } from '@angular/core';
import { MetricsService } from '../services/metrics.service';
import { Metrics } from '../models/metrics.model';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-metrics',
  template: `
    <ng-template [ngIf]="metrics">
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
export class MetricsComponent implements OnInit, OnDestroy {
  public metrics?: Metrics;
  private readonly destroy$ = new Subject<boolean>();

  constructor(private service: MetricsService) {}

  ngOnInit() {
    this.service
      .getMetrics()
      .pipe(
        tap((metrics) => (this.metrics = metrics)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
