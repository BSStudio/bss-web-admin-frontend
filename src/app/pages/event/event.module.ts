import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { EventIndexComponent } from './event-index.component';
import { EventIdComponent } from './event-id.component';

@NgModule({
  imports: [CommonModule, EventRoutingModule],
  declarations: [EventIndexComponent, EventIdComponent],
})
export class EventModule {}
