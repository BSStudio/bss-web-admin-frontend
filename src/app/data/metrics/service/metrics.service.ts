import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Metrics } from '../model/metrics.model';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  constructor(private http: HttpClient) {}

  getMetrics() {
    return this.http.get<Metrics>('/api/metrics');
  }
}
