import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../services/metrics.service';
import { Metrics } from '../models/metrics.model';

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
