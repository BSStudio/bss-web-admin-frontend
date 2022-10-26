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
  public update = new EventEmitter<DetailedEvent>();
  @ViewChild('removeButtonCell', { static: true })
  protected removeButtonCell!: TemplateRef<any>;
  @ViewChild('navigateCell', { static: true })
  protected navigateCell!: TemplateRef<any>;
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

  showAddModal() {
    this.modalService.create({
      component: EventVideoAddModalComponent,
      inputs: { event: this.event, update: this.update },
    });
  }

  showRemoveModal(video: { title: string; id: string }) {
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
      .pipe(
        tap((event) => this.update.emit(event)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => this.successNotification(),
        error: (err) => this.errorNotification(err),
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

  private videoToRow({ title, id, url, uploadedAt }: Video) {
    return [
      new TableItem({ title, data: { id, title }, template: this.navigateCell }),
      new TableItem({ title, data: url }),
      new TableItem({ title, data: uploadedAt }),
      new TableItem({ title, data: { id, title }, template: this.removeButtonCell }),
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
