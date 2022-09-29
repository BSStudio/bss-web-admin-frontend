import { NgModule } from '@angular/core';
import { ButtonModule, IconModule, PaginationModule, PlaceholderModule, TableModule } from 'carbon-components-angular';
import { CommonModule } from '@angular/common';
import { VideoTableComponent } from './video-table.component';

@NgModule({
  imports: [TableModule, ButtonModule, IconModule, CommonModule, PaginationModule, PlaceholderModule],
  declarations: [VideoTableComponent],
  exports: [VideoTableComponent],
})
export class VideoTableModule {}
