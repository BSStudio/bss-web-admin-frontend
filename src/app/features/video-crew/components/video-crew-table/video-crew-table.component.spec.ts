import { VideoCrewTableComponent } from './video-crew-table.component';
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';
import { VideoCrewModule } from '../../video-crew.module';
import { DetailedVideo } from '../../../video/models';
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
} from 'carbon-components-angular';
import { VideoCrewAddModalComponent } from '../video-crew-add-modal/video-crew-add-modal.component';
import { CrewMember } from '../../models';
import { VideoCrewService } from '../../services/video-crew.service';
import { of } from 'rxjs';

describe('VideoCrewTableComponent', () => {
  beforeEach(() => MockBuilder([VideoCrewTableComponent, TableModule], VideoCrewModule));
  const crew: CrewMember[] = [{ memberId: 'memberId', position: 'position' }];
  const detailedVideo = new DetailedVideo('id', 'url', 'title', 'description', 'uploadedAt', true, crew);

  it('should create', () => {
    const fixture = MockRender(VideoCrewTableComponent, { video: detailedVideo });

    expect(fixture.point.componentInstance.video).toEqual(detailedVideo);
    expect(fixture.point.componentInstance.table.header).toEqual([
      new TableHeaderItem({ data: 'Position' }),
      new TableHeaderItem({ data: 'Member' }),
      new TableHeaderItem({ style: { padding: 0, width: 0 } }),
    ]);
    expect(fixture.point.componentInstance.table.data).toEqual([
      [
        new TableItem({ data: detailedVideo.crew[0].position }),
        new TableItem({ data: crew[0].memberId }),
        new TableItem({
          data: { ...crew[0], videoId: detailedVideo.id },
          template: fixture.point.componentInstance['removeCrewMemberCell'],
        }),
      ],
    ]);
  });

  it('should have a toolbar with add button', () => {
    MockRender(VideoCrewTableComponent, { video: detailedVideo });

    const tableContainer = ngMocks.find(TableContainer);
    const tableToolbarContent = ngMocks.find(tableContainer, TableToolbarContent);
    const button = ngMocks.find(tableToolbarContent, 'button');

    expect(ngMocks.formatText(button)).toEqual('Add new crew member');
    const buttonDirective = ngMocks.findInstance(button, Button);

    expect(buttonDirective.ibmButton).toEqual('primary');
    const svg = ngMocks.find(button, 'svg.bx--btn__icon');
    const icon = ngMocks.findInstance(svg, IconDirective);

    expect(icon.ibmIcon).toBe('add');
    expect(icon.size).toBe('16');
  });

  it('should have a table', () => {
    const fixture = MockRender(VideoCrewTableComponent, { video: detailedVideo });

    const tableContainer = ngMocks.find(TableContainer);
    const table = ngMocks.findInstance(tableContainer, Table);

    expect(table.model).toEqual(fixture.point.componentInstance.table);
    expect(table.sortable).toBeFalse();
    expect(table.striped).toBeFalse();
    expect(table.showSelectionColumn).toBeFalse();
    expect(table.size).toBe('sh');
  });

  it('should render a modal on add', () => {
    const fixture = MockRender(VideoCrewTableComponent, { video: detailedVideo });

    const tableContainer = ngMocks.find(TableContainer);
    const tableToolbarContent = ngMocks.find(tableContainer, TableToolbarContent);
    const button = ngMocks.find(tableToolbarContent, 'button');

    ngMocks.click(button);

    const modalService = ngMocks.findInstance(ModalService);

    expect(modalService.create).toHaveBeenCalledOnceWith({
      component: VideoCrewAddModalComponent,
      inputs: { video: detailedVideo, update: fixture.point.componentInstance.update },
    });
  });

  it('should have rows', () => {
    const fixture = MockRender(VideoCrewTableComponent, { video: detailedVideo });
    fixture.detectChanges();

    const button = ngMocks.find('button.row-button');

    expect(ngMocks.formatText(button)).toBe(`Remove ${crew[0].memberId} ${crew[0].position} from event`);
    const buttonDirective = ngMocks.findInstance(button, Button);

    expect(buttonDirective.ibmButton).toBe('danger');
    expect(buttonDirective.size).toBe('field');
    expect(buttonDirective.iconOnly).toBeTrue();
    expect(buttonDirective.assistiveTextAlignment).toBe('end');
    expect(buttonDirective.assistiveTextPlacement).toBe('left');
    const svg = ngMocks.find(button, 'svg.bx--btn__icon');
    const icon = ngMocks.findInstance(svg, IconDirective);

    expect(icon.ibmIcon).toBe('delete');
    expect(icon.size).toBe('16');
  });

  it('should remove crewMember on button click', () => {
    MockInstance(VideoCrewService, 'removeVideoCrewMember', () => of(detailedVideo));
    const emit = jasmine.createSpy('emit');
    MockRender(VideoCrewTableComponent, { video: detailedVideo, update: { emit } });

    const button = ngMocks.find('button.row-button');
    ngMocks.click(button);

    expect(emit).toHaveBeenCalledOnceWith(detailedVideo);
  });
});
