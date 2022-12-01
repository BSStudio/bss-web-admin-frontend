import { EventTableComponent } from './event-table.component'
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { EventModule } from '../../event.module'
import { EventService } from '../../services/event.service'
import { of } from 'rxjs'
import { Event } from '../../models'
import {
  Button,
  IconDirective,
  ModalService,
  Table,
  TableContainer,
  TableHeaderItem,
  TableItem,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
} from 'carbon-components-angular'
import { BooleanPipe } from '../../../../shared/pipes/boolean.pipe'
import { EventCreateModalComponent } from '../event-create-modal/event-create-modal.component'
import { Router } from '@angular/router'

describe('EventTableComponent', () => {
  const event = new Event('0', 'url', 'title', 'description', '2022-01-01', true)
  beforeEach(() =>
    MockBuilder([EventTableComponent, BooleanPipe], EventModule).mock(EventService, {
      getEvents: jasmine.createSpy('getEvents').and.callFake(() => of([event])),
    })
  )

  it('should create', () => {
    const fixture = MockRender(EventTableComponent)

    expect(fixture.point.componentInstance.searchValue).toBe('')
    expect(fixture.point.componentInstance.table.header).toEqual([
      new TableHeaderItem({ data: 'Title' }),
      new TableHeaderItem({ data: 'URL' }),
      new TableHeaderItem({ data: 'Date' }),
      new TableHeaderItem({ data: 'Visible' }),
    ])
    expect(fixture.point.componentInstance.table.data).toEqual([
      [
        new TableItem({ data: event.title, title: event.id }),
        new TableItem({ data: event.url }),
        new TableItem({ data: event.date }),
        new TableItem({ data: 'true' }),
      ],
    ])
  })

  it('should have a toolbar with search', () => {
    const fixture = MockRender(EventTableComponent)

    const container = ngMocks.find(TableContainer)
    const toolbar = ngMocks.find(container, TableToolbar)
    const toolbarContent = ngMocks.find(toolbar, TableToolbarContent)
    const toolbarSearch = ngMocks.findInstance(toolbarContent, TableToolbarSearch)
    expect(toolbarSearch.expandable).toBeTrue()
    toolbarSearch.valueChange.emit('searchTerm')
    expect(fixture.point.componentInstance.searchValue).toBe('searchTerm')
    toolbarSearch.clear.emit()
    expect(fixture.point.componentInstance.searchValue).toBe('')
  })

  it('should have a toolbar with refresh button', () => {
    MockRender(EventTableComponent)

    const container = ngMocks.find(TableContainer)
    const toolbar = ngMocks.find(container, TableToolbar)
    const toolbarContent = ngMocks.find(toolbar, TableToolbarContent)
    const button = ngMocks.find(toolbarContent, 'button')

    const buttonDirective = ngMocks.findInstance(button, Button)
    expect(buttonDirective.ibmButton).toBe('secondary')
    expect(buttonDirective.iconOnly).toBeTrue()
    expect(buttonDirective.hasAssistiveText).toBeTrue()

    const buttonText = ngMocks.find(button, 'span.bx--assistive-text')
    expect(ngMocks.formatText(buttonText)).toBe('Refresh')

    const buttonIcon = ngMocks.find(button, 'svg.bx--btn__icon')
    const iconDirective = ngMocks.findInstance(buttonIcon, IconDirective)
    expect(iconDirective.ibmIcon).toBe('renew')
    expect(iconDirective.size).toBe('16')

    ngMocks.click(button)
    const service = ngMocks.findInstance(EventService)
    expect(service.getEvents).toHaveBeenCalledTimes(2)
  })

  it('should have a toolbar with an add button', () => {
    MockInstance(ModalService, (instance) =>
      ngMocks.stub(instance, {
        create: jasmine
          .createSpy('create')
          .and.returnValue({ onDestroy: jasmine.createSpy('onDestroy').and.callFake((fn: Function) => fn()) }),
      })
    )
    MockRender(EventTableComponent)

    const container = ngMocks.find(TableContainer)
    const toolbar = ngMocks.find(container, TableToolbar)
    const toolbarContent = ngMocks.find(toolbar, TableToolbarContent)
    const addButton = ngMocks.findAll(toolbarContent, 'button')[1]

    const buttonDirective = ngMocks.findInstance(addButton, Button)
    expect(buttonDirective.ibmButton).toBe('primary')

    expect(ngMocks.formatText(addButton)).toBe('Add new event')

    const buttonIcon = ngMocks.find(addButton, 'svg.bx--btn__icon')
    const iconDirective = ngMocks.findInstance(buttonIcon, IconDirective)
    expect(iconDirective.ibmIcon).toBe('add')
    expect(iconDirective.size).toBe('16')

    ngMocks.click(addButton)
    const modalService = ngMocks.findInstance(ModalService)
    expect(modalService.create).toHaveBeenCalledWith({ component: EventCreateModalComponent })

    const service = ngMocks.findInstance(EventService)
    expect(service.getEvents).toHaveBeenCalledTimes(2)
  })

  it('should have a table', () => {
    const fixture = MockRender(EventTableComponent)
    const table = ngMocks.findInstance(Table)

    expect(table.model).toEqual(fixture.point.componentInstance.table)
    expect(table.sortable).toBeFalse()
    expect(table.showSelectionColumn).toBeFalse()
    expect(table.striped).toBeFalse()
    expect(table.size).toBe('sh')

    table.rowClick.emit(0)

    const router = ngMocks.findInstance(Router)

    expect(router.navigate).toHaveBeenCalledWith(['event', event.id])
  })
})
