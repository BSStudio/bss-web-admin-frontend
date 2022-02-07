import { RouterModule, Routes } from '@angular/router';
import { EventIndexComponent } from './event-index.component';
import { EventIdComponent } from './event-id.component';
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
