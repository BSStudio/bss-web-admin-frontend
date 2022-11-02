import { NgModule } from '@angular/core';
import { BooleanPipe } from './pipes/boolean.pipe';

@NgModule({
  providers: [BooleanPipe],
})
export class SharedModule {}
