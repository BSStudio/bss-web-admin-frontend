import { RouterModule, Routes } from '@angular/router';
import { MemberIndexComponent } from './member-index/member-index.component';
import { MemberIdComponent } from './member-id/member-id.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: MemberIndexComponent },
  { path: ':memberId', component: MemberIdComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberRoutingModule {}
