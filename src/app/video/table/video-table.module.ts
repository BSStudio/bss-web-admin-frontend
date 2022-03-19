import { NgModule } from '@angular/core';
import { ButtonModule, IconModule, PaginationModule, PlaceholderModule, TableModule } from 'carbon-components-angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { VideoTableComponent } from './video-table.component';

@NgModule({
  imports: [TableModule, ButtonModule, IconModule, CommonModule, HttpClientModule, PaginationModule, PlaceholderModule],
  declarations: [VideoTableComponent],
  exports: [VideoTableComponent],
})
export class VideoTableModule {}
