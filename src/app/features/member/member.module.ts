import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  BreadcrumbModule,
  FileUploaderModule,
  GridModule,
  IconModule,
  ModalModule,
  NFormsModule,
  SelectModule,
  TableModule,
} from 'carbon-components-angular';
import { MemberIndexComponent } from './pages/member-index/member-index.component';
import { MemberRoutingModule } from './pages/member-routing.module';
import { MemberIdComponent } from './pages/member-id/member-id.component';
import { MemberStatusPipe } from './pipes/member-status.pipe';
import { SharedModule } from '../../shared/shared.module';
import { MemberCreateModalComponent } from './components/member-create-modal/member-create-modal.component';
import { MemberRemoveButtonComponent } from './components/member-remove-button/member-remove-button.component';
import { MemberTableComponent } from './components/member-table/member-table.component';
import { MemberUpdateFormComponent } from './components/member-update-form/member-update-form.component';
import { MemberProfilePictureComponent } from './components/member-profile-picture/member-profile-picture.component';
import { MemberIdPictureComponent } from './pages/member-id-picture/member-id-picture.component';
import { MemberProfilePictureUploadComponent } from './components/member-profile-picture-upload/member-profile-picture-upload.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MemberRoutingModule,
    BreadcrumbModule,
    GridModule,
    IconModule,
    ModalModule,
    NFormsModule,
    SelectModule,
    TableModule,
    SharedModule,
    FileUploaderModule,
  ],
  declarations: [
    MemberIndexComponent,
    MemberIdComponent,
    MemberCreateModalComponent,
    MemberRemoveButtonComponent,
    MemberTableComponent,
    MemberUpdateFormComponent,
    MemberStatusPipe,
    MemberProfilePictureComponent,
    MemberIdPictureComponent,
    MemberProfilePictureUploadComponent,
  ],
  providers: [MemberStatusPipe],
})
export class MemberModule {}
