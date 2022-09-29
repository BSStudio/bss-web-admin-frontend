import { RouterModule, Routes } from '@angular/router';
import { EventIndexComponent } from './event-index/event-index.component';
import { EventIdComponent } from './event-id/event-id.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: EventIndexComponent },
  { path: ':eventId', component: EventIdComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
