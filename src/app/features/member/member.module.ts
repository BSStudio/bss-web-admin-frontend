import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule, IconModule, NFormsModule, SelectModule } from 'carbon-components-angular';
import { MemberIndexComponent } from './pages/member-index/member-index.component';
import { MemberRoutingModule } from './pages/member-routing.module';
import { MemberIdComponent } from './pages/member-id/member-id.component';
import { MemberTableModule } from './components/member-table/member-table.module';
import { CreateMemberModalModule } from './components/create-member-modal/create-member-modal.module';
import { MemberStatusPipe } from './pipes/member-status.pipe';
import { BooleanPipe } from '../../shared/pipes/boolean.pipe';

@NgModule({
  imports: [
    CommonModule,
    MemberRoutingModule,
    CreateMemberModalModule,
    MemberTableModule,
    ReactiveFormsModule,
    NFormsModule,
    SelectModule,
    BreadcrumbModule,
    IconModule,
  ],
  declarations: [MemberIndexComponent, MemberIdComponent, MemberStatusPipe],
  providers: [MemberStatusPipe, BooleanPipe],
})
export class MemberModule {}
