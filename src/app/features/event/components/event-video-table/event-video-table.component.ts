import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DetailedEvent } from '../../models';
import { Subject, takeUntil, tap } from 'rxjs';
import {
  AlertModalType,
  ModalButtonType,
  ModalService,
  NotificationService,
  TableHeaderItem,
  TableItem,
  TableModel,
} from 'carbon-components-angular';
import { Video } from '../../../video/models';
import { EventVideoAddModalComponent } from '../event-video-add-modal/event-video-add-modal.component';
import { EventVideoService } from '../../../video/services/event-video.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-video-table',
  templateUrl: './event-video-table.component.html',
  styleUrls: ['./event-video-table.component.scss'],
})
export class EventVideoTableComponent implements OnInit, OnChanges {
  @Input()
  public event!: DetailedEvent;
  @Output()
  public update = new EventEmitter<void>();
  @ViewChild('removeButton', { static: true })
  protected removeButton!: TemplateRef<any>;
  private readonly destroy$ = new Subject<boolean>();
  public readonly table = new TableModel();

  constructor(
    private modalService: ModalService,
    private eventVideoService: EventVideoService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initHeaders();
    this.updateTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    if (changes['event']) {
      this.updateTable();
    }
  }

  async rowClick(index: number) {
    const id = this.table.row(index)[0].title;
    await this.router.navigate(['video', id]);
  }

  showAddModal() {
    this.modalService
      .create({ component: EventVideoAddModalComponent, inputs: { event: this.event } })
      .onDestroy(() => this.update.emit());
  }

  showRemoveModal(video: Video) {
    this.modalService.show({
      type: AlertModalType.danger,
      label: video.title,
      title: 'Remove video from event',
      size: 'xs',
      content: 'Are you sure you want to remove this video?',
      buttons: [
        { type: ModalButtonType.secondary, text: 'Close' },
        { type: ModalButtonType.danger, text: 'Remove', click: () => this.removeEventVideo(video.id) },
      ],
    });
  }

  removeEventVideo(videoId: string) {
    this.eventVideoService
      .removeVideoFromEvent({ eventId: this.event.id, videoId })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.successNotification(),
        error: (err) => this.errorNotification(err),
        complete: () => this.update.emit(),
      });
  }

  successNotification() {
    this.notificationService.showToast({
      type: 'success',
      title: '',
    });
  }

  errorNotification(error: unknown) {
    this.notificationService.showToast({
      type: 'error',
      title: 'Error removing video',
      content: JSON.stringify(error),
    });
  }

  private updateTable() {
    this.table.data = this.event.videos.map((video) => this.videoToRow(video));
  }

  private videoToRow(video: Video) {
    return [
      new TableItem({ data: video.title, title: video.id }),
      new TableItem({ data: video.url }),
      new TableItem({ data: video.uploadedAt }),
      new TableItem({ data: video, template: this.removeButton }),
    ];
  }

  private initHeaders() {
    this.table.header = [
      new TableHeaderItem({ data: 'Title' }),
      new TableHeaderItem({ data: 'Url' }),
      new TableHeaderItem({ data: 'Uploaded at' }),
      new TableHeaderItem({ style: { padding: 0, width: 0 } }),
    ];
  }
}
