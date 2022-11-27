import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { Subject } from 'rxjs';
import { MetricsComponent } from './metrics.component';
import { ClickableTile } from 'carbon-components-angular';
import { Metrics } from '../models/metrics.model';
import { MetricsService } from '../services/metrics.service';

describe('MetricsComponent', () => {
  const videoCount = 1;
  const eventCount = 2;
  const memberCount = 3;
  const metrics = new Metrics(videoCount, eventCount, memberCount);
  let metrics$: Subject<Metrics>;
  beforeEach(() => {
    metrics$ = new Subject<Metrics>();
    return MockBuilder(MetricsComponent).mock(MetricsService, {
      getMetrics: () => metrics$,
    });
  });

  it('should have no tiles', () => {
    MockRender(MetricsComponent);
    const tiles = ngMocks.findAll(ClickableTile);
    expect(tiles.length).toBe(0);
  });

  it('should render tiles after service resolved', () => {
    const fixture = MockRender(MetricsComponent);

    metrics$.next(metrics);
    fixture.detectChanges();

    const tiles = ngMocks.findAll(ClickableTile);
    expect(tiles.length).toBe(3);
    const [videoTile, eventTile, memberTile] = tiles;

    expect(videoTile.componentInstance.route).toEqual(['video']);
    expect(videoTile.componentInstance.href).toBe('video');
    expect(ngMocks.find<HTMLLabelElement>(videoTile, 'label').nativeElement.innerHTML).toBe('Videos');
    expect(ngMocks.find<HTMLHeadingElement>(videoTile, 'h1').nativeElement.innerHTML).toBe(`${videoCount}`);

    expect(eventTile.componentInstance.route).toEqual(['event']);
    expect(eventTile.componentInstance.href).toBe('event');
    expect(ngMocks.find<HTMLLabelElement>(eventTile, 'label').nativeElement.innerHTML).toBe('Events');
    expect(ngMocks.find<HTMLHeadingElement>(eventTile, 'h1').nativeElement.innerHTML).toBe(`${eventCount}`);

    expect(memberTile.componentInstance.route).toEqual(['member']);
    expect(memberTile.componentInstance.href).toBe('member');
    expect(ngMocks.find<HTMLLabelElement>(memberTile, 'label').nativeElement.innerHTML).toBe('Members');
    expect(ngMocks.find<HTMLHeadingElement>(memberTile, 'h1').nativeElement.innerHTML).toBe(`${memberCount}`);
  });
});
