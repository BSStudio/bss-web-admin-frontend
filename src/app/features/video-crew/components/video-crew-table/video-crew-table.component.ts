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
import { ModalService, TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular'
import { Subject, takeUntil, tap } from 'rxjs'
import { VideoCrewService } from '../../services/video-crew.service'
import { VideoCrewAddModalComponent } from '../video-crew-add-modal/video-crew-add-modal.component'
import { CrewMember } from '../../models'

@Component({
  selector: 'app-video-crew-table[video]',
  templateUrl: './video-crew-table.component.html',
})
export class VideoCrewTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() video!: DetailedVideo
  @Output() update = new EventEmitter<DetailedVideo>()
  @ViewChild('removeCrewMemberCell', { static: true })
  protected removeCrewMemberCell!: TemplateRef<any>
  public readonly table = new TableModel()
  private readonly destroy$ = new Subject<void>()

  constructor(private service: VideoCrewService, private modalService: ModalService) {}

  ngOnInit() {
    this.initHeaders()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['video']) {
      this.updateTable()
    }
  }

  showAddModal() {
    this.modalService.create({
      component: VideoCrewAddModalComponent,
      inputs: { video: this.video, update: this.update },
    })
  }

  removeCrewMember(crewMember: CrewMember) {
    this.service
      .removeVideoCrewMember({ videoId: this.video.id, ...crewMember })
      .pipe(
        tap((video) => this.update.emit(video)),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  private updateTable() {
    this.table.data = this.video.crew.map((crewMember) => [
      new TableItem({ data: crewMember.position }),
      new TableItem({ data: crewMember.memberId }),
      new TableItem({ data: { ...crewMember, videoId: this.video.id }, template: this.removeCrewMemberCell }),
    ])
  }

  private initHeaders() {
    this.table.header = [
      new TableHeaderItem({ data: 'Position' }),
      new TableHeaderItem({ data: 'Member' }),
      new TableHeaderItem({ style: { padding: 0, width: 0 } }),
    ]
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
