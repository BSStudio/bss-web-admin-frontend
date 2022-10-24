import { NgModule } from '@angular/core';
import { MemberIndexComponent } from './member-index/member-index.component';
import { MemberRoutingModule } from './member-routing.module';
import { CommonModule } from '@angular/common';
import { MemberIdComponent } from './member-id/member-id.component';
import { MemberTableModule } from '../../member/table/member-table.module';
import { CreateMemberModalModule } from '../../member/create-modal/create-member-modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule, IconModule, NFormsModule, SelectModule } from 'carbon-components-angular';
import { SharedModule } from '../../@shared/shared.module';

@NgModule({
  imports: [
    MemberRoutingModule,
    CommonModule,
    CreateMemberModalModule,
    MemberTableModule,
    ReactiveFormsModule,
    NFormsModule,
    SelectModule,
    SharedModule,
    BreadcrumbModule,
    IconModule,
  ],
  declarations: [MemberIndexComponent, MemberIdComponent],
})
export class MemberModule {}
