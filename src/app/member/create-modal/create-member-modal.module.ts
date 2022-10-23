import { NgModule } from '@angular/core';
import { CreateMemberModalComponent } from './create-member-modal.component';
import { ModalModule, NFormsModule } from 'carbon-components-angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [ModalModule, ReactiveFormsModule, NFormsModule],
  declarations: [CreateMemberModalComponent],
  exports: [CreateMemberModalComponent],
})
export class CreateMemberModalModule {}
