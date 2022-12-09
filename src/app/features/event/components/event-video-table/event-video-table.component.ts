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
import { DetailedEvent } from '../../models'
import { ModalService, TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular'
import { Video } from '../../../video/models'
import { EventVideoAddModalComponent } from '../event-video-add-modal/event-video-add-modal.component'
import { Subject, takeUntil, tap } from 'rxjs'

@Component({
  selector: 'app-event-video-table[event]',
  templateUrl: './event-video-table.component.html',
})
export class EventVideoTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public event!: DetailedEvent
  @Output()
  public update = new EventEmitter<DetailedEvent>()
  @ViewChild('removeButtonCell', { static: true })
  public removeButtonCell!: TemplateRef<any>
  @ViewChild('navigateCell', { static: true })
  public navigateCell!: TemplateRef<any>
  private readonly destroy$ = new Subject<void>()
  public readonly table = new TableModel()

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.initHeaders()
    this.updateTable()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['event'] && !changes['event'].firstChange) {
      this.updateTable()
    }
  }

  showAddModal() {
    const componentRef: ComponentRef<EventVideoAddModalComponent> = this.modalService.create({
      component: EventVideoAddModalComponent,
      inputs: { event: this.event },
    })
    componentRef.instance.update
      .pipe(
        tap((event) => this.updateEvent(event)),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  updateEvent(event: DetailedEvent) {
    this.event = event
    this.update.emit(event)
  }

  private updateTable() {
    this.table.data = this.event.videos.map((video) => this.videoToRow(video))
  }

  private videoToRow(video: Video) {
    return [
      new TableItem({ title: video.title, data: video, template: this.navigateCell }),
      new TableItem({ title: video.title, data: video.url }),
      new TableItem({ title: video.title, data: video.uploadedAt }),
      new TableItem({ title: video.title, data: video, template: this.removeButtonCell }),
    ]
  }

  private initHeaders() {
    this.table.header = [
      new TableHeaderItem({ data: $localize`Title` }),
      new TableHeaderItem({ data: $localize`Url` }),
      new TableHeaderItem({ data: $localize`Uploaded at` }),
      new TableHeaderItem({ style: { padding: 0, width: 0 } }),
    ]
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
