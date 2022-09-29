import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../data/video/service/video.service';
import { ModalService, TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { Router } from '@angular/router';
import { CreateVideoModalComponent } from '../create-modal/create-video-modal.component';
import { Video } from '../../data/video/model';

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
  readonly model = new TableModel();
  private videos = new Array<Video>();

  constructor(private service: VideoService, private router: Router, private modalService: ModalService) {}

  ngOnInit(): void {
    this.model.header = [
      new TableHeaderItem({ data: 'Title' }),
      new TableHeaderItem({ data: 'URL' }),
      new TableHeaderItem({ data: 'Upload date' }),
      new TableHeaderItem({ data: 'Visible' }),
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
        this.videos = res.content;
        this.model.data = this.videos.map((video) => [
          new TableItem({ data: video.title }),
          new TableItem({ data: video.url }),
          new TableItem({ data: video.uploadedAt }),
          new TableItem({ data: video.visible }),
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
