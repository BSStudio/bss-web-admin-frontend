import { Component } from '@angular/core'
import { MetricsService } from '../services/metrics.service'
import { AsyncPipe, DecimalPipe, NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'
import { catchError } from 'rxjs'
import { CardModule } from 'primeng/card'
import { Metrics } from '../models/metrics.model'

@Component({
  selector: 'app-metrics',
  standalone: true,
  template: `
    <ng-template [ngIf]="metrics$ | async" let-metrics>
      <p-card [routerLink]="['video']">
        <span i18n>Videos</span>
        <h1>{{ metrics.videoCount | number }}</h1>
      </p-card>
      <p-card [routerLink]="['event']">
        <span i18n>Events</span>
        <h1>{{ metrics.eventCount | number }}</h1>
      </p-card>
      <p-card [routerLink]="['member']">
        <span i18n>Members</span>
        <h1>{{ metrics.memberCount | number }}</h1>
      </p-card>
    </ng-template>
  `,
  styleUrls: ['./metrics.component.css'],
  imports: [NgIf, AsyncPipe, RouterLink, DecimalPipe, CardModule],
})
export class MetricsComponent {
  protected readonly metrics$ = this.service
    .getMetrics()
    .pipe(catchError(() => [new Metrics(1, 2, 3)]))

  constructor(private service: MetricsService) {}
}
