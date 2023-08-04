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
import { DetailedEvent } from '../../../event/models'
import { TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular'
import { Video } from '../../../video/models'
import { Subject, switchMap, takeUntil, tap } from 'rxjs'
import { BooleanPipe } from '../../../../shared/pipes/boolean.pipe'
import { VideoService } from '../../../video/services/video.service'
import { EventService } from '../../../event/services/event.service'

@Component({
  selector: 'app-event-video-table[event]',
  templateUrl: './event-video-table.component.html',
})
export class EventVideoTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public event!: DetailedEvent
  @Output() public update = new EventEmitter<DetailedEvent>()
  @ViewChild('removeButtonCell', { static: true }) public removeButtonCell!: TemplateRef<any>
  @ViewChild('navigateCell', { static: true }) public navigateCell!: TemplateRef<any>
  private readonly destroy$ = new Subject<void>()
  public readonly table = new TableModel()

  constructor(
    private booleanPipe: BooleanPipe,
    private videoService: VideoService,
    private eventService: EventService,
  ) {}

  ngOnInit(): void {
    this.initHeaders()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['event']) {
      this.updateTable()
    }
  }

  updateEvent(event: DetailedEvent) {
    this.event = event
    this.update.emit(event)
  }

  private updateTable() {
    this.table.data = this.event.videos.map((video) => this.videoToRow(video))
  }

  private get selectedIds() {
    return this.table.rowsSelected
      .map((selected, index) => ({ selected, index }))
      .filter(({ selected }) => selected)
      .map(({ index }) => index)
      .map((index): Video => this.table.row(index)[0].data)
      .map(({ id }) => id)
  }

  changeVisibilityTo(visible: boolean) {
    const selected = this.selectedIds
    this.videoService
      .changeVisibility(selected, visible)
      .pipe(
        switchMap(() => this.eventService.getEvent(this.event.id)),
        tap((event) => this.updateEvent(event)),
        takeUntil(this.destroy$),
      )
      .subscribe()
  }

  private videoToRow(video: Video) {
    return [
      new TableItem({ title: video.id, data: video, template: this.navigateCell }),
      new TableItem({ title: video.title, data: video.url }),
      new TableItem({ title: video.title, data: video.uploadedAt }),
      new TableItem({ title: video.title, data: this.booleanPipe.transform(video.visible) }),
      new TableItem({ title: video.title, data: video, template: this.removeButtonCell }),
    ]
  }

  private initHeaders() {
    this.table.header = [
      new TableHeaderItem({
        data: $localize`Title`,
        compare: (a: TableItem, b: TableItem) => (<Video>a.data).title.localeCompare((<Video>b.data).title),
      }),
      new TableHeaderItem({ data: $localize`Url` }),
      new TableHeaderItem({ data: $localize`Uploaded at` }),
      new TableHeaderItem({ data: $localize`Visible` }),
      new TableHeaderItem({ style: { padding: 0, width: 0 }, sortable: false }),
    ]
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
