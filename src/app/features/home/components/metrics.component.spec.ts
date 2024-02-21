import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { EMPTY, of } from 'rxjs'
import { MetricsComponent } from './metrics.component'
import { Metrics } from '../models/metrics.model'
import { MetricsService } from '../services/metrics.service'

describe('MetricsComponent', () => {
  const metrics = new Metrics(1, 2, 3)
  beforeEach(() => MockBuilder(MetricsComponent))

  it('should have no tiles', () => {
    MockInstance(MetricsService, (instance) =>
      ngMocks.stub(instance, { getMetrics: () => EMPTY }),
    )
    MockRender(MetricsComponent)
    const tiles = ngMocks.findAll('div')
    expect(tiles.length).toBe(0)
  })

  xit('should render tiles after service resolved', async () => {
    MockInstance(MetricsService, () => ({ getMetrics: () => of(metrics) }))
    MockRender(MetricsComponent)

    const tiles = ngMocks.findAll('div')
    expect(tiles.length).toBe(3)
    const [videoTile, eventTile, memberTile] = tiles

    expect(videoTile.properties['route']).toEqual(['video'])
    const videoLabel = ngMocks.find(videoTile, 'label')
    expect(ngMocks.formatText(videoLabel)).toBe('Videos')
    const videoCountHeader = ngMocks.find(videoTile, 'h1')
    expect(ngMocks.formatText(videoCountHeader)).toBe(`${metrics.videoCount}`)

    expect(eventTile.properties['route']).toEqual(['event'])
    const eventLabel = ngMocks.find(eventTile, 'label')
    expect(ngMocks.formatText(eventLabel)).toBe('Events')
    const eventCountHeader = ngMocks.find(eventTile, 'h1')
    expect(ngMocks.formatText(eventCountHeader)).toBe(`${metrics.eventCount}`)

    expect(memberTile.properties['route']).toEqual(['member'])
    const memberLabel = ngMocks.find(memberTile, 'label')
    expect(ngMocks.formatText(memberLabel)).toBe('Members')
    const memberCountHeader = ngMocks.find(memberTile, 'h1')
    expect(ngMocks.formatText(memberCountHeader)).toBe(`${metrics.memberCount}`)
  })
})
