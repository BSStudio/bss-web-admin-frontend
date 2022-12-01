import { NgModule } from '@angular/core'
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component'
import { BooleanPipe } from './pipes/boolean.pipe'

@NgModule({
  imports: [BreadcrumbComponent, BooleanPipe],
  providers: [BooleanPipe],
  exports: [BreadcrumbComponent],
})
export class SharedModule {}
