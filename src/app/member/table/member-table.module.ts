import { NgModule } from '@angular/core';
import { MemberTableComponent } from './member-table.component';
import { CommonModule } from '@angular/common';
import { ButtonModule, IconModule, NotificationModule, TableModule } from 'carbon-components-angular';
import { SharedModule } from '../../@shared/shared.module';

@NgModule({
  imports: [CommonModule, TableModule, ButtonModule, IconModule, SharedModule, NotificationModule],
  declarations: [MemberTableComponent],
  exports: [MemberTableComponent],
})
export class MemberTableModule {}
