import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MemberIndexComponent } from './member-index/member-index.component'
import { MemberIdComponent } from './member-id/member-id.component'
import { MemberResolver } from './member.resolver'

const routes: Routes = [
  { path: '', component: MemberIndexComponent, title: $localize`BSS Web | member` },
  { path: ':memberId', resolve: { member: MemberResolver }, component: MemberIdComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberRoutingModule {}
