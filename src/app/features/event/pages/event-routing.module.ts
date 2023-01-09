import { RouterModule, Routes } from '@angular/router'
import { EventIndexComponent } from './event-index/event-index.component'
import { EventIdComponent } from './event-id/event-id.component'
import { NgModule } from '@angular/core'
import { EventResolver } from './event.resolver'

const routes: Routes = [
  { path: '', component: EventIndexComponent, title: $localize`BSS Web | Events` },
  {
    path: ':eventId',
    resolve: { event: EventResolver },
    component: EventIdComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
