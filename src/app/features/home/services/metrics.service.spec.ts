import { MockBuilder, ngMocks } from 'ng-mocks'
import { MetricsService } from './metrics.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Metrics } from '../models/metrics.model'
import { tap } from 'rxjs'

describe('MetricsService', () => {
  const metrics = new Metrics(1, 2, 3)
  beforeEach(() => MockBuilder([MetricsService, HttpClientTestingModule]))

  it('should return metrics', (done) => {
    const service = ngMocks.findInstance(MetricsService)
    const httpMock = ngMocks.findInstance(HttpTestingController)

    service
      .getMetrics()
      .pipe(tap((actual) => expect(actual).toEqual(metrics)))
      .subscribe({ complete: () => done() })

    const req = httpMock.expectOne('/api/v1/metrics')
    expect(req.request.method).toBe('GET')
    req.flush(metrics)
    httpMock.verify()
  })
})
