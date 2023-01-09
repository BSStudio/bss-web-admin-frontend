import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { DetailedVideo } from '../../../video/models'
import { TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-video-crew-table[video]',
  templateUrl: './video-crew-table.component.html',
})
export class VideoCrewTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public video!: DetailedVideo
  @Output() public update = new EventEmitter<DetailedVideo>()
  @ViewChild('removeCrewMemberCell', { static: true }) protected removeCrewMemberCell!: TemplateRef<any>
  public readonly table = new TableModel()
  private readonly destroy$ = new Subject<void>()

  constructor() {}

  ngOnInit() {
    this.initHeaders()
    this.updateTable()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['video'] && !changes['video'].firstChange) {
      this.updateTable()
    }
  }

  updateVideo(video: DetailedVideo) {
    this.video = video
    this.update.emit(video)
  }

  private updateTable() {
    this.table.data = this.video.crew.map((crewMember) => [
      new TableItem({ data: crewMember.member.name }),
      new TableItem({ data: crewMember.position }),
      new TableItem({ data: crewMember, template: this.removeCrewMemberCell }),
    ])
  }

  private initHeaders() {
    this.table.header = [
      new TableHeaderItem({ data: 'Member' }),
      new TableHeaderItem({ data: 'Position' }),
      new TableHeaderItem({ style: { padding: 0, width: 0 }, sortable: false }),
    ]
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
