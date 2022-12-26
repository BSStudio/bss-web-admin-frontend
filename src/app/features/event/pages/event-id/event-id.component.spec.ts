import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { EventIdComponent } from './event-id.component'
import { RouterTestingModule } from '@angular/router/testing'
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router'
import { DetailedEvent } from '../../models'
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component'
import { EventModule } from '../../event.module'
import { EventUpdateFormComponent } from '../../components/event-update-form/event-update-form.component'
import { EventVideoTableComponent } from '../../../event-video/components/event-video-table/event-video-table.component'
import { EventEmitter } from '@angular/core'

describe('EventIdComponent', () => {
  const detailedEvent = new DetailedEvent('id', 'url', 'title', 'description', 'date', true, [])
  const updatedDetailedEvent = new DetailedEvent('id', 'url', 'title', 'desc', '2023-01-01', false, [])
  const fakeRoute = {
    snapshot: {
      data: { event: detailedEvent },
    } as Partial<ActivatedRouteSnapshot>,
  } as ActivatedRoute
  beforeEach(() => MockBuilder([EventIdComponent, RouterTestingModule], EventModule).mock(ActivatedRoute, fakeRoute))

  it('should render', () => {
    const fixture = MockRender(EventIdComponent)

    expect(fixture.point.componentInstance.event).toEqual(detailedEvent)
  })

  it('should have a breadcrumb', () => {
    MockRender(EventIdComponent)

    const breadcrumb = ngMocks.findInstance(BreadcrumbComponent)

    expect(breadcrumb.title).toBe(detailedEvent.title)
    expect(breadcrumb.parentRoute).toBe('event')
    expect(breadcrumb.parentTitle).toBe('Events')
  })

  describe('metadata section', () => {
    it('should render', () => {
      MockRender(EventIdComponent)

      const section = ngMocks.find('section#metadata')

      const h2 = ngMocks.find(section, 'h2')
      expect(ngMocks.formatText(h2)).toBe('Metadata')
      const form = ngMocks.findInstance(section, EventUpdateFormComponent)
      expect(form.event).toEqual(detailedEvent)
    })

    it('should update', () => {
      const update = new EventEmitter<DetailedEvent>()
      MockInstance(EventUpdateFormComponent, (instance) => ngMocks.stub(instance, { update }))
      const fixture = MockRender(EventIdComponent)

      const section = ngMocks.find('section#metadata')

      const form = ngMocks.findInstance(section, EventUpdateFormComponent)
      expect(form.event).toEqual(detailedEvent)
      expect(fixture.point.componentInstance.event).toEqual(detailedEvent)

      update.emit(updatedDetailedEvent)
      expect(fixture.point.componentInstance.event).toEqual(updatedDetailedEvent)
      expect(form.event).toEqual(updatedDetailedEvent)
    })
  })

  describe('video section', () => {
    it('should render', () => {
      MockRender(EventIdComponent)

      const section = ngMocks.find('section#metadata')

      const h2 = ngMocks.find(section, 'h2')
      expect(ngMocks.formatText(h2)).toBe('Manage event videos')
      const videoTable = ngMocks.findInstance(section, EventVideoTableComponent)
      expect(videoTable.event).toEqual(detailedEvent)
    })

    it('should update', () => {
      const update = new EventEmitter<DetailedEvent>()
      MockInstance(EventVideoTableComponent, (instance) => ngMocks.stub(instance, { update }))
      const fixture = MockRender(EventIdComponent)

      const section = ngMocks.find('section#metadata')

      const videoTable = ngMocks.findInstance(section, EventVideoTableComponent)
      expect(videoTable.event).toEqual(detailedEvent)
      expect(fixture.point.componentInstance.event).toEqual(detailedEvent)

      update.emit(updatedDetailedEvent)
      expect(fixture.point.componentInstance.event).toEqual(updatedDetailedEvent)
      expect(videoTable.event).toEqual(updatedDetailedEvent)
    })
  })
})
