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
import { DetailedEvent } from '../../models'
import { catchError, EMPTY, Subject, takeUntil, tap } from 'rxjs'
import {
  AlertModalType,
  ModalButtonType,
  ModalService,
  NotificationService,
  TableHeaderItem,
  TableItem,
  TableModel,
} from 'carbon-components-angular'
import { Video } from '../../../video/models'
import { EventVideoAddModalComponent } from '../event-video-add-modal/event-video-add-modal.component'
import { EventVideoService } from '../../../video/services/event-video.service'

@Component({
  selector: 'app-event-video-table',
  templateUrl: './event-video-table.component.html',
})
export class EventVideoTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public event!: DetailedEvent
  @Output()
  public update = new EventEmitter<DetailedEvent>()
  @ViewChild('removeButtonCell', { static: true })
  protected removeButtonCell!: TemplateRef<any>
  @ViewChild('navigateCell', { static: true })
  protected navigateCell!: TemplateRef<any>
  private readonly destroy$ = new Subject<void>()
  public readonly table = new TableModel()

  constructor(
    private modalService: ModalService,
    private eventVideoService: EventVideoService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initHeaders()
    this.updateTable()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['event']) {
      this.updateTable()
    }
  }

  showAddModal() {
    this.modalService.create({
      component: EventVideoAddModalComponent,
      inputs: { event: this.event, update: this.update },
    })
  }

  showRemoveModal(video: { title: string; id: string }) {
    this.modalService.show({
      type: AlertModalType.danger,
      label: video.title,
      title: $localize`Remove video from event`,
      size: 'xs',
      content: $localize`Are you sure you want to remove this video?`,
      buttons: [
        { type: ModalButtonType.secondary, text: $localize`Close` },
        { type: ModalButtonType.danger, text: $localize`Remove`, click: () => this.removeEventVideo(video.id) },
      ],
    })
  }

  removeEventVideo(videoId: string) {
    this.eventVideoService
      .removeVideoFromEvent({ eventId: this.event.id, videoId })
      .pipe(
        tap((event) => {
          this.successNotification(event)
          this.update.emit(event)
        }),
        catchError((err) => {
          this.errorNotification(err)
          return EMPTY
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  successNotification(event: DetailedEvent) {
    this.notificationService.showToast({
      type: 'success',
      title: $localize``,
    })
  }

  errorNotification(error: unknown) {
    this.notificationService.showToast({
      type: 'error',
      title: $localize`Error removing video`,
      content: JSON.stringify(error),
    })
  }

  private updateTable() {
    this.table.data = this.event.videos.map((video) => this.videoToRow(video))
  }

  private videoToRow({ title, id, url, uploadedAt }: Video) {
    return [
      new TableItem({ title, data: { id, title }, template: this.navigateCell }),
      new TableItem({ title, data: url }),
      new TableItem({ title, data: uploadedAt }),
      new TableItem({ title, data: { id, title }, template: this.removeButtonCell }),
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
