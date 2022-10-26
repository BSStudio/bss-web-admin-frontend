import { NgModule } from '@angular/core';
import { CreateMemberModalComponent } from './create-member-modal.component';
import { IconModule, ModalModule, NFormsModule } from 'carbon-components-angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [ModalModule, IconModule, ReactiveFormsModule, NFormsModule],
  declarations: [CreateMemberModalComponent],
  exports: [CreateMemberModalComponent],
})
export class CreateMemberModalModule {}
