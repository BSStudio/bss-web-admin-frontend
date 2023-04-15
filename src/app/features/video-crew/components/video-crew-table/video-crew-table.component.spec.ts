import { VideoCrewTableComponent } from './video-crew-table.component'
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { VideoCrewModule } from '../../video-crew.module'
import { DetailedVideo } from '../../../video/models'
import {
  Table,
  TableContainer,
  TableHeaderItem,
  TableItem,
  TableModule,
  TableToolbarContent,
} from 'carbon-components-angular'
import { VideoCrewAddFormComponent } from '../video-crew-add-form/video-crew-add-form.component'
import { CrewMember } from '../../models'
import { VideoCrewService } from '../../services/video-crew.service'
import { of } from 'rxjs'
import { VideoCrewRemoveButtonComponent } from '../video-crew-remove-button/video-crew-remove-button.component'
import { SimpleMember } from '../../../member/models'
import { EventEmitter } from '@angular/core'

describe('VideoCrewTableComponent', () => {
  beforeEach(() => MockBuilder([VideoCrewTableComponent, TableModule], VideoCrewModule))
  const member = new SimpleMember('id', 'name', 'nickname')
  const crewMember = new CrewMember('memberId', 'position', member)
  const detailedVideo = new DetailedVideo('id', 'url', 'title', 'description', 'uploadedAt', true, [crewMember])

  it('should create', () => {
    const fixture = MockRender(VideoCrewTableComponent, { video: detailedVideo })

    expect(fixture.point.componentInstance.video).toEqual(detailedVideo)
    expect(fixture.point.componentInstance.table.header).toEqual([
      new TableHeaderItem({ data: 'Member' }),
      new TableHeaderItem({ data: 'Position' }),
      new TableHeaderItem({ style: { padding: 0, width: 0 }, sortable: false }),
    ])
    expect(fixture.point.componentInstance.table.data).toEqual([
      [
        new TableItem({ data: crewMember.member.name }),
        new TableItem({ data: crewMember.position }),
        new TableItem({
          data: crewMember,
          template: fixture.point.componentInstance['removeCrewMemberCell'],
        }),
      ],
    ])
  })

  it('should have a table', () => {
    const fixture = MockRender(VideoCrewTableComponent, { video: detailedVideo })

    const tableContainer = ngMocks.find(TableContainer)
    const table = ngMocks.findInstance(tableContainer, Table)

    expect(table.model).toEqual(fixture.point.componentInstance.table)
    expect(table.sortable).toBeTrue()
    expect(table.striped).toBeFalse()
    expect(table.showSelectionColumn).toBeFalse()
    expect(table.size).toBe('sh')
  })

  it('should have an add form', () => {
    MockRender(VideoCrewTableComponent, { video: detailedVideo })

    const tableContainer = ngMocks.find(TableContainer)
    const tableToolbarContent = ngMocks.find(tableContainer, TableToolbarContent)
    const addForm = ngMocks.find(tableToolbarContent, VideoCrewAddFormComponent)

    expect(addForm.componentInstance.video).toEqual(detailedVideo)
  })

  it('should update on add an add form', () => {
    const update = new EventEmitter<DetailedVideo>()
    MockInstance(VideoCrewAddFormComponent, 'update', update)
    const fixture = MockRender(VideoCrewTableComponent, { video: detailedVideo })
    const updatedVideo: DetailedVideo = { ...detailedVideo, crew: [crewMember, crewMember] }

    update.emit(updatedVideo)

    expect(fixture.point.componentInstance.video).toEqual(updatedVideo)
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
