import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../data/metrics/service/metrics.service';
import { Metrics } from '../data/metrics/model/metrics.model';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit {
  public metrics?: Metrics;

  constructor(private service: MetricsService) {}

  ngOnInit() {
    this.service.getMetrics().subscribe({
      next: (metrics) => {
        this.metrics = metrics;
      },
    });
  }
}
