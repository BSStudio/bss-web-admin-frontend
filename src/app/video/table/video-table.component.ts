import { Component, OnInit } from '@angular/core';
import { VideoService } from '../service/video.service';
import { IconService, ModalService, TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { Router } from '@angular/router';
import { Video } from '../service/video.model';
// @ts-ignore
import { Renew16, View16, ViewOffFilled16 } from '@carbon/icons';
import { CreateVideoModalComponent } from '../create-modal/create-video-modal.component';

export interface Pagination {
  page: number;
  size: number;
}

@Component({
  selector: 'app-video-table',
  templateUrl: './video-table.component.html',
  styleUrls: ['./video-table.component.scss'],
})
export class VideoTableComponent implements OnInit {
  readonly text = {
    hideButton: 'Kijelöltek elrejtése',
    unHideButton: 'Kijelöltek megjelenítése',
    cancel: 'Mégse',
  };
  readonly model = new TableModel();
  private videos = new Array<Video>();

  constructor(
    private service: VideoService,
    private router: Router,
    private iconService: IconService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.iconService.register(Renew16);
    this.iconService.register(View16);
    this.iconService.register(ViewOffFilled16);
    this.model.header = [
      new TableHeaderItem({ data: 'Cím' }),
      new TableHeaderItem({ data: 'URL' }),
      new TableHeaderItem({ data: 'Feltöltés dátuma' }),
      new TableHeaderItem({ data: 'Látható' }),
    ];
    this.getVideos();
  }

  onPageSelect(page: number) {
    this.model.currentPage = page;
    this.getVideos();
  }

  async onRowClick(row: number) {
    const { id } = this.videos[row];
    await this.router.navigate(['video', id]);
  }

  getVideos() {
    return this.service.getVideos(this.model.currentPage - 1, this.model.pageLength).subscribe({
      next: (res) => {
        this.videos = res.data;
        this.model.data = res.data.map((video) => [
          new TableItem({ data: video.title }),
          new TableItem({ data: video.url }),
          new TableItem({ data: video.uploadedAt }),
          new TableItem({ data: video.visible ? 'igen' : 'nem' }),
        ]);
        this.model.totalDataLength = res.totalElements;
      },
    });
  }

  changeVisibilityTo(visible: boolean) {
    const selected = this.videos.filter((_, index) => this.model.rowsSelected[index]).map(({ id }) => id);
    this.service.changeVisibility(selected, visible).subscribe({
      next: () => this.getVideos(),
    });
  }

  showAddModal() {
    this.modalService.create({ component: CreateVideoModalComponent });
  }

  close() {
    console.log('closed');
  }
}
