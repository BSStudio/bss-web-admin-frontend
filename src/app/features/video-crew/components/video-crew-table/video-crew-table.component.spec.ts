import { VideoCrewTableComponent } from './video-crew-table.component'
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { VideoCrewModule } from '../../video-crew.module'
import { DetailedVideo } from '../../../video/models'
import {
  Button,
  IconDirective,
  ModalService,
  Table,
  TableContainer,
  TableHeaderItem,
  TableItem,
  TableModule,
  TableToolbarContent,
} from 'carbon-components-angular'
import { VideoCrewAddModalComponent } from '../video-crew-add-modal/video-crew-add-modal.component'
import { CrewMember } from '../../models'
import { VideoCrewService } from '../../services/video-crew.service'
import { of } from 'rxjs'
import { VideoCrewRemoveButtonComponent } from '../video-crew-remove-button/video-crew-remove-button.component'
import { SimpleMember } from '../../../member/models/simple-member.model'
import { ComponentRef } from '@angular/core'
import { ComponentFixture } from '@angular/core/testing'

describe('VideoCrewTableComponent', () => {
  beforeEach(() => MockBuilder([VideoCrewTableComponent, TableModule], VideoCrewModule))
  const member = new SimpleMember('id', 'name')
  const crewMember = new CrewMember('memberId', 'position', member)
  const detailedVideo = new DetailedVideo('id', 'url', 'title', 'description', 'uploadedAt', true, [crewMember])

  it('should create', () => {
    const fixture = MockRender(VideoCrewTableComponent, { video: detailedVideo })

    expect(fixture.point.componentInstance.video).toEqual(detailedVideo)
    expect(fixture.point.componentInstance.table.header).toEqual([
      new TableHeaderItem({ data: 'Position' }),
      new TableHeaderItem({ data: 'Member' }),
      new TableHeaderItem({ style: { padding: 0, width: 0 } }),
    ])
    expect(fixture.point.componentInstance.table.data).toEqual([
      [
        new TableItem({ data: crewMember.position }),
        new TableItem({ data: crewMember.member.name }),
        new TableItem({
          data: crewMember,
          template: fixture.point.componentInstance['removeCrewMemberCell'],
        }),
      ],
    ])
  })

  it('should have a toolbar with add button', () => {
    MockRender(VideoCrewTableComponent, { video: detailedVideo })

    const tableContainer = ngMocks.find(TableContainer)
    const tableToolbarContent = ngMocks.find(tableContainer, TableToolbarContent)
    const button = ngMocks.find(tableToolbarContent, 'button')

    expect(ngMocks.formatText(button)).toEqual('Add new crew member')
    const buttonDirective = ngMocks.findInstance(button, Button)

    expect(buttonDirective.ibmButton).toEqual('primary')
    const svg = ngMocks.find(button, 'svg.bx--btn__icon')
    const icon = ngMocks.findInstance(svg, IconDirective)

    expect(icon.ibmIcon).toBe('add')
    expect(icon.size).toBe('16')
  })

  it('should have a table', () => {
    const fixture = MockRender(VideoCrewTableComponent, { video: detailedVideo })

    const tableContainer = ngMocks.find(TableContainer)
    const table = ngMocks.findInstance(tableContainer, Table)

    expect(table.model).toEqual(fixture.point.componentInstance.table)
    expect(table.sortable).toBeFalse()
    expect(table.striped).toBeFalse()
    expect(table.showSelectionColumn).toBeFalse()
    expect(table.size).toBe('sh')
  })

  it('should render a modal on add', () => {
    MockRender(VideoCrewTableComponent, { video: detailedVideo })

    const tableContainer = ngMocks.find(TableContainer)
    const tableToolbarContent = ngMocks.find(tableContainer, TableToolbarContent)
    const button = ngMocks.find(tableToolbarContent, 'button')

    ngMocks.click(button)

    const modalService = ngMocks.findInstance(ModalService)

    expect(modalService.create).toHaveBeenCalledOnceWith({
      component: VideoCrewAddModalComponent,
      inputs: { video: detailedVideo },
    })
  })

  it('should have rows', () => {
    MockRender(VideoCrewTableComponent, { video: detailedVideo })

    const removeButton = ngMocks.findInstance(VideoCrewRemoveButtonComponent)
    expect(removeButton.crewMember).toEqual(crewMember)
  })

  it('should remove crewMember on button click', () => {
    MockInstance(VideoCrewService, 'removeVideoCrewMember', () => of(detailedVideo))
    MockRender(VideoCrewTableComponent, { video: detailedVideo })

    const button = ngMocks.find(VideoCrewRemoveButtonComponent)
    ngMocks.click(button)
  })
})
