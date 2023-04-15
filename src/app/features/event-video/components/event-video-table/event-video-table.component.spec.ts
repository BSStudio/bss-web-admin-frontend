import { EventVideoTableComponent } from './event-video-table.component'
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { DetailedEvent } from '../../../event/models'
import {
  Table,
  TableContainer,
  TableHeaderItem,
  TableItem,
  TableModule,
  TableToolbarContent,
} from 'carbon-components-angular'
import { Video } from '../../../video/models'
import { RouterLink } from '@angular/router'
import { EventVideoRemoveButtonComponent } from '../event-video-remove-button/event-video-remove-button.component'
import { EventVideoModule } from '../../event-video.module'
import { BooleanPipe } from '../../../../shared/pipes/boolean.pipe'
import { EventVideoAddFormComponent } from '../event-video-add-form/event-video-add-form.component'

describe('EventVideoTableComponent', () => {
  beforeEach(() => MockBuilder([EventVideoTableComponent, TableModule], EventVideoModule))
  const detailedEvent = new DetailedEvent('id', 'url', 'title', 'description', 'date', true, [])
  const video = new Video('id', 'url', 'title', 'uploadedAt', true)
  const detailedEventWithVideo: DetailedEvent = { ...detailedEvent, videos: [video] }

  it('should create', () => {
    const fixture = MockRender(EventVideoTableComponent, {
      event: detailedEvent,
    })
    expect(fixture.point.componentInstance.event).toEqual(detailedEvent)
    expect(fixture.point.componentInstance.table.header).toEqual([
      new TableHeaderItem({ data: 'Title', compare: jasmine.any(Function) }),
      new TableHeaderItem({ data: 'Url' }),
      new TableHeaderItem({ data: 'Uploaded at' }),
      new TableHeaderItem({ data: 'Visible' }),
      new TableHeaderItem({ style: { padding: 0, width: 0 }, sortable: false }),
    ])
  })

  it('should have an add form', () => {
    MockRender(EventVideoTableComponent, {
      event: detailedEvent,
    })

    const container = ngMocks.find(TableContainer)
    const toolbarContent = ngMocks.find(container, TableToolbarContent)
    const addForm = ngMocks.findInstance(toolbarContent, EventVideoAddFormComponent)

    expect(addForm.event).toEqual(detailedEvent)
  })

  it('should have a table', () => {
    const fixture = MockRender(EventVideoTableComponent, {
      event: detailedEvent,
    })

    const container = ngMocks.find(TableContainer)
    const table = ngMocks.findInstance(container, Table)
    expect(table.model).toEqual(fixture.point.componentInstance.table)
    expect(table.sortable).toBeTrue()
    expect(table.striped).toBeFalse()
    expect(table.showSelectionColumn).toBeTrue()
    expect(table.size).toBe('sh')
  })

  describe('row', () => {
    it('should render', () => {
      MockInstance(BooleanPipe, 'transform', (b) => (b ? 'true' : 'false'))
      const fixture = MockRender(EventVideoTableComponent, { event: detailedEventWithVideo })

      expect(fixture.point.componentInstance.table.data).toEqual([
        [
          new TableItem({
            title: video.id,
            data: video,
            template: fixture.point.componentInstance.navigateCell,
          }),
          new TableItem({ title: video.title, data: video.url }),
          new TableItem({ title: video.title, data: video.uploadedAt }),
          new TableItem({ title: video.title, data: 'true' }),
          new TableItem({
            title: video.title,
            data: video,
            template: fixture.point.componentInstance.removeButtonCell,
          }),
        ],
      ])
    })
    it('should have a link to the video', () => {
      MockRender(EventVideoTableComponent, { event: detailedEventWithVideo })

      const anchor = ngMocks.find('a')
      expect(ngMocks.formatText(anchor)).toBe(video.title)

      const routerLink = ngMocks.findInstance(anchor, RouterLink)
      expect(routerLink.routerLink).toEqual(['/video', video.id])
    })
    it('should have a remove button', () => {
      MockRender(EventVideoTableComponent, { event: detailedEventWithVideo })

      const removeButton = ngMocks.findInstance(EventVideoRemoveButtonComponent)

      expect(removeButton.video).toEqual(video)
      expect(removeButton.event).toEqual(detailedEventWithVideo)
    })
  })
})
