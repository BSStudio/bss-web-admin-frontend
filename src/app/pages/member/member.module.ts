import { NgModule } from '@angular/core';
import { MemberIndexComponent } from './member-index.component';
import { MemberRoutingModule } from './member-routing.module';
import { CommonModule } from '@angular/common';
import { MemberIdComponent } from './member-id.component';

@NgModule({
  imports: [MemberRoutingModule, CommonModule],
  declarations: [MemberIndexComponent, MemberIdComponent],
})
export class MemberModule {}
