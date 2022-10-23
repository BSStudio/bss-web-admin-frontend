import { NgModule } from '@angular/core';
import { MemberStatusPipe } from './member/pipe/member-status.pipe';
import { BooleanPipe } from './boolean-pipe.pipe';

@NgModule({
  providers: [MemberStatusPipe, BooleanPipe],
  declarations: [MemberStatusPipe, BooleanPipe],
  exports: [MemberStatusPipe],
})
export class SharedModule {}
