import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core'
import { VideoService } from '../../services/video.service'
import { ModalService, TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular'
import { Router } from '@angular/router'
import { VideoCreateModalComponent } from '../video-create-modal/video-create-modal.component'
import { Video } from '../../models'
import { BooleanPipe } from '../../../../shared/pipes/boolean.pipe'
import { formatDate } from '@angular/common'
import { Subject, takeUntil, tap } from 'rxjs'
import { PaginatedResponse } from '../../../../shared/models'

@Component({
  selector: 'app-video-table',
  templateUrl: './video-table.component.html',
})
export class VideoTableComponent implements OnInit, OnDestroy {
  readonly table = new TableModel()
  public loading = true
  private readonly destroy$ = new Subject<void>()

  constructor(
    private service: VideoService,
    private router: Router,
    private modalService: ModalService,
    private booleanPipe: BooleanPipe,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    this.initHeaders()
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
      .getVideos(this.table.currentPage - 1, this.table.pageLength)
      .pipe(
        tap((paginatedVideos) => this.updateTable(paginatedVideos)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        complete: () => (this.loading = false),
      })
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

  get selectedIds() {
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
      new TableHeaderItem({ data: $localize`Title` }),
      new TableHeaderItem({ data: $localize`URL` }),
      new TableHeaderItem({ data: $localize`Upload date` }),
      new TableHeaderItem({ data: $localize`Visible` }),
    ]
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
