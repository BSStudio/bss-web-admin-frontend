import { NgModule } from '@angular/core';
import { MemberTableComponent } from './member-table.component';
import { CommonModule } from '@angular/common';
import { ButtonModule, IconModule, NotificationModule, TableModule } from 'carbon-components-angular';

@NgModule({
  imports: [CommonModule, TableModule, IconModule, ButtonModule, NotificationModule],
  declarations: [MemberTableComponent],
  exports: [MemberTableComponent],
})
export class MemberTableModule {}
