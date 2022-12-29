import { EventVideoTableComponent } from './event-video-table.component'
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks'
import { DetailedEvent } from '../../../event/models'
import {
  Button,
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

describe('EventVideoTableComponent', () => {
  beforeEach(() => MockBuilder([EventVideoTableComponent, TableModule, BooleanPipe], EventVideoModule))
  const detailedEvent = new DetailedEvent('id', 'url', 'title', 'description', 'date', true, [])
  const video = new Video('id', 'url', 'title', 'uploadedAt', true)
  const detailedEventWithVideo: DetailedEvent = { ...detailedEvent, videos: [video] }

  it('should create', () => {
    const fixture = MockRender(EventVideoTableComponent, {
      event: detailedEvent,
    })
    expect(fixture.point.componentInstance.event).toEqual(detailedEvent)
    expect(fixture.point.componentInstance.table.header).toEqual([
      new TableHeaderItem({ data: 'Title' }),
      new TableHeaderItem({ data: 'Url' }),
      new TableHeaderItem({ data: 'Uploaded at' }),
      new TableHeaderItem({ style: { padding: 0, width: 0 } }),
    ])
  })

  it('should have an add button', () => {
    MockRender(EventVideoTableComponent, {
      event: detailedEvent,
    })

    const container = ngMocks.find(TableContainer)
    const toolbarContent = ngMocks.find(container, TableToolbarContent)
    const addButton = ngMocks.find(toolbarContent, 'button')
    expect(ngMocks.formatText(addButton)).toBe('Add new video')
    const addButtonDirective = ngMocks.findInstance(addButton, Button)
    expect(addButtonDirective.ibmButton).toBe('primary')
  })

  it('should have a table', () => {
    const fixture = MockRender(EventVideoTableComponent, {
      event: detailedEvent,
    })

    const container = ngMocks.find(TableContainer)
    const table = ngMocks.findInstance(container, Table)
    expect(table.model).toEqual(fixture.point.componentInstance.table)
    expect(table.sortable).toBeFalse()
    expect(table.striped).toBeFalse()
    expect(table.showSelectionColumn).toBeFalse()
    expect(table.size).toBe('sh')
  })

  describe('row', () => {
    it('should render', () => {
      const fixture = MockRender(EventVideoTableComponent, { event: detailedEventWithVideo })

      expect(fixture.point.componentInstance.table.data).toEqual([
        [
          new TableItem({
            title: video.title,
            data: video,
            template: fixture.point.componentInstance.navigateCell,
          }),
          new TableItem({ title: video.title, data: video.url }),
          new TableItem({ title: video.title, data: video.uploadedAt }),
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
