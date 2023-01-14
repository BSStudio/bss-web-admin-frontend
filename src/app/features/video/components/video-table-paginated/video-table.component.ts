import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { formatDate } from '@angular/common'
import { ModalService, TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular'
import { Subject, takeUntil, tap } from 'rxjs'
import { VideoService } from '../../services/video.service'
import { VideoCreateModalComponent } from '../video-create-modal/video-create-modal.component'
import { Video } from '../../models'
import { BooleanPipe } from '../../../../shared/pipes/boolean.pipe'
import { PaginatedResponse, SortRequest } from '../../../../shared/models'

@Component({
  selector: 'app-video-table',
  templateUrl: './video-table.component.html',
})
export class VideoTableComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>()
  public readonly table = new TableModel()
  public loading = true

  constructor(
    private service: VideoService,
    private router: Router,
    private modalService: ModalService,
    private booleanPipe: BooleanPipe,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    this.initHeaders()
    this.table.pageLength = 50
    this.getVideos()
  }

  sort(index: number) {
    if (this.table.header[index].sorted) {
      this.table.header[index].ascending = this.table.header[index].descending
    }
    this.table.sort(index)
    this.getVideos()
  }

  onPageSelect(page: number) {
    this.table.currentPage = page
    this.getVideos()
  }

  async onRowClick(index: number) {
    const id = this.table.row(index)[0].title
    await this.router.navigate(['video', id])
  }

  getVideos(): void {
    this.loading = true
    this.service
      .getVideos({ page: this.table.currentPage - 1, size: this.table.pageLength, sort: this.sortRequest })
      .pipe(
        tap({
          next: (paginatedVideos) => this.updateTable(paginatedVideos),
          complete: () => (this.loading = false),
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  private get sortRequest(): SortRequest<Video>[] {
    return this.table.header
      .filter(({ sorted }) => sorted)
      .map(({ metadata, ascending }) => ({ property: metadata, direction: ascending ? 'asc' : 'desc' }))
  }

  private updateTable(paginatedVideos: PaginatedResponse<Video>) {
    this.table.data = paginatedVideos.content.map((video) => this.videoToRow(video))
    this.table.totalDataLength = paginatedVideos.totalElements
  }

  private videoToRow(video: Video) {
    return [
      new TableItem({ title: video.id, data: video.title }),
      new TableItem({ data: video.url }),
      new TableItem({ data: formatDate(video.uploadedAt, 'YYYY-MM-dd', this.locale) }),
      new TableItem({ data: this.booleanPipe.transform(video.visible) }),
    ]
  }

  changeVisibilityTo(visible: boolean) {
    const selected = this.selectedIds
    this.service
      .changeVisibility(selected, visible)
      .pipe(
        tap(() => this.getVideos()),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  private get selectedIds() {
    return this.table.rowsSelected
      .map((selected, index) => ({ selected, index }))
      .filter(({ selected }) => selected)
      .map(({ index }) => index)
      .map((index) => this.table.row(index)[0].title)
  }

  showAddModal() {
    this.modalService.create({ component: VideoCreateModalComponent }).onDestroy(() => this.getVideos())
  }

  private initHeaders() {
    this.table.header = [
      new TableHeaderItem({ compare: () => 0, metadata: 'title', data: $localize`Title` }),
      new TableHeaderItem({ compare: () => 0, metadata: 'url', data: $localize`URL` }),
      new TableHeaderItem({
        compare: () => 0,
        metadata: 'uploadedAt',
        data: $localize`Upload date`,
        sorted: true,
        descending: true,
      }),
      new TableHeaderItem({ compare: () => 0, metadata: 'visible', data: $localize`Visible` }),
    ]
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
