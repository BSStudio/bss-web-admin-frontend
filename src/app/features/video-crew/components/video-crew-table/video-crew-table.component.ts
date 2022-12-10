import {
  Component,
  ComponentRef,
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
import { VideoCrewAddModalComponent } from '../video-crew-add-modal/video-crew-add-modal.component'

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

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.initHeaders()
    this.updateTable()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['video'] && !changes['video'].firstChange) {
      this.updateTable()
    }
  }

  showAddModal() {
    const componentRef: ComponentRef<VideoCrewAddModalComponent> = this.modalService.create({
      component: VideoCrewAddModalComponent,
      inputs: { video: this.video },
    })
    componentRef.instance.update
      .pipe(
        tap((video) => this.updateVideo(video)),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  updateVideo(video: DetailedVideo) {
    this.video = video
    this.update.emit(video)
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
